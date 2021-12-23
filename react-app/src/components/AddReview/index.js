import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { addNewReview } from "../../store/reviews";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const AddNewReviewForm = ({hideReviewForm, hideRevBtn}) => {
  const sessionUser = useSelector((state) => state.session.user)
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const { id } = useParams();
  const user_id = sessionUser.id;


  useEffect(() => {
    const validationErrors = [];
    if (!rating) validationErrors.push("Please select a rating")
    if (rating < 1 || rating > 5) validationErrors.push("Rating must be between 1-5")
    if (!content) validationErrors.push("Please submit a review")

    setErrors(validationErrors)
  }, [rating, content, id, user_id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const theNewReview = {
      rating, content, id, user_id
    }

    const review = await dispatch(addNewReview(theNewReview, id))

    if (review) {
      hideReviewForm()
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    hideReviewForm();
    hideRevBtn();
  }

  const handleRatingSelect = async (e) => {
    const starRating = [1,2,3,4,5]
    for (let i = 0; i < starRating.length; i++) {
      if (e.key.value === starRating[i]) {
        setRating(starRating[i])
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <ul>
          <li key={1}>
            <span className='reviewStarSpanStyle' id='addRevStar1' key={1} onClick={e => handleRatingSelect(e.target.value)}>
              <i className="fas fa-star reviewStarStyle" ></i>
            </span>
          </li>
          <li key={2}>
            <span className='reviewStarSpanStyle' id='addRevStar2' key={2} onClick={e => handleRatingSelect(e.target.value)}>
              <i className="fas fa-star reviewStarStyle" ></i>
            </span>
          </li>
          <li key={3}>
            <span className='reviewStarSpanStyle' id='addRevStar3' key={3} onClick={e => handleRatingSelect(e.target.value)}>
              <i className="fas fa-star reviewStarStyle" ></i>
            </span>
          </li>
          <li key={4}>
            <span className='reviewStarSpanStyle' id='addRevStar4' key={4} onClick={e => handleRatingSelect(e.target.value)}>
              <i className="fas fa-star reviewStarStyle" ></i>
            </span>
          </li>
          <li key={5}>
            <span className='reviewStarSpanStyle' id='addRevStar5' key={5} onClick={e => handleRatingSelect(e.target.value)}>
              <i className="fas fa-star reviewStarStyle" ></i>
            </span>
          </li>
        </ul>
        <label>
          <input
            placeholder="Please write a review..."
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
          </input>
        </label>
        <div>
          <button type='button' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewReviewForm