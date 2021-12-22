import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getPageReviews } from "../../store/reviews";
import './PageReviews.css'

const GetAllReviews = ({restaurant}) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state?.reviews)
  // console.log('theReviews:', reviews)

  const sessionUser = useSelector((state) => state.session.user);

  const { id } = useParams()
  
  useEffect(() => {
    dispatch(getPageReviews(id))
  // }, [dispatch, reviews.length, id])
  }, [dispatch, id])

  
  

  return (
    <div>
      {reviews.map((review) => 
      <div>
        

      </div>
      
      
      )}
    </div>
    
  )
  


}

