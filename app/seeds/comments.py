from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    olivia_rent = Comment(
        creator_id=1, expense_id=1, comment='Time to pay rent. $1000 each.')
    emma_rent = Comment(
        creator_id=2, expense_id=1, comment='Payment sent. Thanks Olivia.')
    emma_dinner = Comment(
        creator_id=2, expense_id=2, comment='Hope you all enjoyed the dinner!')
    liam_dinner = Comment(
        creator_id=3, expense_id=2, comment='Great food!')
    liam_train = Comment(
        creator_id=3, expense_id=3, comment='Train ticket to New York. $50 each.')
    noah_train = Comment(
        creator_id=4, expense_id=3, comment='Perfect trip! Will venmo you tomorrow.')
    noah_movie = Comment(
        creator_id=4, expense_id=4, comment='How did you guys like the movie?')
    oliver_movie = Comment(
        creator_id=5, expense_id=4, comment='Worst movie I have even seen lol.')
    oliver_donation = Comment(
        creator_id=5, expense_id=5, comment='Donation to our school. $10 each.')
    olivia_donation = Comment(
        creator_id=1, expense_id=5, comment='Payment sent. Missed our days on campus.')

    db.session.add(olivia_rent)
    db.session.add(emma_rent)
    db.session.add(emma_dinner)
    db.session.add(liam_dinner)
    db.session.add(liam_train)
    db.session.add(noah_train)
    db.session.add(noah_movie)
    db.session.add(oliver_movie)
    db.session.add(oliver_donation)
    db.session.add(olivia_donation)
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
