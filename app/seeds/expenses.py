from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text

def seed_expenses():
    rent = Expense(
        lender_id=1, description='Rent', category='Housing', amount=4000, shared_among=4, bill_settled=True)
    movie = Expense(
        lender_id=2, description='Movie', category='Entertainment', amount=100, shared_among=5, bill_settled=False)

    db.session.add(rent)
    db.session.add(movie)
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
