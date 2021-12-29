import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { addNewReview } from "../../store/reviews";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './AddReview.css'

const AddNewReviewForm = ({hideReviewForm, hideRevBtn}) => {
  const sessionUser = useSelector((state) => state.session.user)
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const { id } = useParams();
  const userId = sessionUser?.id;
  const restaurantId = id

  useEffect(() => {
    const validationErrors = [];
    if (!rating || rating === '') validationErrors.push("Please select a rating")
    if (rating < 1 || rating > 5) validationErrors.push("Rating must be between 1-5")
    if (!content || content.length < 2 || content.trim() === '') validationErrors.push("Please submit a review with at least 2 characters")
    // if (content.trim() === '') validationErrors.push("Please submit review with at least 2 characters!")

    setErrors(validationErrors)
  }, [rating, content, restaurantId, userId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const theNewReview = {
      userId,
      restaurantId,
      rating,
      content
    }

    const review = await dispatch(addNewReview(theNewReview, restaurantId))

    if (review) {
      hideReviewForm()
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    hideReviewForm();
    hideRevBtn();
  }

  if (!sessionUser) {
    hideReviewForm();
    hideRevBtn();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="addReviewForm">
        <ul className="errorHandling">
          {errors.map((error) => <li key={error} className='errorHandling'><i className="fas fa-exclamation errorExclamation"></i>{error}</li>)}
        </ul>
        <div className="ratingContDiv">
          <label className="label-AddReview"> Rating </label>
          <select required className="ratingSelect" onChange={(e) => setRating(e.target.value)}>
            {/* <option value='empty'></option> */}
            <option defaultValue='1'>1</option>
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

export default AddNewReviewForm