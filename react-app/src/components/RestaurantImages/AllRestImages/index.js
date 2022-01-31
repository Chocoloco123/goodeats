import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory  } from "react-router"
import { NavLink, useParams } from 'react-router-dom';
import { deleteImage, getRestImages } from "../../../store/images";
import { mainRestaurants } from '../../../store/restaurants';
import goodeatsWhiteLogo from '../../../media/goodeats_transparent_white-thin.png'

import './AllRestImages.css';

const AllRestImages = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { restaurantId } = useParams()
  const images = useSelector((state) => state?.image);
  const sessionUser = useSelector((state) => state.session.user);
  const restaurants = useSelector((state) => state?.restaurant);
  const theRestaurantObj = restaurants[restaurantId];
  const restaurantName = restaurants[restaurantId]?.name;
  const imagesArr = Object.values(images);

  const handleDelete = async(imageId) => {
    await dispatch(deleteImage(imageId));
    history.push(`/images/${restaurantId}`)
  }

  const validImageUrl = theUrl => {
    try { 
      return Boolean(new URL(theUrl)); 
    } catch(e) { 
      return false; 
    }
  }

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
        {sessionUser ? 
          <div className='AddPhotos-NavLink-Div'>
            <NavLink to={`/images/${restaurantId}/newImage`} className="addPhotoNavLink"><i className="fas fa-camera addPhotoCamera"></i><span className="addPhotoBtnTxt">Add Photos</span></NavLink>
          </div>
        : null
        }
      </div>
      <div className='imagesCont-Div'>
        <img src={theRestaurantObj?.imageUrl} alt='restaurant photos' className='restImgsCard singleRestImgCard'></img>
        {imagesArr.length ?
        imagesArr.map((imgObj) =>
        <div className="imageCont-Card-Div" key={imgObj?.id + 'div'}> 
          {sessionUser?.id === imgObj?.userId ?
            <button onClick={() => handleDelete(imgObj?.id)} className='imageDelete-Btn'><i className="far fa-trash-alt"></i></button> : null
          }
          { validImageUrl(imgObj?.imageUrl) ?
              sessionUser?.id === imgObj?.userId ?
                <img src={imgObj.imageUrl} alt="restaurant photos" className='restImgsCard onlySessionUserImage' key={imgObj?.id}></img> :
                <img src={imgObj.imageUrl} alt="restaurant photos" className='nonImageUserPlain' key={imgObj?.id}></img>
            : 
              sessionUser?.id === imgObj?.userId ?
                <img src={goodeatsWhiteLogo} alt='' className="  notFoundImage-ImagesPage onlySessionUserImage"></img> : 
                <img src={goodeatsWhiteLogo} alt='' className="  notFoundImage-ImagesPage"></img>
          }
        </div>
        ) 
        : null}
      </div>
    </div>
  )
}

export default AllRestImages;