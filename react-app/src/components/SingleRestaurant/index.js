import { useParams, NavLink, } from "react-router-dom";
import { useHistory  } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneRestaurant, deleteOneRestaurant } from "../../store/restaurants";
import './SingleRestaurant.css'

const SingleRestaurantPage = () => {
  const { id } = useParams()
  const restaurant = useSelector((state) => state?.restaurant)
  const restaurantArr = Object.values(restaurant)[0]
  // const restaurantId = restaurant.id
  // const restaurant = useSelector((state) => state?.restaurant[id] ? state?.restaurant[id] : "")
  console.log('XOXOXOXOXO ==========> ', restaurantArr)
  const history = useHistory()
  
  const dispatch = useDispatch();
  console.log('single page restaurant: ', restaurant)

  const handleDelete = async(id) => {
    await dispatch(deleteOneRestaurant(id));
    history.push('/')
  }

  useEffect(() => {
    dispatch(getOneRestaurant(id))
    // dispatch(getOneRestaurant(restaurantId))
    console.log('!!!!!!!!!!!!!!!!!!!')
  }, [dispatch, id])
  console.log('hereeeeeeeeeee')
  console.log('after: ', restaurant)
  if (!restaurantArr) {
    return null
  } else {
    return (
      <div className="outermostContDiv">
        <div>
          <div className='restaurantIntroNavDiv'>
            <div className="restaurantIntroInnerDiv">
                <img src={restaurantArr?.imageUrl} alt='' className="singleImage"></img>
            </div>
            <div className="starsAndReviewsDiv">
              <h1 className="singleRestaurantName">
                {restaurantArr?.name}
              </h1>
              <div className="starsAndReviewsInnerDiv">
                <p className="singleRestaurantStarsStyling">
                  Stars: {restaurantArr?.stars}
                </p>
                <p className="reviewsCountStyling">
                  {restaurantArr?.review_count} reviews
                </p>
              </div>
              {/* <div className="singleRestaurantCategoryDiv"> */}
                The category: {restaurantArr?.categoryId}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className='reviewsHoursAboutDivCont'>
          <div className='reviewAndAddPhotoDiv'>
            <button className='writeAReviewBtn'><i className="far fa-star"></i> Write a Review</button>
            {/* <button>Add Photo</button> */}
            <button onClick={() => handleDelete(restaurantArr?.id)}>Delete Restaurant</button>
            <div className="locationAndHoursDiv">
              <h3>Location & Hours</h3>
              {restaurantArr?.hours}
            </div>
          </div>
          <div className="aboutAndContactDiv">
            <div className="restaurantAboutDiv">
              <h3>
                About the Business
              </h3>
              {restaurantArr?.description}
            </div>
            <div className="restaurantContactDiv">
              <p>
                {restaurantArr?.websiteUrl}
              </p>
              <p>
                {restaurantArr?.phoneNumber}
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