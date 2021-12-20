import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneRestaurant } from "../../store/restaurants";
import './SingleRestaurant.css'

const SingleRestaurantPage = () => {
  const { id } = useParams()
  const restaurant = useSelector((state) => state?.restaurant)
  // const restaurantId = restaurant.id
  // const restaurant = useSelector((state) => state?.restaurant[id] ? state?.restaurant[id] : "")
  
  
  const dispatch = useDispatch();
  console.log('single page restaurant: ', restaurant)

  useEffect(() => {
    dispatch(getOneRestaurant(id))
    // dispatch(getOneRestaurant(restaurantId))
    console.log('!!!!!!!!!!!!!!!!!!!')
  }, [dispatch, id])
  console.log('hereeeeeeeeeee')
  console.log('after: ', restaurant)
  if (!restaurant) {
    return null
  } else {
    return (
      <div className="outermostContDiv">
        <div>
          <div className='restaurantIntroNavDiv'>
            <div className="restaurantIntroInnerDiv">
                <img src={restaurant?.imageUrl} alt='' className="singleImage"></img>
            </div>
            <div className="starsAndReviewsDiv">
              <h1 className="singleRestaurantName">
                {restaurant?.name}
              </h1>
              <div className="starsAndReviewsInnerDiv">
                <p className="singleRestaurantStarsStyling">
                  Stars: {restaurant?.stars}
                </p>
                <p className="reviewsCountStyling">
                  {restaurant?.review_count} reviews
                </p>
              </div>
              {/* <div className="singleRestaurantCategoryDiv"> */}
                The category: {restaurant?.categoryId}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className='reviewsHoursAboutDivCont'>
          <div className='reviewAndAddPhotoDiv'>
            <button className='writeAReviewBtn'><i className="far fa-star"></i> Write a Review</button>
            {/* <button>Add Photo</button> */}
            <div className="locationAndHoursDiv">
              <h3>Location & Hours</h3>
              {restaurant?.hours}
            </div>
          </div>
          <div className="aboutAndContactDiv">
            <div className="restaurantAboutDiv">
              <h3>
                About the Business
              </h3>
              {restaurant?.description}
            </div>
            <div className="restaurantContactDiv">
              <p>
                {restaurant?.websiteUrl}
              </p>
              <p>
                {restaurant?.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
      // import reviews component here

    )


  }

}

export default SingleRestaurantPage