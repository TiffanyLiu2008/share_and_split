from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment_1_1 = Comment(expense_id=1, creator_id=1, comment='How did you guys like the movie?')
    comment_2_2 = Comment(expense_id=2, creator_id=2, comment='Too much food lol')
    comment_3_3 = Comment(expense_id=3, creator_id=3, comment='Time to pay rent')
    comment_4_4 = Comment(expense_id=4, creator_id=4, comment='We all need to workout!')
    comment_5_5 = Comment(expense_id=5, creator_id=5, comment='What a great trip!')
    comment_6_1 = Comment(expense_id=6, creator_id=1, comment='Solar power saves us $$$')
    comment_7_2 = Comment(expense_id=7, creator_id=2, comment='Thanks for your contribution!')
    comment_8_3 = Comment(expense_id=8, creator_id=3, comment='Such an awesome show!')
    comment_9_4 = Comment(expense_id=9, creator_id=4, comment='A new go to place huh?')
    comment_10_5 = Comment(expense_id=10, creator_id=5, comment='Cannot wait for the white elephant next week haha')

    db.session.add(comment_1_1)
    db.session.add(comment_2_2)
    db.session.add(comment_3_3)
    db.session.add(comment_4_4)
    db.session.add(comment_5_5)
    db.session.add(comment_6_1)
    db.session.add(comment_7_2)
    db.session.add(comment_8_3)
    db.session.add(comment_9_4)
    db.session.add(comment_10_5)

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
