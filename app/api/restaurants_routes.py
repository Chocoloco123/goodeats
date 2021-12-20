from flask import Blueprint, jsonify, request
from app.models import Restaurant, db
from app.forms import NewRestaurantForm

from flask_login import current_user

restaurant_routes = Blueprint('restaurant', __name__)

# restaurants for landing page
@restaurant_routes.route('/', methods=['GET'])
def main_restaurants():
  restaurants = Restaurant.query.all()
  # print('before: ', restaurants)
  if restaurants:
    restaurants = {r.id : r.to_dict() for r in restaurants}
    # print('this is restaurants backend: ',restaurants)
    return restaurants
  else:
    return {'message': 'Main restaurants not found!'}

# single restaurant page
@restaurant_routes.route('/<int:id>', methods=['GET'])
def one_restaurant(id):
  single_restaurant = Restaurant.query.get(id)
  if single_restaurant:
    single_restaurant = single_restaurant.to_dict()
    print('backend single_restaurant: ', single_restaurant)
    return single_restaurant
  else:
    return {'message':'Restaurant not found.'}

# add new restaurant
@restaurant_routes.route('/new', methods=["POST"])
def add_restaurant():
  currentUser = current_user.to_dict()
  new_restaurant_form = NewRestaurantForm()
  new_restaurant_form['csrf_token'].data = request.cookies['csrf_token']
  if new_restaurant_form.validate_on_submit():
    restaurant = Restaurant(
      name = new_restaurant_form.data['name'],
      description = new_restaurant_form.data['description'],
      address = new_restaurant_form.data['address'],
      city = new_restaurant_form.data['city'],
      state = new_restaurant_form.data['state'],
      zipcode = new_restaurant_form.data['zipcode'],
      hours = new_restaurant_form.data['hours'],
      priceRating = new_restaurant_form.data['priceRating'],
      phoneNumber = new_restaurant_form.data['phoneNumber'],
      websiteUrl = new_restaurant_form.data['websiteUrl'],
      imageUrl=new_restaurant_form.data['imageUrl'],
      categoryId=int(new_restaurant_form.data['category']),
      ownerId=currentUser['id']
    )

    db.session.add(restaurant)
    db.session.commit()
    return restaurant.to_dict()
  else:
    return "Bad Data"

