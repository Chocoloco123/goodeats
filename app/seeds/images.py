from app.models import db, Image

def seed_images():
  sottoM1 = Image(
    imageUrl="https://res.cloudinary.com/dsz4sha80/image/upload/v1639606611/sotoM1_mdwgrd.jpg",
    restaurantId=1,
    userId=1,
  )
  sottoM2 = Image(
    imageUrl="https://res.cloudinary.com/dsz4sha80/image/upload/v1639606701/sottoM2_pmsayv.jpg",
    restaurantId=1,
    userId=1
  )
  tony1 = Image(
      imageUrl="https://res.cloudinary.com/dsz4sha80/image/upload/v1639606806/tony1_t5liha.jpg",
      restaurantId=2,
      userId=1
  )
  tony2 = Image(
      imageUrl="https://res.cloudinary.com/dsz4sha80/image/upload/v1639606951/tony2_z9yhdx.jpg",
      restaurantId=2,
      userId=1
  )
  newSpotPolk = Image(
      imageUrl="https://res.cloudinary.com/dsz4sha80/image/upload/v1639607105/newSpotP1_lza5so.jpg",
      restaurantId=5,
      userId=1
  )

  db.session.add(sottoM1)
  db.session.add(sottoM2)
  db.session.add(tony1)
  db.session.add(tony2)
  db.session.add(newSpotPolk)

  db.session.commit()


def undo_images():
  db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
  db.session.commit()
