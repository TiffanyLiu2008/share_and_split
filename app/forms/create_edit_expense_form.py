from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, FloatField, IntegerField, BooleanField, DateTimeField, SubmitField
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
        ('Entertainment', 'Entertainment'),
        ('Food and drink', 'Food and drink'),
        ('Home', 'Home'),
        ('Life', 'Life'),
        ('Transportation', 'Transportation'),
        ('Utilities', 'Utilities'),
        ('Uncategorized', 'Uncategorized')
    ]
    description = StringField('Description', validators=[DataRequired()])
    category = RadioField('Category', choices=choices, default='Uncategorized', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired(), amount_above_zero])
    shared_among = IntegerField('Number of people involved including yourself', validators=[DataRequired(), shared_with_people])
    bill_settled = BooleanField('Bill settled?', default=False, false_values=(False, '', 'false', 'False', 'FALSE'))
    expense_date = DateTimeField('Expense date', format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])
    submit = SubmitField('Submit')
