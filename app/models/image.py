from .db import db
from sqlalchemy.sql import func

class Image(db.Model):
  __tablename__ = 'images'

  id = db.Column(db.Integer, primary_key=True)
  imageUrl = db.Column(db.String, nullable=False)
  restaurantId = db.Column(db.Integer, nullable=False)
  userId = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  restaurant = db.relationship("Restaurant", back_populates="images")
  user = db.relationship("User", back_populates="images")

  def to_dict(self):
    return {
      "id": self.id,
      "imageUrl": self.imageUrl,
      "restaurantId": self.restaurantId,
      "userId": self.userId,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }