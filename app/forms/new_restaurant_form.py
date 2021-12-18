from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField
from wtforms.fields.core import IntegerField
from wtforms.fields.simple import SubmitField
from wtforms.validators import DataRequired, URL


class NewRestaurantForm(FlaskForm):
    name = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired()])
    # category = StringField('category', validators=[DataRequired()])
    hours = TextAreaField('hours', validators=[DataRequired()])
    priceRating = IntegerField('priceRating', validators=[DataRequired()])
    phoneNumber = StringField('phoneNumber', validators=[DataRequired()])
    websiteUrl = StringField('websiteUrl', validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[DataRequired()])
    

