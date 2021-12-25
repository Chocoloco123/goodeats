import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { editAReview, getPageReviews } from "../../store/reviews";
import { useHistory } from 'react-router';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const NestedEditForm = () => {
  const sessionUser = useSelector((state) => state.session.user)
  // * reviewId
  const { reviewId } = useParams()
  const testReviews = useSelector((state) => state?.review)
  console.log('testReviews: ',testReviews)
  const review = useSelector((state) => state?.review[reviewId] ? state?.review[reviewId] : '') 
  console.log(review)
  const dispatch = useDispatch();

  const restaurantId = review?.restaurantId; 
  const { id } = useParams();
  const history = useHistory();
  const userId = sessionUser.id;
  
  const [rating, setRating] = useState(review?.rating ? review?.rating : '');
  console.log(rating)
  const [content, setContent] = useState(review?.content ? review?.content : '');
  const [errors, setErrors] = useState([]);

  

  useEffect(() => {
    dispatch(getPageReviews(restaurantId))
  }, [dispatch, restaurantId])

  useEffect(() => {
    const validationErrors = [];
    if (!rating || rating === '') validationErrors.push("Please select a rating")
    if (rating < 1 || rating > 5) validationErrors.push("Rating must be between 1-5")
    if (!content || content.length < 2) validationErrors.push("Please submit a review with at least 2 characters.")

    setErrors(validationErrors)
  }, [rating, content, id, userId])

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
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        {}
        <label>
          <select required value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </label>
        <label>
          <textarea
            placeholder="Please write a review..."
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            // required
          >
          </textarea>
        </label>
        <div>
          <button disabled={errors.length} type='submit'>Submit</button>
        </div>
        <div>
          <button type='button' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default NestedEditForm