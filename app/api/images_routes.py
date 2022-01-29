from flask import Blueprint, jsonify, request
from app.models import Image, db
from app.forms import NewRestaurantForm

from flask_login import current_user

images_routes = Blueprint('image', __name__)

@images_routes.route('/<int:restaurantId>', methods=['GET'])
def restaurant_images(restaurantId):
  images = Image.query.filter(Image.restaurantId == restaurantId).all()
  return {image.id: image.to_dict() for image in images}
