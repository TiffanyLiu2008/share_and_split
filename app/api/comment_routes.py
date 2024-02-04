from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Expense, Comment, db
from flask_migrate import Migrate
from app.forms.create_edit_comment_form import CreateEditCommentForm

comment_routes = Blueprint('comment', __name__)

# Edit a Comment ; PUT ; /api/comments/:commentId
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_a_comment(comment_id):
    comment = Comment.query.filter(Comment.id == comment_id).first()
    if not comment:
        return jsonify({'message': 'Comment could not be found'}), 404
    if not comment.creator_id == current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    form = CreateEditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment=form.data['comment']
        db.session.commit()
        return jsonify(comment.to_dict())
    return form.errors, 400

# Delete a Comment ; DELETE ; /api/comments/:commentId
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_a_comment(comment_id):
    comment = Comment.query.filter(Comment.id == comment_id).first()
    if not comment:
        return jsonify({'message': 'Comment could not be found'}), 404
    if not comment.creator_id == current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted'})
