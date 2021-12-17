import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneRestaurant } from "../../store/restaurants";
import './SingleRestaurant.css'

const SingleRestaurantPage = () => {
  const { id } = useParams()
  const restaurant = useSelector((state) => state?.restaurant)
  // const restaurant = useSelector((state) => state?.restaurant[id] ? state?.restaurant[id] : "")
  
  
  const dispatch = useDispatch();
  console.log('single page restaurant: ', restaurant)

  useEffect(() => {
    dispatch(getOneRestaurant(id))
    console.log('!!!!!!!!!!!!!!!!!!!')
  }, [dispatch, id])
  console.log('hereeeeeeeeeee')
  console.log('after: ', restaurant)
  if (!restaurant) {
    return null
  } else {
    return (
      <div>
        <div>
          <div className='restaurantIntroNavDiv'>
            <div className="restaurantIntroInnerDiv">
              {restaurant.name}
            </div>
            <div className="starsAndReviewsDiv">
              <div className="starsDiv">
                Stars: {restaurant.stars}
              </div>
              <div>
                review count: {restaurant.review_count}
              </div>
            </div>
            <div className="singleRestaurantCategoryDiv">
              The category: {restaurant.categoryId}
            </div>
          </div>
        </div>
        <div className='reviewAndAddPhotoDiv'>
          <button className='writeAReviewBtn'><i className="far fa-star"></i> Write a Review</button>
          {/* <button>Add Photo</button> */}
          <div className="locationAndHoursDiv">
            <h3>Location & Hours</h3>
            {restaurant.hours}
          </div>
          <div>
            <img src={restaurant.imageUrl} alt='' className="singleImage"></img>
          </div>
        </div>
        <div className="aboutAndContactDiv">
          <div className="restaurantAboutDiv">
            <h3>
              About the Business
            </h3>
            {restaurant.description}
          </div>
          <div className="restaurantContactDiv">
            {restaurant.websiteUrl}
            {restaurant.phoneNumber}
          </div>
        </div>
      </div>
      // import reviews component here

    )


  }

}

export default SingleRestaurantPage