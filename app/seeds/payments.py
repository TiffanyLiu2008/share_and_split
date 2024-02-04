from app.models import db, Payment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_payments():
    emma_rent = Payment(
        expense_id=1, borrower_id=2, payment_made=True)
    liam_rent = Payment(
        expense_id=1, borrower_id=3, payment_made=True)
    noah_rent = Payment(
        expense_id=1, borrower_id=4, payment_made=True)
    olivia_movie = Payment(
        expense_id=2, borrower_id=1, payment_made=False)
    liam_movie = Payment(
        expense_id=2, borrower_id=3, payment_made=True)
    noah_movie = Payment(
        expense_id=2, borrower_id=4, payment_made=False)
    oliver_movie = Payment(
        expense_id=2, borrower_id=5, payment_made=False)

    db.session.add(emma_rent)
    db.session.add(liam_rent)
    db.session.add(noah_rent)
    db.session.add(olivia_movie)
    db.session.add(liam_movie)
    db.session.add(noah_movie)
    db.session.add(oliver_movie)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_payments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM payments"))

    db.session.commit()
