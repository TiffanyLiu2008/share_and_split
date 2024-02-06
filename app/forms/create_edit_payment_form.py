from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from flask_login import current_user

def user_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('Username could not be found')

def borrow_self(form, field):
    username = field.data
    if username == current_user.username:
        raise ValidationError('Friend could not be yourself')

class CreateEditPaymentForm(FlaskForm):
    borrower_username = StringField('Username of your friend', validators=[DataRequired(), user_exists, borrow_self])
    payment_made = BooleanField('Payment made?', default=False, false_values=(False, '', 'false', 'False', 'FALSE'))
    submit = SubmitField('Submit')
