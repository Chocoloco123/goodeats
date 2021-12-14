from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func

class Restuarant(db.Model):
  __tablename__ = 'restaurants'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  description = db.Column(db.Text, nullable=False)
  address = db.Column(db.String, nullable=False)
  city = db.Column(db.String, nullable=False)
  state = db.Column(db.String, nullable=False)
  zipcode = db.Column(db.Numeric(5,0), nullable=False)
  lat = db.Column(db.Numeric(), nullable=True)
  lng = db.Column(db.Numeric(), nullable=True)
  stars = db.Column(db.Integer, nullable=True)
  review_count = db.Column(db.Integer, nullable=True)
  categoryId = db.Column(db.Integer, nullable=False)
  hours = db.Column(db.Text, nullable=False)
  ownerId = db.Column(db.Integer, nullable=False)
  priceRating = db.Column(db.Integer, nullable=False)
  phoneNumber = db.Column(db.Integer, nullable=True)
  websiteUrl = db.Column(db.String, nullable=True)
  imageUrl = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

