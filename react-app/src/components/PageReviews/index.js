import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { deleteOneReview, getPageReviews } from "../../store/reviews";
import './PageReviews.css'

const GetAllReviews = ({restaurant}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const review = useSelector((state) => state?.review)
  const reviews = Object.values(review)
  // console.log('theReviews:', reviews)

  const sessionUser = useSelector((state) => state.session.user);
  const [users, setUsers] = useState([])

  const { id } = useParams()

  useEffect(() => {
    async function getUsers (){
      const res = await fetch('/api/users/');
      const resUsers = await res.json();
      setUsers(resUsers.users)
    }
    getUsers();
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

  const handleReviewDelete = (reviewId) => {
    dispatch(deleteOneReview(reviewId, id));
    // history.push(`/restaurants/${id}`)
  }
  

  return (
    <div>
      {reviews?.map((review) => 
      
      <div key={`${review?.id}-outer`}>
        {reviewUsers(review?.userId)}
        {review?.created_at}
        {Array(review?.rating)?.fill(
          <span className='reviewStarSpanStyle'>
            <i className="fas fa-star reviewStarStyle"></i>
          </span>)?.map((el, idx) => 
            <span key={`${idx}-inner`}>{el}</span>)}
        {review?.content}
        {sessionUser && sessionUser?.id === review?.userId &&
        <button onClick={() => handleReviewDelete(review?.id)}>Delete Review</button>
        }
      </div>
      )}
    </div>
    
  )
  


}

export default GetAllReviews