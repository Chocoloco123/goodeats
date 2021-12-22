from flask import Blueprint, jsonify, request
from app.forms.new_review_form import NewReviewForm
from app.models import Review, Restaurant, db
from flask_login import current_user

reviews_routes = Blueprint('review', __name__)

@reviews_routes.route('/<int:id>/reviews', methods=['GET'])
def restaurant_reviews(id):
  reviews = Review.query.filter(Review.restaurantId == id).all()
  return {review.id: review.to_dict() for review in reviews}


@reviews_routes.route('/<int:id>/reviews/new', methods=['POST'])
def add_review():
  currentUser = current_user.to_dict()
  newReviewForm = NewReviewForm()
  newReviewForm['csrf_token'].data = request.cookies['csrf_token']
  if newReviewForm.validate_on_submit():
    review = Review(
      userId = newReviewForm.data['userId'],
      restaurantId = newReviewForm.data['restaurantId'],
      rating = newReviewForm.data['rating'],
      content = newReviewForm.data['content']
    )

    db.session.add(review)
    db.session.commit()
    return review.to_dict()
  else:
    return "Bad Data"