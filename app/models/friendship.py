from .db import db, environment, SCHEMA, add_prefix_for_prod

friendships = db.Table(
    'friendships',
    db.Column('inviter_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('invitee_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)

if environment == "production":
    friendships.schema = SCHEMA
