from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField
from wtforms.validators import DataRequired, URL


class NewRestaurantForm(FlaskForm):
    name = StringField('title', validators=[DataRequired()])
    
