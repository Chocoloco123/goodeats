import './ReviewOptionsButton.css'
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { editAReview, deleteOneReview } from '../../store/reviews';

const ReviewOptionsButton = ({ reviewId }) => {
  const dispatch = useDispatch()
  const pageReviews = useSelector((state) => state?.review)
  console.log('this is page reviews: ', pageReviews)
  const [showOptions, setShowOptions] = useState(false);

  const openOptions = () => {
    if (showOptions) return;
    setShowOptions(true);
  }

  useEffect(() => {
    if (!showOptions) return;

    const closeOptions = () => {
      setShowOptions(false)
    }

    document.addEventListener('click', closeOptions);

    return () => document.removeEventListener("click", closeOptions);
  }, [showOptions])

  const handleReviewDelete = (reviewId) => {
    dispatch(deleteOneReview(reviewId));
  }

  return (
    <div>
      <button onClick={openOptions}>
        <div>
          <i className="fas fa-ellipsis-h "></i>
        </div>
      </button>
      {showOptions && (
        <div>
          <div>
            <NavLink to={`/reviews/${reviewId}/edit`}><div></div><i className="fas fa-edit"></i></NavLink>
          </div>
          <div>
            <button onClick={() => {handleReviewDelete(pageReviews?.id)}}><i className="fas fa-trash "></i></button>
          </div>
        </div>
      )}
    </div>
  )
}


// {sessionUser && sessionUser?.id === singleRest?.ownerId &&
//   <NavLink to={`/restaurants/${id}/edit`}>Update</NavLink>
// }
{/* <button onClick={() => handleReviewDelete(pageReviews?.id)}>Delete Review</button>
 */}

export default ReviewOptionsButton;