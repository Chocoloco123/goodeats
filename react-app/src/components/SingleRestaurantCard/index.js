import { NavLink } from "react-router-dom";
import './SingleRestaurantCard.css'


const SingleRestaurantCard = ({id, name, description, address, city, state, zipcode, stars, review_count, categoryId, hours, ownerId, priceRating, phoneNumber, websiteUrl, imageUrl}) => {
  
  if (imageUrl) {
    return (
      <div>
        <NavLink to={`/restaurants/${id}`} className='restaurantLinkStyling'>
          <div className='singleImageCardDiv'>
            <img src={imageUrl} alt="Restaurant" className="restaurantImageCardItem"/>
            <span className="cardRestaurantName">{name}</span>
            <span className="restOfCard">{stars} {review_count} reviews</span>
            <span className="restOfCard">{categoryId}</span>
            <span className="restOfCard">{city}, {state}</span>
          </div>
        </NavLink>
      </div>
    )
  }

}

export default SingleRestaurantCard;