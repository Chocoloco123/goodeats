import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mainRestaurants } from "../../store/restaurants";
import './MainRestaurants.css'
import SingleRestaurantCard from "../SingleRestaurantCard";
import { NavLink, Redirect } from "react-router-dom";
import { useHistory } from "react-router";

const TheMainRestaurants = () => {
  const restaurants = useSelector((state) => Object.values(state?.restaurant))
  // const restaurants = useSelector((state) => state?.restaurant)
  
  console.log('restaurants in mainRestaurants: ',restaurants)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(mainRestaurants())
  }, [dispatch])

  const toNewForm = () => {
    <Redirect to='/restaurants/new_restaurant' />
    // history.push('/')
  }

  if (!restaurants) {
    return null
  } else {
    return (
      <div>
        <div>
          <NavLink to={'/restaurants/new_restaurant'}>Add Restaurant
          </NavLink>
        </div>
        <div className="centerImageDivCont">
          <img src='https://res.cloudinary.com/dsz4sha80/image/upload/v1639780282/pexels-diamond-multimedia-9993709-cropped_etfdd3.jpg' className="centerPhotoCont" alt='centerPhoto'>
          </img>
        </div>
        <div className="topPicsDivCont">
          <h2 className="topPicksH2">
            Top Picks for You
          </h2>
        </div>
        <div className="restaurantCardInd">
          {restaurants.length > 0 ?
            restaurants?.map(({
              id, name, city, state,  stars, review_count, categoryId, imageUrl
            }
          )=> 
            <SingleRestaurantCard
              key={id}
              id={id}
              imageUrl={imageUrl}
              name={name}
              stars={stars}
              review_count={review_count}
              categoryId={categoryId}
              city={city}
              state={state}
            />) : null
          }
        </div>
      </div>
    )
  }
}

export default TheMainRestaurants;