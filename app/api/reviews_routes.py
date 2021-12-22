from flask import Blueprint, jsonify, request
from app.models import Review, Restaurant, db
from flask_login import current_user

reviews_routes = Blueprint('review', __name__)

@reviews_routes.route('/<int:id>/reviews', methods=['GET'])
def restaurant_reviews(id):
  reviews = Review.query.filter(Review.restaurantId == id).all()
  return {review.id: review.to_dict() for review in reviews}
