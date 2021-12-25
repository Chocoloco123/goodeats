import './ReviewOptionsButton.css'
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { editAReview, deleteOneReview } from '../../store/reviews';
import NestedEditForm from '../NestedEditForm';

const ReviewOptionsButton = ({ reviewId }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const pageReviews = useSelector((state) => state?.review)
  console.log(reviewId)
  console.log(pageReviews[reviewId])
  console.log('this is page reviews: ', pageReviews)
  const pageReviewsArr = Object.values(pageReviews);
  // console.log(pageReviewsArr)
  const [showOptions, setShowOptions] = useState(false);
  const [showEditRevForm, setShowEditRevForm] = useState(true);
  const [hideEditRevBtn, setHideEditRevBtn] = useState(false);

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

  useEffect(() => {
    setHideEditRevBtn(false)
  }, [dispatch, pageReviewsArr.length])

  useEffect(() => {
    setShowEditRevForm(true)
  }, [dispatch, id])

  if (!pageReviewsArr) return null;

  let editContent = null;

  if (showEditRevForm && pageReviewsArr) {
    editContent = (
      <div>
        <button className="editRev-options"><i className="fas fa-edit">
          <NestedEditForm reviews={pageReviewsArr} hideEditForm={() => setShowEditRevForm(false)} hideEditBtn={() => setHideEditRevBtn(false)}/>
        </i>

        </button>
      </div>
    )
  }
  // const editRevBtn = null;

  // if (sessionUser) {
  //   editRevBtn = (
  //     !hideEditRevBtn && 
  //     <button></button>
  //   )
  // }

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
            {/* <NavLink to={`/reviews/${reviewId}/edit`}><div></div><i className="fas fa-edit"></i></NavLink> */}
            {editContent}
          </div>
          <div>
            <button onClick={() => {handleReviewDelete(reviewId)}}><i className="fas fa-trash "></i></button>
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