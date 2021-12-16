from app.models import db, Review

def seed_reviews():
  for i in range(1, 16):
    rev_first = Review(
      userId=1,
      restaurantId=i,
      rating=5,
      content="The food was delicious!",
    )
    rev_second = Review(
        userId=2,
        restaurantId=i,
        rating=4,
        content="Food was pretty good here.",
    )
    rev_third = Review(
        userId=3,
        restaurantId=i,
        rating=5,
        content="I love this place!",
    )
    db.session.add(rev_first)
    db.session.add(rev_second)
    db.session.add(rev_third)
  
  db.session.commit()


def undo_reviews():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
