import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { editAReview, getPageReviews } from "../../store/reviews";
import { getOneRestaurant } from "../../store/restaurants"
import { useHistory } from 'react-router';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './EditReviewForm.css'

const EditReviewForm = () => {
  const sessionUser = useSelector((state) => state.session.user)


  // * reviewId
  const { reviewId } = useParams()
  // This gives us the restaurant ID from the review's slice of state
  const review = useSelector((state) => state?.review[reviewId] ? state?.review[reviewId] : '') 
  const restaurantId = review?.restaurantId; 
  
  const dispatch = useDispatch();

  // This gives us the restaurant's ID from the restaurant slice of state
  const restaurant = useSelector((state) => state?.restaurant)
  const theRestaurantId = Object.values(restaurant)[0]?.id


  const { id } = useParams();
  const history = useHistory();
  const userId = sessionUser.id;
  
  const [rating, setRating] = useState(review?.rating ? review?.rating : '');
  // console.log(rating)
  const [content, setContent] = useState(review?.content ? review?.content : '');
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   const editFormRating = window.localStorage.getItem("rating")
  //   setRating(JSON.parse(editFormRating))
  //   const editFormContent = window.localStorage.getItem("content")
  //   setContent(JSON.parse(editFormContent))
  // }, [])

  // useEffect(() => {
  //   window.localStorage.setItem("rating", JSON.stringify(rating));
  //   window.localStorage.setItem("content", JSON.stringify(content));
  // })
  
    useEffect(() => {
    dispatch(getOneRestaurant(id))
  }, [dispatch, id])

  useEffect(() => {
    // theRestaurantId is from the restaurant's slice of state
    dispatch(getPageReviews(theRestaurantId))
    setRating(review?.rating)
    setContent(review?.content)
  }, [dispatch, theRestaurantId, review?.rating, review?.content])
  
  // useEffect(() => {
  //   dispatch(getOneReview(reviewId))
  // }, [dispatch, reviewId])



  useEffect(() => {
    const validationErrors = [];
    if (!rating || rating === '') validationErrors.push("Please select a rating")
    if (rating < 1 || rating > 5) validationErrors.push("Rating must be between 1-5")
    if (!content || content.length < 2 || content.trim() === '') validationErrors.push("Please submit a review with at least 2 characters")
    if (content?.length > 250) validationErrors.push("Character limit reached. Comment exceeds 250 character limit")

    setErrors(validationErrors)
  }, [rating, content, reviewId, userId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const theEditedReview = {
      userId,
      restaurantId,
      rating,
      content
    }

    const updateReview = await dispatch(editAReview(theEditedReview, reviewId));

    if (updateReview) {
      history.push(`/restaurants/${restaurantId}`)
    }
    
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/restaurants/${restaurantId}`)
  }


  return (
    <div className="updateReview-Div">
      <form onSubmit={handleSubmit} className="addReviewForm">
        <h2 className="updateReviewTitle">Edit Review</h2>
        <ul className="errorHandling">
          {errors.map((error) => <li key={error} className='errorHandling'><i className="fas fa-exclamation errorExclamation"></i>{error}</li>)}
        </ul>
        <div className="ratingContDiv">
          <label className="label-AddReview"> Rating </label>
          <select required value={rating} className="ratingSelect" onChange={(e) => setRating(e.target.value)}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <label className="label-AddReview">Review</label>
          <textarea
            className="review-textarea"
            placeholder="Please write a review..."
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          >
          </textarea>
        </div>
        <div className="submitNCancel-Rev-Div">
          <div>
            <button disabled={errors.length} type='submit' className="WriteAReviewBtn-Submit">Submit</button>
          </div>
          <div>
            <button type='button' className="cancelBtn-Review" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditReviewForm