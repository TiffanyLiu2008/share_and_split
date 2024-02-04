from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    olivia = Comment(
        creator_id=1, expense_id=1, comment='Time to pay rent. $1000 each.')
    liam_rent = Comment(
        creator_id=3, expense_id=1, comment='Just paid. Thanks Olivia.')
    liam_movie = Comment(
        creator_id=3, expense_id=2, comment='Payment sent. Great movie.')
    noah = Comment(
        creator_id=4, expense_id=2, comment='Thanks Emma. Will venmo you tomorrow.')

    db.session.add(olivia)
    db.session.add(liam_rent)
    db.session.add(liam_movie)
    db.session.add(noah)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
