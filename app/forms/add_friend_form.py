from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, friendships, db
from flask_login import current_user

def find_user(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('Username could not be found')

def already_friends(form, field):
    new_friend_username = field.data
    existing_friends = current_user.friends
    if any(friend.username == new_friend_username for friend in existing_friends):
        raise ValidationError('You guys are already friends')

def add_self(form, field):
    username = field.data
    if username == current_user.username:
        raise ValidationError('You could not add yourself')

class AddFriendForm(FlaskForm):
    friend_username = StringField('Username of your friend', validators=[DataRequired(), find_user, already_friends, add_self])
    submit = SubmitField('Submit')
