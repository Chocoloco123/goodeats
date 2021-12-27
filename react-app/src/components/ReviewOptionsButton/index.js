import './ReviewOptionsButton.css'
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { deleteOneReview } from '../../store/reviews';


const ReviewOptionsButton = ({ reviewId }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const pageReviews = useSelector((state) => state?.review)
  // console.log(reviewId)
  // console.log(pageReviews[reviewId])
  // console.log('this is page reviews: ', pageReviews)
  const pageReviewsArr = Object.values(pageReviews);

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


  if (!pageReviewsArr) return null;


  return (
    <div>
      <button onClick={openOptions} className='optionsIconButton-review'>
        <div>
          <i className="fas fa-ellipsis-h optionsIcon"></i>
        </div>
      </button>
      {showOptions && (
        <div>
          <div>
            <NavLink to={`/restaurants/${id}/reviews/${reviewId}/edit`}><div></div><i className="fas fa-edit editReview-icon"></i></NavLink>
          </div>
          <div>
            <button className="deleteRevIcon-review" onClick={() => {handleReviewDelete(reviewId)}}><i className="fas fa-trash trashIcon-review"></i></button>
          </div>
        </div>
      )}
    </div>
  )
}


export default ReviewOptionsButton;