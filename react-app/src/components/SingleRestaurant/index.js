import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneRestaurant } from "../../store/restaurants";

const SingleRestaurantPage = () => {
  const restaurant = useSelector((state) => Object.values(state.restaurant))

  const { restaurantId } = useParams()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneRestaurant(restaurantId))
  }, [dispatch, restaurantId])

  if (!restaurant) {
    return null
  } else {
    return (
      <div>
        hello world!
      </div>


    )


  }

}

export default SingleRestaurantPage