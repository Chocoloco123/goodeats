from .db import db
from sqlalchemy.sql import func


class Restaurant(db.Model):
  __tablename__ = "restaurants"

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
  review_count = db.Column(db.Integer, default=0, nullable=True)
  categoryId = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=True)
  hours = db.Column(db.Text, nullable=False)
  ownerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
  priceRating = db.Column(db.Integer, nullable=False)
  phoneNumber = db.Column(db.String(15), nullable=True)
  websiteUrl = db.Column(db.String, nullable=True)
  imageUrl = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  category = db.relationship("Category", back_populates="restaurants")
  user = db.relationship("User", back_populates="restaurants")
  reviews = db.relationship("Review", back_populates="restaurants")
  images = db.relationship("Image", back_populates="restaurants")

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'address': self.addres,
      'city': self.city,
      'state': self.state,
      'zipcode': self.zipcode,
      'lat': self.lat,
      'lng': self.lng,
      'stars': self.stars,
      'review_count': self.review_count,
      'categoryId': self.categoryId,
      'hours': self.hours,
      'ownerId': self.ownerId,
      'priceRating': self.priceRating,
      'phoneNumber': self.phoneNumber,
      'websiteUrl': self.websiteUrl,
      'imageUrl': self.imageUrl,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }


