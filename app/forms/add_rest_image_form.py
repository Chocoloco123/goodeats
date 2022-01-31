from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired

class NewImageForm(FlaskForm):
  imageUrl = StringField('imageUrl', validators=[DataRequired()])
  restaurantId = IntegerField('restaurantId', validators=[DataRequired()])
  userId = IntegerField('userId', validators=[DataRequired()])
