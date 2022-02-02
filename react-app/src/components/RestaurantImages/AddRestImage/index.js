import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { addAnImage } from '../../../store/images';
import './AddRestImage.css'

const AddImage = () => {
  const history = useHistory();
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const userId = sessionUser?.id;
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);
  // const [restaurantId, setRestaurantId] = useState('');
  

  useEffect(() => {
    const validationErrors = [];
    if (!imageUrl || (!imageUrl.endsWith('jpg') && !imageUrl.endsWith('jpeg') && !imageUrl.endsWith('png')) || imageUrl.trim() === '') validationErrors.push('Please submit a valid link to an image with the following formats: jpg, jpeg, or png')

    setErrors(validationErrors);
  }, [imageUrl, restaurantId, userId])


  const handleSubmit = async(e) => {
    e.preventDefault();

    const newImage = {
      imageUrl,
      restaurantId,
      userId
    }

    if (!errors.length) {
      const image = await dispatch(addAnImage(newImage, restaurantId))

      if (image) {
        history.push(`/images/${restaurantId}`)
      }
    }
  }

  const handleCancel = () => {
    history.push(`/images/${restaurantId}`)
  }

  return (
    <div className='addImageForm-Div-Cont'>
      <form onSubmit={handleSubmit} className="addRest-Form-Div addImageForm-Div">
        <h2 className="addRestTitle-AddForm addGoodeatsRest-Title AddImageTitle">Add Image</h2>
        <ul className="errorHandling">
            {errors.map((error) => <li key={error} className='errorHandling errorsLi-AddRest'><i className="fas fa-exclamation errorExclamation"></i>{error}</li>)}
          </ul>
        <input 
          onChange={(e)=> setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder='Image Url'
          required
          className='imageUrlInput-images'
        />
        <button disabled={errors.length}className='submit_button WriteAReviewBtn-Submit' type='submit'>Submit</button>
        <button className='submit_button cancelBtn-Review' type='button' onClick={()=>{handleCancel()}}>Cancel</button>
      </form>
    </div>
  )
}

export default AddImage;