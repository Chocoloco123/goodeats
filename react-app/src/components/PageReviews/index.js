import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getPageReviews } from "../../store/reviews";
import './PageReviews.css'

const GetAllReviews = ({restaurant}) => {
  const dispatch = useDispatch();
  const review = useSelector((state) => state?.review)
  // console.log('theReviews:', reviews)

  const sessionUser = useSelector((state) => state.session.user);

  const { id } = useParams()
  
  useEffect(() => {
    dispatch(getPageReviews(id))
  // }, [dispatch, reviews.length, id])
  }, [dispatch, id])
  
  

  return (
    <div>
      {review.map((review) => 
      <div>
        {sessionUser.username}
        {review.created_at}
        {Array(review.rating).fill(
          <span><i className="fas fa-star fa-xs"></i></span>).map((el, idx) => 
            <span key={idx}>{el}</span>)}
        {review.content}
      </div>
      )}
    </div>
    
  )
  


}

