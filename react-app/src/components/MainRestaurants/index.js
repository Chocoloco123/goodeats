import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mainRestaurants } from "../../store/restaurants";
import './MainRestaurants.css'
import SingleProductCard from "../SingleRestaurantCard";

const TheMainRestaurants = () => {
  const restaurants = useSelector((state) => Object.values(state.restaurants))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mainRestaurants())
  }, [dispatch])

  if (!restaurants) {
    return null
  } else {
    return (
      <div>
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
    )
  }
}

export default TheMainRestaurants;