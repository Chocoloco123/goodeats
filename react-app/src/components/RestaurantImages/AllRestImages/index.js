import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getRestImages } from "../../../store/images";
import { getOneRestaurant, mainRestaurants } from '../../../store/restaurants';

import './AllRestImages.css';

const AllRestImages = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams()
  const images = useSelector((state) => state?.image);
  const restaurants = useSelector((state) => state?.restaurant);
  console.log(restaurants[restaurantId]);
  const theRestaurantObj = restaurants[restaurantId];
  console.log(theRestaurantObj)
  const restaurantName = restaurants[restaurantId]?.name;
  const imagesArr = Object.values(images);
  console.log(imagesArr);

  

  useEffect(() => {
    dispatch(mainRestaurants())
  }, [dispatch])

  useEffect(() => {
    dispatch(getRestImages(restaurantId))
  }, [dispatch, restaurantId])

  return (
    <div className='imagesMain-Div'>
      <h2 className='imagesTitle'>Photos for {restaurantName}</h2>
      <div className='imagesCont-Div'>
        <img src={theRestaurantObj?.imageUrl} alt='restaurant photos' className='restImgsCard'></img>
        {imagesArr.length ?
        imagesArr.map((imgObj) => 
          <img src={imgObj.imageUrl} alt="restaurant photos" className='restImgsCard' key={imgObj?.id}></img>
        ) : null}
      </div>
    </div>
  )
}

export default AllRestImages;