from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_expenses():
    movie = Expense(
        lender_id=1, description='Movie', category='Entertainment', amount=50, shared_among=5, bill_settled=False, expense_date=datetime(2020, 1, 1, 9, 0, 0))
    dinner = Expense(
        lender_id=2, description='Dinner', category='Food and drink', amount=150, shared_among=5, bill_settled=False, expense_date=datetime(2021, 1, 1, 9, 0, 0))
    rent = Expense(
        lender_id=3, description='Rent', category='Home', amount=5000, shared_among=5, bill_settled=False, expense_date=datetime(2022, 1, 1, 9, 0, 0))
    gym = Expense(
        lender_id=4, description='Gym', category='Life', amount=500, shared_among=5, bill_settled=False, expense_date=datetime(2023, 1, 1, 9, 0, 0))
    cruise = Expense(
        lender_id=5, description='Cruise', category='Transportation', amount=100, shared_among=5, bill_settled=False, expense_date=datetime(2024, 1, 1, 9, 0, 0))
    electricity = Expense(
        lender_id=1, description='Electricity', category='Utilities', amount=250, shared_among=5, bill_settled=False, expense_date=datetime(2020, 1, 1, 9, 0, 0))
    donation = Expense(
        lender_id=2, description='Donation', category='Uncategorized', amount=200, shared_among=5, bill_settled=False, expense_date=datetime(2021, 1, 1, 9, 0, 0))
    concert = Expense(
        lender_id=3, description='Concert', category='Entertainment', amount=1000, shared_among=5, bill_settled=False, expense_date=datetime(2022, 1, 1, 9, 0, 0))
    coffee = Expense(
        lender_id=4, description='Coffee', category='Food and drink', amount=25, shared_among=5, bill_settled=False, expense_date=datetime(2023, 1, 1, 9, 0, 0))
    gift = Expense(
        lender_id=5, description='Gift', category='Uncategorized', amount=300, shared_among=5, bill_settled=False, expense_date=datetime(2024, 1, 1, 9, 0, 0))

    db.session.add(movie)
    db.session.add(dinner)
    db.session.add(rent)
    db.session.add(gym)
    db.session.add(cruise)
    db.session.add(electricity)
    db.session.add(donation)
    db.session.add(concert)
    db.session.add(coffee)
    db.session.add(gift)

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
