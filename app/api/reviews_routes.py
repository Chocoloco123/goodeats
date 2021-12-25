from flask import Blueprint, jsonify, request
from app.forms.new_review_form import NewReviewForm
from app.models import Review, Restaurant, db
from flask_login import current_user, login_required

reviews_routes = Blueprint('review', __name__)

# @reviews_routes.route('/<int:id>/reviews', methods=['GET'])
@reviews_routes.route('/<int:id>', methods=['GET'])
def restaurant_reviews(id):
  reviews = Review.query.filter(Review.restaurantId == id).all()
  return {review.id: review.to_dict() for review in reviews}

# @reviews_routes.route('/<int:reviewId>', methods=['GET'])
# def get_A_review(reviewId):
#   review = Review.query.get(reviewId)
#   return { review.id: review.to_dict() }

# @reviews_routes.route('/<int:id>/reviews/new', methods=['POST'])
@reviews_routes.route('/<int:id>/new', methods=['POST'])
def add_review(id):
  currentUser = current_user.to_dict()
  newReviewForm = NewReviewForm()
  newReviewForm['csrf_token'].data = request.cookies['csrf_token']
  if newReviewForm.validate_on_submit():
    # review = Review(
    #   userId = newReviewForm.data['userId'],
    #   restaurantId = newReviewForm.data['restaurantId'],
    #   rating = newReviewForm.data['rating'],
    #   content = newReviewForm.data['content']
    # )
    review = Review()
    newReviewForm.populate_obj(review)

    db.session.add(review)
    db.session.commit()
    return {"review":review.to_dict()}
  # else:
  #   return "Bad Data"

@reviews_routes.route('/<int:id>/edit', methods=['GET', 'PUT'])
def update_review(id):
  editReviewForm = NewReviewForm()
  editReviewForm['csrf_token'].data = request.cookies['csrf_token']
  review = Review.query.get(id)
  # print('the backend review --> ', review.to_dict())
  if editReviewForm.validate_on_submit():
    editReviewForm.populate_obj(review)

    db.session.commit()
    return review.to_dict()
  else:
    return "Bad data"

  # @reviews_routes.route('/<int:id>/reviews/<int:reviewId>', methods=['DELETE'])
  # @login_required
@reviews_routes.route('/<int:reviewId>/delete', methods=['DELETE'])
def delete_review(reviewId):
  # def delete_review(reviewId, id):
  review = Review.query.get(reviewId);
  print('review backend: -----> ', review)
  # currentUser = current_user.to_dict()
  # if currentUser['id'] == review.user.id:
  if review:
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()
  else:
    return '401'

