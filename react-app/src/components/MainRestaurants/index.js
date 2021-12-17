import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mainRestaurants } from "../../store/restaurants";
import './MainRestaurants.css'
import SingleProductCard from "../SingleRestaurantCard";

const TheMainRestaurants = () => {
  const restaurants = useSelector((state) => Object.values(state?.restaurant))
  // const restaurants = useSelector((state) => state?.restaurant)
  
  console.log('restaurants ',restaurants)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mainRestaurants())
  }, [dispatch])

  if (!restaurants) {
    return null
  } else {
    return (
      <div>
        <div className="centerImageDivCont">
          <img src='https://res.cloudinary.com/dsz4sha80/image/upload/v1639780282/pexels-diamond-multimedia-9993709-cropped_etfdd3.jpg' className="centerPhotoCont" alt='centerPhoto'>
          </img>
        </div>
        <div className="restaurantCardInd">
          {restaurants?.map(({
            id, name, description, address, city, state, zipcode, stars, review_count, categoryId, hours, ownerId, priceRating, phoneNumber, websiteUrl, imageUrl
          })=> 
            <SingleProductCard
              key={id}
              id={id}
              imageUrl={imageUrl}
              name={name}
              stars={stars}
              review_count={review_count}
              categoryId={categoryId}
              city={city}
              state={state}
            />)}
        </div>
      </div>
    )
  }
}

export default TheMainRestaurants;