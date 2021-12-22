import { useState, useEffect } from "react";
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
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCancel = () => {
    history.push('/')
  }


  useEffect(() => {
    const validationErrors = [];
    if (name.length < 3 || !name) validationErrors.push("A name is required")
    if (description.length < 3 || !description) validationErrors.push("A description is required")
    if (address.length < 2 || !address) validationErrors.push("An address is required")
    if (state !== state.toUpperCase()) validationErrors.push("Case sensitive, please submit city in upper case")
    // if (!city.length) validationErrors.push('Please submit a city')
    if (!city.length || city.length < 3) validationErrors.push('Please submit a city')
    if ((state.length <= 1 && state.length >= 1)  || !state || state.length !== 2) validationErrors.push("A state is required. Please submit a valid two-letter state abbreviation")
    if (zipcode.length < 5 || zipcode.length > 5 || !zipcode) validationErrors.push("A zipcode is required. Please submit a valid 5 digit zip code")
    // if (category.length < 2 || !category) validationErrors.push("An category is required")
    if (hours.length < 2 || !hours) validationErrors.push("Please submit operating hours for your restaurant")
    if (!priceRating) validationErrors.push("Please select a price rating for your restaurant")
    if (phoneNumber.length > 15 || !phoneNumber) validationErrors.push('Please submit a valid phone number')
    if (!websiteUrl) validationErrors.push("Please submit a valid website")
    // if (!imageUrl) validationErrors.push('Please submit an image url')
    if (!imageUrl || (!imageUrl.endsWith('jpg') && !imageUrl.endsWith('jpeg') && !imageUrl.endsWith('png'))) validationErrors.push('Please submit a valid link to an image with the following formats: jpg, jpeg, or png')

    setErrors(validationErrors)
  }, [name, description, address, city, state, zipcode, category, hours, priceRating, phoneNumber, websiteUrl, imageUrl])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      address,
      city,
      state,
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
      history.push(`/restaurants/${theNewRestaurant.id}`);
    }
  }

  return (
    <div>
      <h1>Add your Goodeats Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <ul>
              {errors.map((error, idx) => <li key={idx} >{error}</li>)}
            </ul>
          </div>
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