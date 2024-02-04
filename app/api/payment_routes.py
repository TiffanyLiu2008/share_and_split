from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Expense, Payment, db
from flask_migrate import Migrate
from app.forms.create_edit_payment_form import CreateEditPaymentForm

payment_routes = Blueprint('payment', __name__)

def involve_a_payment(payment_id):
    payment = Payment.query.get(payment_id)
    expense_id = payment.expense_id
    # As a borrower
    if payment.borrower_id == current_user.id:
        return True
    # As a lender
    expense = Expense.query.filter(Expense.id == expense_id).first()
    if expense.lender_id == current_user.id:
        return True
    return False

# Get All My Payments ; GET ; /api/payments/current
@payment_routes.route('/current', methods=['GET'])
@login_required
def get_my_payments():
    all_payments = Payment.query.all()
    involved_payments = [payment for payment in all_payments if involve_a_payment(payment.id)]
    payments_data = []
    for payment in involved_payments:
        borrower_username = User.query.get(payment.borrower_id).username
        expense = Expense.query.get(payment.expense_id)
        expense_data = expense.to_dict()
        lender_username = User.query.get(expense.lender_id).username
        payment_data = {
            'id': payment.id,
            'expense_id': payment.expense_id,
            'borrower_id': payment.borrower_id,
            'borrower_username': borrower_username,
            'lender_username': lender_username,
            'each_person': expense_data['each_person'],
            'payment_made': payment.payment_made,
            'created_at': payment.created_at,
            'updated_at': payment.updated_at,
        }
        payments_data.append(payment_data)
    sorted_payments = sorted(payments_data, key=lambda payment: payment['payment_made'])
    return jsonify({'payments': sorted_payments})

# Edit a Payment ; PUT ; /api/payments/:paymentId
@payment_routes.route('/<int:payment_id>', methods=['PUT'])
@login_required
def edit_a_payment(payment_id):
    payment = Payment.query.filter(Payment.id == payment_id).first()
    if not payment:
        return jsonify({'message': 'Payment could not be found'}), 404
    if involve_a_payment(payment_id) == False:
        return jsonify({'message': 'Forbidden'}), 403
    form = CreateEditPaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        payment.payment_made=form.data['payment_made']
        db.session.commit()
        return jsonify(payment.to_dict())
    return form.errors, 400
