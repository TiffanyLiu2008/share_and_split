"""empty message

Revision ID: 0764a17cfc3b
Revises:
Create Date: 2024-05-31 20:43:06.967025

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
schema = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '0764a17cfc3b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {schema};")
    op.create_table('expenses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('lender_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('category', sa.String(length=255), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('shared_among', sa.Integer(), nullable=False),
    sa.Column('bill_settled', sa.Boolean(), nullable=False),
    sa.Column('expense_date', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['lender_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE expenses SET SCHEMA {schema};")
    op.create_table('friendships',
    sa.Column('inviter_id', sa.Integer(), nullable=True),
    sa.Column('invitee_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['invitee_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['inviter_id'], ['users.id'], )
    )
    if environment == "production":
        op.execute(f"ALTER TABLE friendships SET SCHEMA {schema};")
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=False),
    sa.Column('expense_id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['expense_id'], ['expenses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE comments SET SCHEMA {schema};")
    op.create_table('payments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('expense_id', sa.Integer(), nullable=False),
    sa.Column('borrower_id', sa.Integer(), nullable=False),
    sa.Column('payment_made', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['borrower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['expense_id'], ['expenses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE payments SET SCHEMA {schema};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('payments')
    op.drop_table('comments')
    op.drop_table('friendships')
    op.drop_table('expenses')
    op.drop_table('users')
    # ### end Alembic commands ###
