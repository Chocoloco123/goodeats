import { NavLink } from "react-router-dom";
import './SingleRestaurantCard.css'
// import goodeatsLogo from '../../media/goodeats_transparent-thin.png'
// import goodeatsFlower from '../../media/goodeats_flower_transparent.png'
import goodeatsLogoWhite from '../../media/goodeats_transparent_white-thin.png'


const SingleRestaurantCard = ({id, name, description, address, city, state, zipcode, stars, review_count, categoryId, hours, ownerId, priceRating, phoneNumber, websiteUrl, imageUrl}) => {
  
  if (imageUrl) {

    const validImageUrl = theUrl => {
      try { 
        return Boolean(new URL(theUrl)); 
      } catch(e) { 
        return false; 
      }
    }

    return (
      <div>
        <NavLink to={`/restaurants/${id}`} className='restaurantLinkStyling'>
          <div className='singleImageCardDiv'>
            {validImageUrl(imageUrl) ?
              <img src={imageUrl} alt='' className="restaurantImageCardItem"></img> :
              <div className="restaurantImageCardItem restCard-ImgNotFound">
                <img src={goodeatsLogoWhite} alt='' className="notFoundGoodeatsLogo-card"></img>
                {/* <h3 className="imageNotFound-Txt-card">
                  Image Not Found
                </h3> */}
                {/* <img src={goodeatsFlower} alt='' className="notFoundGoodeatsFlower"></img> */}
              </div>
              // <img src={"https://res.cloudinary.com/dsz4sha80/image/upload/v1640754109/image-not-found-1-scaled-1150x647_kvjwxm.png"} alt='' className="restaurantImageCardItem"></img>
            }
            {/* <img src={imageUrl} alt="Restaurant" className="restaurantImageCardItem"/> */}
            <div className="innerCardInfoDiv">
              <span className="cardRestaurantName">{name}</span>
              {/* <span className="restOfCard">{stars} {review_count} reviews</span> */}
              {/* <span className="restOfCard">{categoryId}</span> */}
              <span className="restOfCard">{city}, {state}</span>
            </div>
          </div>
        </NavLink>
      </div>
    )
  }

}

export default SingleRestaurantCard;