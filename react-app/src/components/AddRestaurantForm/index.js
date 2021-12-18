import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { addNewRestaurant } from "../../store/restaurants";
import './addRestaurant.css'

const AddRestaurantForm = () => {
  const categoryElements = useSelector(state => state.category)


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [category, setCategory] = useState('');
  const [hours, setHours] = useState('');
  const [priceRating, setPriceRating] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCancel = () => {
    history.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      address,
      city,
      zipcode,
      category,
      hours,
      priceRating,
      phoneNumber,
      websiteUrl,
      imageUrl,
    }
  

    let theNewRestaurant = await dispatch(addNewRestaurant(data));
    console.log('this ~~~~~~~~~>', theNewRestaurant)
    if(theNewRestaurant) {
      history.push(`/restaurants/${theNewRestaurant}.id`);
    }
  }

  return (
    <div>
      <h1>Add your Goodeats Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            onChange={(e)=>setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            onChange={(e)=>setAddress(e.target.value)}
            value={address}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            onChange={(e)=>setCity(e.target.value)}
            value={city}
            required
          />
        </div>
        <div>
          <label>State</label>
          <input
            onChange={(e)=>setState(e.target.value)}
            value={state}
            required
          />
        </div>
          <label>Zip Code</label>
          <input
            onChange={(e)=>setZipcode(e.target.value)}
            value={zipcode}
            required
          />
        <div>
          <label>Category</label>
          <input
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
            required
          />
        </div>
        <div>
          <label>Hours</label>
          <input
            onChange={(e)=>setHours(e.target.value)}
            value={hours}
            required
          />
        </div>
        <div>
        <label>Price Rating</label>
        <input
            onChange={(e)=>setPriceRating(e.target.value)}
            value={priceRating}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            onChange={(e)=>setPhoneNumber(e.target.value)}
            value={phoneNumber}
            required
          />
        </div>
        <div>
          <label>Website Url</label>
          <input
            onChange={(e)=>setWebsiteUrl(e.target.value)}
            value={websiteUrl}
            required
          />
        </div>
        <div>
          <label>Image Url</label>
          <input
            onChange={(e)=>setImageUrl(e.target.value)}
            value={imageUrl}
            required
          />
        </div>
        <div className="button_div">
          <button className='submit_button' type='submit'>
              Submit
          </button>
          <button className='submit_button' type='submit' onClick={()=>{handleCancel()}}>
              Cancel
          </button>
        </div>

      </form>
      
    </div>
  )

}

export default AddRestaurantForm;