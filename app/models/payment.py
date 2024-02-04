from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Payment(db.Model):
    __tablename__ = 'payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expenses.id')), nullable=False)
    borrower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    payment_made = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    borrower = db.relationship('User', back_populates='payment')
    expense = db.relationship('Expense', back_populates='payment')

    def to_dict(self):
        return {
            'id': self.id,
            'expense_id': self.expense_id,
            'borrower_id': self.borrower_id,
            'payment_made': self.payment_made,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
