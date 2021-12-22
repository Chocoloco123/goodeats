import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getPageReviews } from "../../store/reviews";
import './PageReviews.css'

const GetAllReviews = ({restaurant}) => {
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
  // }, [dispatch, reviews.length, id])
  }, [dispatch, id])
  // ! this might need revision
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
  

  return (
    <div>
      {reviews.map((review) => 
      <div key={review.id}>
        {reviewUsers(review.userId)}
        {review.created_at}
        {Array(review.rating).fill(
          <span className='reviewStarSpanStyle'><i className="fas fa-star reviewStarStyle"></i></span>).map((el, idx) => 
            <span key={idx}>{el}</span>)}
        {review.content}
      </div>
      )}
    </div>
    
  )
  


}

export default GetAllReviews