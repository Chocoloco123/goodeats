from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField
from wtforms.fields.core import IntegerField
from wtforms.fields.simple import SubmitField
from wtforms.validators import DataRequired, URL


class EditRestaurantForm(FlaskForm):
    name = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired()])
    category = StringField('category', default=5)
    hours = TextAreaField('hours', validators=[DataRequired()])
    priceRating = IntegerField('priceRating', default=2)
    phoneNumber = StringField('phoneNumber', validators=[DataRequired()])
    websiteUrl = StringField('websiteUrl', validators=[DataRequired()])
    imageUrl = StringField('imageUrl')
