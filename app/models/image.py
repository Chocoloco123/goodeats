from .db import db
from sqlalchemy.sql import func

class Image(db.Model):
  __tablename__ = 'images'