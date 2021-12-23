import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
// import { addNewReview } from '../../store/reviews';
import { getPageReviews } from '../../store/reviews'
import AddNewReviewForm from '../AddReview';
import GetAllReviews from '../PageReviews';
import './ReviewForm.css'

const DisplayReviewForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showRevForm, setShowRevForm] = useState(false);
  const [hideAddRevBtn, setHideAddRevBtn] = useState(false);

  // restaurant object
  const restaurant = useSelector((state) => state?.restaurant);
  const singleRestaurant = restaurant[id];
  // reviews object
  const reviews = useSelector((state) => state?.review);
  const reviewArr = Object.values(reviews);

  // const sessionUser = useSelector((state) => state?.user?.id);
  const sessionUser = useSelector((state) => state.session.user.id)
  console.log('this is newSessionUser: ', sessionUser)
  // hides add review button
  useEffect(() => {
    setHideAddRevBtn(false)
  }, [dispatch, reviewArr.length])

  // hides review form
  useEffect(() => {
    setShowRevForm(false)
  }, [dispatch, id])

  // useEffect(() => {
  //   dispatch(GetAllReviews(id))
  // }, [dispatch, id])

  useEffect(() => {
    dispatch(getPageReviews(id))
  }, [dispatch, reviews.length, id])

  if (!reviewArr) return null;

  let createRevBtn = null;

  if (sessionUser) {
    createRevBtn = (
      !hideAddRevBtn &&
        <button className='WriteAReviewBtn' onClick={()=> {setShowRevForm(true)}}>
          <i className="far fa-star"></i>
          Write A Review
        </button>
    )
  } 
  // else {
  //   return <GetAllReviews restaurant={singleRestaurant}/>
  // }

  let revContent = null;

  if (showRevForm && reviewArr) {
    revContent = (
      <div>
        <AddNewReviewForm reviews={reviewArr} hideReviewForm={() => setShowRevForm(false)} hideRevBtn={() => setHideAddRevBtn(false)}/>
      </div>
    )
  }

  return (
    <div>
      {createRevBtn}
      <div>
        {revContent}
        <GetAllReviews restaurant={singleRestaurant}/>
      </div>
    </div>
  )
}

export default DisplayReviewForm