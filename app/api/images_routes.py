from flask import Blueprint, jsonify, request
from app.models import Image, db
from app.forms import NewImageForm

from flask_login import current_user

images_routes = Blueprint('image', __name__)

# @images_routes.route('/<int:id>', methods=['GET'])
# def restaurant_images(id):
#   images = Image.query.filter(Image.restaurantId == id).all()
#   print('helloooooooooo: ', {image.id: image.to_dict() for image in images})
#   return {image.id: image.to_dict() for image in images}

@images_routes.route('/<int:restaurantId>', methods=['GET'])
def restaurant_images(restaurantId):
  images = Image.query.filter(Image.restaurantId == restaurantId).all()
  return {image.id: image.to_dict() for image in images}

@images_routes.route('/<int:restaurantId>/newImage', methods=["POST"])
def add_image(restaurantId):
  newImageForm = NewImageForm()
  newImageForm['csrf_token'].data = request.cookies['csrf_token']
  if newImageForm.validate_on_submit():
    image = Image()
    newImageForm.populate_obj(image)

    db.session.add(image)
    db.session.commit()
    return {"image":image.to_dict()}


@images_routes.route('/<int:imageId>/delete', methods=['DELETE'])
def delete_image(imageId):
  image = Image.query.get(imageId)

  if image: 
    db.session.delete(image)
    db.session.commit()
    return image.to_dict()
  else: 
    return '401'