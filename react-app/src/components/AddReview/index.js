import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { addNewReview } from "../../store/reviews";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const AddNewReviewForm = ({hideReviewForm, hideRevBtn}) => {
  const sessionUser = useSelector((state) => state.session.user)
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const { id } = useParams();
  const userId = sessionUser.id;
  const restaurantId = id

  useEffect(() => {
    const validationErrors = [];
    if (!rating || rating === '') validationErrors.push("Please select a rating")
    if (rating < 1 || rating > 5) validationErrors.push("Rating must be between 1-5")
    if (!content || content.length < 2) validationErrors.push("Please submit a review with at least 2 characters.")

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


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label>
          <select required onChange={(e) => setRating(e.target.value)}>
            {/* <option value='empty'></option> */}
            <option defaultValue='1'>1</option>
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

export default AddNewReviewForm