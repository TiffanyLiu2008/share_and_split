from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Expense(db.Model):
    __tablename__ = 'expenses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    lender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False, default='Others')
    amount = db.Column(db.Float, nullable=False)
    shared_among = db.Column(db.Integer, nullable=False, default=1)
    bill_settled = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    lender = db.relationship('User', back_populates='expense')
    comment = db.relationship('Comment', cascade='all,delete-orphan', back_populates='expense')
    payment = db.relationship('Payment', cascade='all,delete-orphan', back_populates='expense')

    def to_dict(self):
        return {
            'id': self.id,
            'lender_id': self.lender_id,
            'description': self.description,
            'category': self.category,
            'amount': self.amount,
            'shared_among': self.shared_among,
            'bill_settled': self.bill_settled,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'each_person': self.amount / self.shared_among
        }
