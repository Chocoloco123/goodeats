from flask_wtf import FlaskForm
from wtforms import IntegerField,  TextAreaField
from wtforms.validators import DataRequired, NumberRange

class NewReviewForm(FlaskForm):
  userId = IntegerField('userId', validators=[DataRequired()])
  restaurantId = IntegerField('restaurantId', validators=[DataRequired()])
  rating = IntegerField('Rating', validators=[DataRequired(
  ), NumberRange(min=1, max=5, message='Rating must be between 1 - 5')])
  content = TextAreaField('Content', validators=[DataRequired()])
