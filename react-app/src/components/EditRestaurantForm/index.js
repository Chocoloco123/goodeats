import './editRestaurantForm.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import { getOneRestaurant, updateOneRestaurant } from "../../store/restaurants";
import '../AddRestaurantForm/addRestaurant.css'


const EditRestaurantForm = () => {
  // const categoryElements = useSelector(state => state.category)

  const params = useParams();
  const { id } = params;
  const restaurant = useSelector((state) => state?.restaurant[id] ? state?.restaurant[id] : '')
  // console.log(restaurant)

  const [name, setName] = useState(restaurant?.name ? restaurant?.name : '');
  const [description, setDescription] = useState(restaurant?.description ? restaurant?.description : '');
  const [address, setAddress] = useState(restaurant?.address ? restaurant?.address : '');
  const [city, setCity] = useState(restaurant?.city ? restaurant?.city : '');
  const [state, setState] = useState(restaurant?.state ? restaurant?.state : '');
  const [zipcode, setZipcode] = useState(restaurant?.zipcode ? restaurant?.zipcode : '');
  // const [category, setCategory] = useState(restaurant?.category ? restaurant?.category : '');
  const [hours, setHours] = useState(restaurant?.hours ? restaurant?.hours : '');
  // const [priceRating, setPriceRating] = useState(restaurant?.priceRating ? restaurant?.priceRating : '');
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
      // setCategory(restaurant.categoryId)
      setHours(restaurant.hours)
      // setPriceRating(restaurant.priceRating)
      setPhoneNumber(restaurant.phoneNumber)
      setWebsiteUrl(restaurant.websiteUrl)
      setImageUrl(restaurant.imageUrl)
    }
  }, [dispatch, restaurant])

  useEffect(() => {
    const validationErrors = [];
    if (name.length < 3 || !name || name.trim() === '') validationErrors.push("A name is required")
    if (name.length > 45 || name.trim() === '') validationErrors.push("45 Character max limit reached")
    if (description.length < 3 || !description || description.trim() === '') validationErrors.push("A description is required")
    if (address.length < 2 || !address || address.trim() === '') validationErrors.push("An address is required")
    // if (!city.length) validationErrors.push('Please submit a city')
    if (!city.length || city.length < 3 || city.trim() === '') validationErrors.push('Please submit a valid city')
    if (state !== state.toUpperCase()) validationErrors.push("Case sensitive, please submit state in upper case")
    if ((state.length <= 1 && state.length >= 1)  || !state || state.length !== 2 || state.trim() === '') validationErrors.push("A state is required. Please submit a valid two-letter state abbreviation")
    if (zipcode.length < 5 || zipcode.length > 5 || !zipcode) validationErrors.push("A zipcode is required. Please submit a valid 5 digit zip code")
    if (!+zipcode) validationErrors.push("Please submit digits only for zip code")
    // if (zipcode.trim() === '') validationErrors.push("Please submit a valid zipcode")
    // if (category.length < 2 || !category) validationErrors.push("An category is required")
    if (hours.length < 2 || !hours || hours.trim() === '') validationErrors.push("Please submit operating hours for your restaurant")
    // if (!priceRating) validationErrors.push("Please select a price rating for your restaurant")
    if (phoneNumber.length > 15 || !phoneNumber || phoneNumber.trim() === '') validationErrors.push('Please submit a valid phone number')
    if (!websiteUrl || websiteUrl.trim() === '') validationErrors.push("Please submit a valid website")
    // if (!imageUrl) validationErrors.push('Please submit an image url')
    if (!imageUrl || (!imageUrl.endsWith('jpg') && !imageUrl.endsWith('jpeg') && !imageUrl.endsWith('png')) || imageUrl.trim() === '') validationErrors.push('Please submit a valid link to an image with the following formats: jpg, jpeg, or png')

    setErrors(validationErrors)
  }, [name, description, address, city, state, zipcode, hours, phoneNumber, websiteUrl, imageUrl])
  // [name, description, address, city, state, zipcode, category, hours, priceRating, phoneNumber, websiteUrl, imageUrl]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      address,
      city,
      state,
      zipcode,
      // category,
      hours,
      // priceRating,
      phoneNumber,
      websiteUrl,
      imageUrl,
    }
  
    if (!errors.length) {
      let theEditedRestaurant = await dispatch(updateOneRestaurant(data, id));
      // console.log('this ~~~~~~~~~>', theEditedRestaurant)
      if(theEditedRestaurant) {
        history.push(`/restaurants/${theEditedRestaurant.id}`);
      }
    }
  }

  return (
    <div className="addRest-FormCont-Div">
      <form onSubmit={handleSubmit} className="addRest-Form-Div">
        <h1 className="addRestTitle-AddForm addGoodeatsRest-Title">Update your Restaurant</h1>
        <div>
          <ul className="errorHandling">
            {errors.map((error) => <li key={error} className='errorHandling errorsLi-AddRest'><i className="fas fa-exclamation errorExclamation"></i>{error}</li>)}
          </ul>
        </div>
        <div className="biggerDiv-AddRestForm">
          <div className="addRest-Form-Inputs-Div">
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">Name</label> */}
              <input
                onChange={(e)=>setName(e.target.value)}
                value={name}
                placeholder="Name"
                className="addRestForm-Input-Class"
                required
              />
            </div>
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">Description</label> */}
              <textarea
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
                required
                placeholder="Description"
                className="addRestTitle-AddForm addRestForm-Input-Class"
              ></textarea>
            </div>
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">Address</label> */}
              <input
                onChange={(e)=>setAddress(e.target.value)}
                value={address}
                placeholder="Address"
                className="addRestForm-Input-Class"
                required
              />
            </div>
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">City</label> */}
              <input
                onChange={(e)=>setCity(e.target.value)}
                value={city}
                placeholder="City"
                className="addRestForm-Input-Class"
                required
              />
            </div>
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">State</label> */}
              <input
                onChange={(e)=>setState(e.target.value)}
                value={state}
                placeholder="State"
                className="addRestForm-Input-Class"
                required
              />
            </div>
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">Zip Code</label> */}
              <input
                onChange={(e)=>setZipcode(e.target.value)}
                value={zipcode}
                placeholder="Zip Code"
                className="addRestForm-Input-Class"
                required
              />
            </div>
            {/* <div>
              <label className="addRestTitle-AddForm label-AddForm">Category</label>
              <input
                onChange={(e)=>setCategory(e.target.value)}
                value={category}
                required
              />
            </div> */}
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">Hours</label> */}
              <input
                onChange={(e)=>setHours(e.target.value)}
                value={hours}
                placeholder="Hours"
                className="addRestForm-Input-Class"
                required
              />
            </div>
            {/* <div>
            <label className="addRestTitle-AddForm label-AddForm">Price Rating</label>
            <input
                onChange={(e)=>setPriceRating(e.target.value)}
                value={priceRating}
                required
              />
            </div> */}
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">Phone Number</label> */}
              <input
                onChange={(e)=>setPhoneNumber(e.target.value)}
                value={phoneNumber}
                placeholder="Phone Number"
                className="addRestForm-Input-Class"
                required
              />
            </div>
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">Website Url</label> */}
              <input
                onChange={(e)=>setWebsiteUrl(e.target.value)}
                value={websiteUrl}
                placeholder="Website Url"
                className="addRestForm-Input-Class"
                required
              />
            </div>
            <div className="eachInput-Div-AddRest">
              {/* <label className="addRestTitle-AddForm label-AddForm">Image Url</label> */}
              <input
                onChange={(e)=>setImageUrl(e.target.value)}
                value={imageUrl}
                placeholder="Image Url"
                className="addRestForm-Input-Class"
                required
              />
            </div>
          </div>
          {/* <div className="innerDiv-AddRestImg">

          </div> */}
          <div className="button_div">
            <button disabled={errors.length}className='submit_button WriteAReviewBtn-Submit' type='submit'>
              Submit
            </button>
            <NavLink to={`/restaurants/${id}`} className='cancelBtn-Review updateRest-Cancel-Btn update-Cancel-Btn'>Cancel</NavLink>
          </div>
        </div>

      </form>
      
    </div>
  )
}

export default EditRestaurantForm;

