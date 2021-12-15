from .db import db
from sqlalchemy.sql import func
import json

class Category(db.Model):
  __tablename__ = 'categories'

  id = db.Column(db.Integer, primary_key=True, autoincrement=False)
  name = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  # one restaurant has one category
  restaurant = db.relationship("Restaurant", back_populates="category")
  # the back populates name must be the same on the other table when declaring it (here we have restaurant for ex. and the back populates on the restaurant would be restaurant as well)

def to_dict(self):
  return {
    'id': self.id,
    'name': self.name,
    'created_at': self.created_at,
    'updated_at': self.updated_at
  }