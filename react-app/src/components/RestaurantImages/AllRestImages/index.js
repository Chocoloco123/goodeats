import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getRestImages } from "../../../store/images";
import { mainRestaurants } from '../../../store/restaurants';

import './AllRestImages.css';

const AllRestImages = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams()
  const images = useSelector((state) => state?.image);
  const restaurants = useSelector((state) => state?.restaurant);
  const theRestaurantObj = restaurants[restaurantId];
  const restaurantName = restaurants[restaurantId]?.name;
  const imagesArr = Object.values(images);

  useEffect(() => {
    dispatch(mainRestaurants())
  }, [dispatch])

  useEffect(() => {
    dispatch(getRestImages(restaurantId))
  }, [dispatch, restaurantId])

  return (
    <div className='imagesMain-Div'>
      <h1 className='imagesTitle'>Photos for {restaurantName}</h1>
      <div>
        <div className='backToRestaurant-imagesPage-Div'>
          <NavLink to={`/restaurants/${restaurantId}`} className=''>
            <img src={theRestaurantObj?.imageUrl} alt='restaurant photos' className='smallRestImageCard'></img>
          </NavLink>
          <NavLink to={`/restaurants/${restaurantId}`} className='toRestaurant-NavLink'>{restaurantName}</NavLink>
        </div>
        <div className='AddPhotos-NavLink-Div'>
          <NavLink to={`/images/${restaurantId}/newImage`} className="addPhotoNavLink"><i className="fas fa-camera" addPhotoCamera></i><span className="addPhotoBtnTxt">Add Photos</span></NavLink>
        </div>
      </div>
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