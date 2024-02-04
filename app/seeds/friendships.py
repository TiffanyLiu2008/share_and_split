from app.models import db, friendships, environment, SCHEMA
from sqlalchemy.sql import text

def seed_friendships():
    friendship_1_2 = friendships.insert().values(inviter_id=1, invitee_id=2)
    friendship_1_3 = friendships.insert().values(inviter_id=1, invitee_id=3)
    friendship_1_4 = friendships.insert().values(inviter_id=1, invitee_id=4)
    friendship_2_3 = friendships.insert().values(inviter_id=2, invitee_id=3)
    friendship_2_4 = friendships.insert().values(inviter_id=2, invitee_id=4)
    friendship_2_5 = friendships.insert().values(inviter_id=2, invitee_id=5)
    friendship_3_4 = friendships.insert().values(inviter_id=3, invitee_id=4)
    friendship_3_5 = friendships.insert().values(inviter_id=3, invitee_id=5)
    friendship_4_5 = friendships.insert().values(inviter_id=4, invitee_id=5)

    db.session.execute(friendship_1_2)
    db.session.execute(friendship_1_3)
    db.session.execute(friendship_1_4)
    db.session.execute(friendship_2_3)
    db.session.execute(friendship_2_4)
    db.session.execute(friendship_2_5)
    db.session.execute(friendship_3_4)
    db.session.execute(friendship_3_5)
    db.session.execute(friendship_4_5)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friendships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friendships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friendships"))

    db.session.commit()
