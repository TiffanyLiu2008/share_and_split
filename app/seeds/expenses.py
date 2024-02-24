from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text

def seed_expenses():
    rent = Expense(
        lender_id=1, description='Rent', category='Housing', amount=5000, shared_among=5, bill_settled=False)
    dinner = Expense(
        lender_id=2, description='Dinner', category='Food', amount=150, shared_among=5, bill_settled=False)
    train = Expense(
        lender_id=3, description='Train', category='Transportation', amount=250, shared_among=5, bill_settled=False)
    movie = Expense(
        lender_id=4, description='Movie', category='Entertainment', amount=100, shared_among=5, bill_settled=False)
    donation = Expense(
        lender_id=5, description='Donation', category='Others', amount=50, shared_among=5, bill_settled=True)

    db.session.add(rent)
    db.session.add(dinner)
    db.session.add(train)
    db.session.add(movie)
    db.session.add(donation)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expenses"))

    db.session.commit()
