from flask_wtf import FlaskForm
from wtforms import IntegerField,  TextAreaField
from wtforms.fields.core import SelectField
from wtforms.validators import DataRequired, NumberRange

class NewReviewForm(FlaskForm):
  userId = IntegerField('userId', validators=[DataRequired()])
  restaurantId = IntegerField('restaurantId', validators=[DataRequired()])
  rating = IntegerField('Rating', validators=[DataRequired(
  ), NumberRange(min=1, max=5, message='Rating must be between 1 - 5')])
  # rating = SelectField('Rating', choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], validators=[DataRequired(
  # )])
  content = TextAreaField('Content', validators=[DataRequired()])
