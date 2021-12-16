from flask import Blueprint, jsonify, request
from app.models import Restaurant, db

from flask_login import current_user

restaurant_routes = Blueprint('restaurant', __name__)

@restaurant_routes.route('/', methods=['GET'])
def main_restaurants():
  restaurants = Restaurant.query.limit(20).all()
  if restaurants:
    restaurants = {r.id : r.to_dict() for r in restaurants}
    return restaurants
  else:
    return {'message': 'Main restaurants not found!'}

