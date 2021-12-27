import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getPageReviews } from "../../store/reviews";
import ReviewOptionsButton from '../ReviewOptionsButton';
import './PageReviews.css'

const GetAllReviews = ({restaurant}) => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const review = useSelector((state) => state?.review)
  // console.log('this is review: ',review)
  const reviews = Object.values(review)
  // console.log('theReviews:', reviews)

  const sessionUser = useSelector((state) => state.session.user);
  const [users, setUsers] = useState([])

  const { id } = useParams()

  
  useEffect(() => {
    if (sessionUser) {
      async function getUsers (){
        const res = await fetch('/api/users/');
        const resUsers = await res.json();
        setUsers(resUsers.users)
      }
      getUsers();
    }
  }, []) 
  
  useEffect(() => {
    dispatch(getPageReviews(id))
  }, [dispatch, reviews.length, id])

  
  const reviewUsers = (userId) => {
    const showUsername = users?.filter((user) => {
      return user.id === userId
    });

    if (showUsername) {
      return showUsername[0]?.username
    } else {
      return null
    }
  }

  // const handleReviewDelete = (reviewId) => {
  //   dispatch(deleteOneReview(reviewId));
  //   // history.push(`/restaurants/${id}`)
  // }
  

  return (
    <div className='allReviews_Div'>
      <h3 className="reviewsTitle">Reviews</h3>
      {reviews?.map((review) => 
        <div key={`${review?.id}-outer`} className='indRev-divCont'>
          <span className='userIconOuterDefault'><i className="fas fa-user userIconDefault"></i></span>
          {/* username */}
          <span>
            {sessionUser ? reviewUsers(review?.userId) : null}
          {/* {review?.userId} */}
          </span>
          {/* created at date */}
          <div className='reviewSubmitTime'>
            {review?.created_at}
          </div>
          <div className='eachStar-Div'>{Array(review?.rating)?.fill(
            // star rating
              <span className='reviewStarSpanStyle'>
                <i className="fas fa-star reviewStarStyle"></i>
              </span>
            )?.map((el, idx) => 
              // review content span
              <span key={`${idx}-inner`}>{el}</span>)}</div>
          {/* review content */}
          {review?.content}
          {/* review options button */}
          {sessionUser && sessionUser?.id === review?.userId &&
          <ReviewOptionsButton reviewId={review?.id} />
          }
        </div>
      )}
    </div>
    
  )
  


}

export default GetAllReviews