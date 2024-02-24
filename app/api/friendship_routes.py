from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, friendships, db
from flask_migrate import Migrate
from app.forms.add_friend_form import AddFriendForm
from sqlalchemy import or_, not_

friendship_routes = Blueprint('friendship', __name__)

# Get All My Friends ; GET ; /api/friendships/current
@friendship_routes.route('/current', methods=['GET'])
@login_required
def get_my_friends():
    friends = User.query.join(
        friendships,
        or_(
            (friendships.c.inviter_id == User.id),
            (friendships.c.invitee_id == User.id)
        )
    ).filter(
        (friendships.c.inviter_id == current_user.id) | (friendships.c.invitee_id == current_user.id),
        not_(User.id == current_user.id)
    ).all()
    return jsonify({'friends': [friend.to_dict() for friend in friends]})

# Add a Friend ; POST ; /api/friendships
@friendship_routes.route('/', methods=['POST'])
@login_required
def add_a_friend():
    form = AddFriendForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        friend_username = form.data['friend_username']
        friend = User.query.filter(User.username == friend_username).first()
        friend_id = friend.id
        new_friendship = {
            'inviter_id': current_user.id,
            'invitee_id': friend_id
        }
        db.session.execute(friendships.insert().values(new_friendship))
        db.session.commit()
        return jsonify(new_friendship)
    return form.errors, 400

# Remove a Friend ; DELETE ; /api/friendships/:friendId
@friendship_routes.route('/<int:friend_id>', methods=['DELETE'])
@login_required
def remove_a_friend(friend_id):
    existing_friends = current_user.buddies
    if not any(friend.id == friend_id for friend in existing_friends):
        return jsonify({'message': 'Friend could not be found'}), 404
    db.session.execute(friendships.delete().where(
        ((friendships.c.inviter_id == current_user.id) & (friendships.c.invitee_id == friend_id)) |
        ((friendships.c.invitee_id == current_user.id) & (friendships.c.inviter_id == friend_id))
    ))
    db.session.commit()
    return jsonify({'message': 'Friend deleted'})
