from .db import db
from sqlalchemy.sql import func

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
  restaurantId = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=True)
  rating = db.Column(db.Integer, nullable=False)
  content = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  user = db.relationship("User", back_populates="reviews")
  restaurants = db.relationship("Restaurant", back_populates="reviews")

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'restaurantId': self.restaurantId,
      'rating': self.rating,
      'content': self.content,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
