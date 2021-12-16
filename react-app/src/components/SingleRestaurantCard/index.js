import { NavLink } from "react-router-dom";


const SingleProductCard = ({id, name, description, address, city, state, zipcode, stars, review_count, categoryId, hours, ownerId, priceRating, phoneNumber, websiteUrl, imageUrl}) => {
  
  if (imageUrl) {
    return (
      <div>
        <NavLink to={`/restaurants/${id}`}>
          <div>
            <img src={imageUrl} alt="Restaurant"/>
            <span>{name}</span>
            <span>{stars} {review_count} reviews</span>
            <span>{categoryId}</span>
            <span>{city}, {state}</span>
          </div>
        </NavLink>
      </div>
    )
  }

}

export default SingleProductCard;