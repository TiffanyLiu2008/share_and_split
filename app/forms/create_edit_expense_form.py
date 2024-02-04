from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, FloatField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError

def amount_above_zero(form, field):
    amount = field.data
    if amount < 0:
        raise ValidationError('Amount could not be negative')

def shared_with_people(form, field):
    num_people = field.data
    if num_people < 1:
        raise ValidationError('Number of people could not be negative')

class CreateEditExpenseForm(FlaskForm):
    choices = [
        ('Housing', 'Housing'),
        ('Food', 'Food'),
        ('Transporation', 'Transportation'),
        ('Entertainment', 'Entertainment'),
        ('Others', 'Others')
    ]
    description = StringField('Description', validators=[DataRequired()])
    category = RadioField('Category', choices=choices, default='Others', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired(), amount_above_zero])
    shared_among = IntegerField('Number of people involved including yourself', validators=[DataRequired(), shared_with_people])
    bill_settled = BooleanField('Bill settled?', default=False, validators=[DataRequired()])
    submit = SubmitField('Submit')
