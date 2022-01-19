import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { mainRestaurants } from "../../store/restaurants";
import './MainRestaurants.css'
import SingleRestaurantCard from "../SingleRestaurantCard";
import { NavLink } from "react-router-dom";
import ToTop from "../pageLocations/ToPageTop";
// import { useHistory } from "react-router";
// import SignUpModal from "../modals/SignUp";
// import goodeatsLogo from '../../media/goodeats_flower_transparent.png'
import SearchBar from "../Search/SearchRestaurants";

const TheMainRestaurants = () => {
  const location = useLocation()
  
  const sessionUser = useSelector((state) => state.session.user);
  const restaurants = useSelector((state) => Object.values(state?.restaurant))
  // const restaurantAll = useSelector((state) => state?.restaurant)
  // console.log('hereeeeeeeeeeee',restaurantAll['23'])
  // console.log('restaurants in mainRestaurants: ',restaurants)
  const dispatch = useDispatch()
  // const history = useHistory()
  useEffect(() => {
    dispatch(mainRestaurants())
  }, [dispatch])

  // const toNewForm = () => {
  //   <Redirect to='/restaurants/new_restaurant' />
  //   // history.push('/')
  // }


  

  if (!restaurants) {
    return null
  } else {
    return (
      <div>
        <div className="centerImageDivCont">
          <img src='https://res.cloudinary.com/dsz4sha80/image/upload/v1639780282/pexels-diamond-multimedia-9993709-cropped_etfdd3.jpg' className="centerPhotoCont" alt='centerPhoto'>
          </img>
          <div className="newContDiv-MainTxt">
            <div className="centerText-Main-Div2 searchBar">
              <div className="centerText-Main2">
                {location.pathname="/" && <SearchBar />}
              </div>
              {/* <h2 className="centerText-Main2">Find the Best Restaurants in Town</h2> */}
              {/* <img src={goodeatsLogo} alt='goodeatsLogo' className='goodeatsLogoMain'></img> */}
            </div>
          </div>
        </div>
        <div className="addRestaurantBtn-Div">
          {sessionUser && 
            <NavLink to={'/restaurants/new_restaurant'} exact={true} className="addRestaurant-Btn">Add Restaurant
            </NavLink>
          }
        </div>
        <div className="topPicsDivCont">
          <h3 className="topPicksH3">
            Top Picks for You
          </h3>
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
        <ToTop />
      </div>
    )
  }
}

export default TheMainRestaurants;