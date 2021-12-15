from app.models import db, Restaurant


def seed_restaurants():
  sottomare = Restaurant(
      name='Sotto Mare Oysteria & Seafood',
      description="Located in the heart of North Beach, San Francisco, Sotto Mare Restaurant provides a delicious and authentic Italian North Beach experience. We are proud to serve the freshest fish and shellfish in town; Oysters and clams on the half shell, Boston style Clam Chowder, Baccala, Crab Cioppino, Louis salads, Seafood Pastas and Seafood Risotto are just a few of the items we offer. For those who like to cook at home, we also offer a selection of our fresh fish daily. If you are looking for the best Italian seafood in San Francisco, you found us!",
      address="522 Green St.",
      city="San Francisco",
      state="CA",
      zipcode=94133,
      lat="",
      lng="",
      stars=5,
      review_count=3,
      categoryId=1,
      hours="Mon - Sun 11:30 AM - 9:00 PM",
      

  )

