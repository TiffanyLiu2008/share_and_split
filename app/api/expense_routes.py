from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Expense, Comment, Payment, db
from flask_migrate import Migrate
from app.forms.create_edit_expense_form import CreateEditExpenseForm
from app.forms.create_edit_comment_form import CreateEditCommentForm
from app.forms.create_edit_payment_form import CreateEditPaymentForm

expense_routes = Blueprint('expense', __name__)

def can_view_an_expense(expense_id):
    # As a lender
    expense = Expense.query.get(expense_id)
    if expense.lender_id == current_user.id:
        return True
    # As a borrower
    payments = Payment.query.filter(Payment.expense_id == expense_id).all()
    for payment in payments:
        if payment.borrower_id == current_user.id:
            return True
    return False

# Get All Comments by Expense ID ; GET ; /api/expenses/:expenseId/comments
@expense_routes.route('/<int:expense_id>/comments', methods=['GET'])
@login_required
def get_all_comments_by_expense_id(expense_id):
    expense = Expense.query.get(expense_id)
    if not expense:
        return jsonify({'message': 'Expense could not be found'}), 404
    if can_view_an_expense(expense_id) == False:
        return jsonify({'message': 'Forbidden'}), 403
    comments = Comment.query.filter(Comment.expense_id == expense_id).all()
    comments_data = [{
        'id': comment.id,
        'expense_id': comment.expense_id,
        'creator_id': comment.creator_id,
        'creator_username': User.query.get(comment.creator_id).username,
        'comment': comment.comment,
        'created_at': comment.created_at,
        'updated_at': comment.updated_at
    } for comment in comments]
    return jsonify({'comments': comments_data})

# Create a Comment by Expense ID ; POST ; /api/expenses/:expenseId/comments
@expense_routes.route('/<int:expense_id>/comments', methods=['POST'])
@login_required
def create_a_comment_by_expense_id(expense_id):
    expense = Expense.query.get(expense_id)
    if not expense:
        return jsonify({'message': 'Expense could not be found'}), 404
    if can_view_an_expense(expense_id) == False:
        return jsonify({'message': 'Forbidden'}), 403
    form = CreateEditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            creator_id=current_user.id,
            expense_id=expense_id,
            comment=form.data['comment']
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict())
    return form.errors, 400

# Get All Payments by Expense ID ; GET ; /api/expenses/:expenseId/payments
@expense_routes.route('/<int:expense_id>/payments', methods=['GET'])
@login_required
def get_all_payments_by_expense_id(expense_id):
    expense = Expense.query.get(expense_id)
    if not expense:
        return jsonify({'message': 'Expense could not be found'}), 404
    if can_view_an_expense(expense_id) == False:
        return jsonify({'message': 'Forbidden'}), 403
    payments = Payment.query.filter(Payment.expense_id == expense_id).all()
    expense_data = expense.to_dict()
    payments_data = [{
        'id': payment.id,
        'expense_id': payment.expense_id,
        'borrower_id': payment.borrower_id,
        'borrower_username': User.query.get(payment.borrower_id).username,
        'payment_made': payment.payment_made,
        'each_person': expense_data['each_person'],
        'created_at': payment.created_at,
        'updated_at': payment.updated_at,
    } for payment in payments]
    return jsonify({'payments': payments_data})

# Create a Payment by Expense ID ; POST; /api/expenses/:expenseId/payments
@expense_routes.route('/<int:expense_id>/payments', methods=['POST'])
@login_required
def create_a_payment_by_expense_id(expense_id):
    expense = Expense.query.get(expense_id)
    if not expense:
        return jsonify({'message': 'Expense could not be found'}), 404
    if not expense.lender_id == current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    form = CreateEditPaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        borrower_username = form.data['borrower_username']
        borrower = User.query.filter(User.username == borrower_username).first()
        borrower_id = borrower.id
        new_payment = Payment(
            expense_id=expense_id,
            borrower_id=borrower_id,
            payment_made=form.data['payment_made'],
        )
        db.session.add(new_payment)
        db.session.commit()
        return jsonify(new_payment.to_dict())
    return form.errors, 400

# Get Expense Details ; GET ; /api/expenses/:expenseId
@expense_routes.route('/<int:expense_id>', methods=['GET'])
@login_required
def get_expense_details(expense_id):
    expense = Expense.query.get(expense_id)
    if not expense:
        return jsonify({'message': 'Expense could not be found'}), 404
    if can_view_an_expense(expense_id) == False:
        return jsonify({'message': 'Forbidden'}), 403
    lender_username = User.query.get(expense.lender_id).username
    expense_data = expense.to_dict()
    expense_data['lender_username'] = lender_username
    return jsonify(expense_data)

# Edit an Expense ; PUT ; /api/expenses/:expenseId
@expense_routes.route('/<int:expense_id>', methods=['PUT'])
@login_required
def edit_an_expense(expense_id):
    expense = Expense.query.filter(Expense.id == expense_id).first()
    if not expense:
        return jsonify({'message': 'Expense could not be found'}), 404
    if not expense.lender_id == current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    form = CreateEditExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        expense.description=form.data['description']
        expense.category=form.data['category']
        expense.amount=form.data['amount']
        expense.shared_among=form.data['shared_among']
        expense.bill_settled=form.data['bill_settled']
        db.session.commit()
        return jsonify(expense.to_dict())
    return form.errors, 400

# Delete an Expense ; DELETE ; /api/expenses/:expenseId
@expense_routes.route('/<int:expense_id>', methods=['DELETE'])
@login_required
def delete_an_expense(expense_id):
    expense = Expense.query.filter(Expense.id == expense_id).first()
    if not expense:
        return jsonify({'message': 'Expense could not be found'}), 404
    if not expense.lender_id == current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'message': 'Expense deleted'})

# Get All Expenses I Involved; GET ; /api/expenses
@expense_routes.route('/', methods=['GET'])
@login_required
def get_all_expenses():
    all_expenses = Expense.query.all()
    involved_expenses = [expense for expense in all_expenses if can_view_an_expense(expense.id)]
    sorted_expenses = sorted(involved_expenses, key=lambda expense: expense.bill_settled)
    return jsonify({'expenses': [expense.to_dict() for expense in sorted_expenses]})

# Create an Expense ; POST ; /api/expenses
@expense_routes.route('/', methods=['POST'])
@login_required
def create_an_expense():
    form = CreateEditExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_expense = Expense(
            lender_id=current_user.id,
            description=form.data['description'],
            category=form.data['category'],
            amount=form.data['amount'],
            shared_among=form.data['shared_among'],
            bill_settled=form.data['bill_settled']
        )
        db.session.add(new_expense)
        db.session.commit()
        return jsonify(new_expense.to_dict())
    return form.errors, 400
