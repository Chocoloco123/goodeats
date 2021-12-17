from flask import Blueprint, jsonify, request
from app.models import Restaurant, db

from flask_login import current_user

restaurant_routes = Blueprint('restaurant', __name__)

# restaurants for landing page
@restaurant_routes.route('/', methods=['GET'])
def main_restaurants():
  restaurants = Restaurant.query.all()
  print('before: ', restaurants)
  if restaurants:
    restaurants = {r.id : r.to_dict() for r in restaurants}
    print('this is restaurants backend: ',restaurants)
    return restaurants
  else:
    return {'message': 'Main restaurants not found!'}

# single restaurant page
@restaurant_routes.route('/<int:id>', methods=['GET'])
def one_restaurant(id):
  single_restaurant = Restaurant.query.get(id)
  
  if single_restaurant:
    single_restaurant = single_restaurant.to_dict()
    return single_restaurant
  else:
    return {'message':'Restaurant not found.'}

