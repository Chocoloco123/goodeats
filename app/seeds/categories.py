from app.models import db, Category


def seed_categories():
  italian = Category(
    name="Italian",
  )
  chinese = Category(
    name="Chinese"
  )
  mexican = Category(
    name="Mexican"
  )
  american = Category(
    name="American"
  )
  other = Category(
    name="Other"
  )
  db.session.add(italian)
  db.session.add(chinese)
  db.session.add(mexican)
  db.session.add(american)
  db.session.add(other)

  db.session.commit()


def undo_categories():
  db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
  db.session.commit()
