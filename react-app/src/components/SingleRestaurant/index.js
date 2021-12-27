import { useParams, NavLink, } from "react-router-dom";
import { useHistory  } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneRestaurant, deleteOneRestaurant } from "../../store/restaurants";
// import PageReviews from '../PageReviews'
import ReviewForm from '../ReviewForm'
import './SingleRestaurant.css'


const SingleRestaurantPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams()
  const restaurant = useSelector((state) => state?.restaurant)
  const restaurantArr = Object.values(restaurant)[0]
  const reviews = useSelector((state) => state?.review)
  const reviewsArr = Object.values(reviews)
  console.log('the reviews: ',reviewsArr)

  
  const restaurantAll = useSelector((state) => state?.restaurant)
  const singleRest = restaurantAll[id]


  const history = useHistory()
  
  const dispatch = useDispatch();

  let overallRating = 0;
  let sumRating = 0;
  let numReviews = reviewsArr.length;

  // if (reviewsArr.length) {
  reviewsArr.map((revObj) =>
    sumRating += revObj.rating,
  )
  overallRating = Math.round(sumRating / reviewsArr.length)
  // }
  console.log(numReviews)

  const handleDelete = async(id) => {
    await dispatch(deleteOneRestaurant(id));
    history.push('/')
  }
  
  useEffect(() => {
    dispatch(getOneRestaurant(id))
  }, [dispatch, id])
  
  if (!restaurantArr) {
    return null
  } else {
    return (
      <div className="outermostContDiv">
        <div>
          <div className='restaurantIntroNavDiv'>
            <div className="restaurantIntroInnerDiv">
                {/* <img src={restaurantArr?.imageUrl} alt='' className="singleImage"></img> */}
                <img src={singleRest?.imageUrl} alt='' className="singleImage"></img>
            </div>
            <div className="starsAndReviewsDiv">
              {/* <h1 className="singleRestaurantName">
                {restaurantArr?.name}
              </h1> */}
              <h1 className="singleRestaurantName">
                {singleRest?.name}
              </h1>
              <div className="starsAndReviewsInnerDiv">
                <p className="singleRestaurantStarsStyling">
                  {/* Stars: {restaurantArr?.stars} */}
                  {/* Stars: {singleRest?.stars} */}
                  {/* Stars: {overallRating} */}
                  {overallRating ?
                    Array(overallRating)?.fill(
                    <span className='reviewStarSpanStyle'><i className="fas fa-star reviewStarStyle"></i></span>)?.map((el, idx) => <span key={`${idx}-inner`}>{el}</span>) : null
                  }
                </p>
                <p className="reviewsCountStyling">
                  {/* {restaurantArr?.review_count}  */}
                  {/* {singleRest?.review_count} reviews */}
                  {numReviews === 1 ? numReviews + ' review' : numReviews + ' reviews'}
                </p>
              </div>
              {/* <div className="singleRestaurantCategoryDiv"> */}
                {/* The category: {restaurantArr?.categoryId} */}
                The category: {singleRest?.categoryId}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className='reviewsHoursAboutDivCont'>
          <div className='reviewAndAddPhotoDiv'>
            <div>
              {sessionUser && sessionUser?.id === singleRest?.ownerId &&
                <NavLink to={`/restaurants/${id}/edit`}>Update</NavLink>
              }
            </div>
            {/* <button onClick={() => handleDelete(restaurantArr?.id)}>Delete Restaurant</button> */}
            {
              sessionUser && sessionUser?.id === singleRest?.ownerId &&
                <button onClick={() => handleDelete(singleRest?.id)}>Delete Restaurant</button>
            }
            <div className="locationAndHoursDiv">
              <h3>Location & Hours</h3>
              {/* {restaurantArr?.hours} */}
              {singleRest?.hours}
            </div>
          </div>
          <div className="aboutAndContactDiv">
            <div className="restaurantAboutDiv">
              <h3>
                About the Business
              </h3>
              {/* {restaurantArr?.description} */}
              {singleRest?.description}
            </div>
            <div className="restaurantContactDiv">
              <p>
                {/* {restaurantArr?.websiteUrl} */}
                {singleRest?.websiteUrl}
              </p>
              <p>
                {/* {restaurantArr?.phoneNumber} */}
                {singleRest?.phoneNumber}
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* <PageReviews /> */}
          <ReviewForm />
        </div>
      </div>
      // import reviews component here

    )
  }
}

export default SingleRestaurantPage