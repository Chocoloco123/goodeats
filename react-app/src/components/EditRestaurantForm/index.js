import './editRestaurantForm.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import { getOneRestaurant, updateOneRestaurant } from "../../store/restaurants";

const EditRestaurantForm = () => {
  const categoryElements = useSelector(state => state.category)

  const params = useParams();
  const { id } = params;
  const restaurant = useSelector((state) => state?.restaurant[id] ? state?.restaurant[id] : '')


  const [name, setName] = useState(restaurant?.name ? restaurant?.name : '');
  const [description, setDescription] = useState(restaurant?.description ? restaurant?.description : '');
  const [address, setAddress] = useState(restaurant?.address ? restaurant?.address : '');
  const [city, setCity] = useState(restaurant?.city ? restaurant?.city : '');
  const [state, setState] = useState(restaurant?.state ? restaurant?.state : '');
  const [zipcode, setZipcode] = useState(restaurant?.zipcode ? restaurant?.zipcode : '');
  const [category, setCategory] = useState(restaurant?.category ? restaurant?.category : '');
  const [hours, setHours] = useState(restaurant?.hours ? restaurant?.hours : '');
  const [priceRating, setPriceRating] = useState(restaurant?.priceRating ? restaurant?.priceRating : '');
  const [phoneNumber, setPhoneNumber] = useState(restaurant?.phoneNumber ? restaurant?.phoneNumber : '');
  const [websiteUrl, setWebsiteUrl] = useState(restaurant?.websiteUrl ? restaurant?.websiteUrl : '');
  const [imageUrl, setImageUrl] = useState(restaurant?.imageUrl ? restaurant?.imageUrl : '');
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOneRestaurant(id))
  }, [dispatch, id])

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name)
      setDescription(restaurant.description)
      setAddress(restaurant.address)
      setCity(restaurant.city)
      setState(restaurant.state)
      setZipcode(restaurant.zipcode)
      setCategory(restaurant.categoryId)
      setHours(restaurant.hours)
      setPriceRating(restaurant.priceRating)
      setPhoneNumber(restaurant.phoneNumber)
      setWebsiteUrl(restaurant.websiteUrl)
      setImageUrl(restaurant.imageUrl)
    }
  }, [dispatch, restaurant])

  useEffect(() => {
    const validationErrors = [];
    if (name.length < 3 || !name) validationErrors.push("A name is required")
    if (description.length < 3 || !description) validationErrors.push("A description is required")
    if (address.length < 2 || !address) validationErrors.push("An address is required")
    if (city.length !== 2 || !city) validationErrors.push("A city is required. Please submit a valid two-letter state abbreviation")
    if (city !== city.toUpperCase()) validationErrors.push("Case sensitive, please submit city in upper case")
    if (zipcode.length < 5 || zipcode.length > 5 || !zipcode) validationErrors.push("A zipcode is required. Please submit a valid 5 digit zip code")
    // if (category.length < 2 || !category) validationErrors.push("An category is required")
    if (hours.length < 2 || !hours) validationErrors.push("Please submit operating hours for your restaurant")
    if (!priceRating) validationErrors.push("Please select a price rating for your restaurant")
    if (phoneNumber.length < 15 || !phoneNumber) validationErrors.push('Please submit a valid phone number')
    if (!websiteUrl) validationErrors.push("Please submit a valid website")
    if (!imageUrl || (!imageUrl.endsWith('jpg') || !imageUrl.endsWith('jpeg') || !imageUrl.endsWith('png'))) validationErrors.push('Please submit a valid link to an image with the following formats: "jpg, jpeg, or png"')

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
  

    let theEditedRestaurant = await dispatch(updateOneRestaurant(data, id));
    console.log('this ~~~~~~~~~>', theEditedRestaurant)
    if(theEditedRestaurant) {
      history.push(`/restaurants/${theEditedRestaurant.id}`);
    }
  }

  return (
    <div>
      <h1>Update your Goodeats Restaurant</h1>
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
          <NavLink to={`/restaurants/${id}`}>Cancel</NavLink>
        </div>
      </form>
    </div>
  )
}

export default EditRestaurantForm;