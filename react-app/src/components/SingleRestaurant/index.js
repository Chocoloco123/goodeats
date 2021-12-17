import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneRestaurant } from "../../store/restaurants";

const SingleRestaurantPage = () => {
  const { id } = useParams()
  const restaurant = useSelector((state) => state?.restaurant)
  // const restaurant = useSelector((state) => state?.restaurant[id] ? state?.restaurant[id] : "")
  
  
  const dispatch = useDispatch();
  console.log('single page restaurant: ', restaurant)

  useEffect(() => {
    dispatch(getOneRestaurant(id))
    console.log('!!!!!!!!!!!!!!!!!!!')
  }, [dispatch, id])
  console.log('hereeeeeeeeeee')
  console.log('after: ', restaurant)
  if (!restaurant) {
    return null
  } else {
    return (
      <div>
        hello world!
        {restaurant.name}
        <img src={restaurant.imageUrl} alt=''></img>
      </div>


    )


  }

}

export default SingleRestaurantPage