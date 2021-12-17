const MAIN_RESTAURANTS = 'restaurants/MAIN_RESTAURANTS'
const RESTAURANTS_PAGE = 'restaurants/RESTAURANTS_PAGE'

const getMainRestaurants = (restaurants) => ({
  type: MAIN_RESTAURANTS,
  restaurants
})

const getSingleRestaurant = (restaurant) => ({
  type: RESTAURANTS_PAGE,
  restaurant
})

export const mainRestaurants = () => async (dispatch) => {
  const res = await fetch('/api/restaurants');
  
  if (res.ok) {
    const restaurants = await res.json();
    dispatch(getMainRestaurants(restaurants))
  }
}

export const getOneRestaurant = (id) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${id}`)
  const restaurant = await res.json()
  console.log('the restaurant thunk: ========>',restaurant)
  dispatch(getSingleRestaurant(restaurant))
}


const initial_state = {}

const restaurantsReducer = (state=initial_state, action) => {
  switch(action.type) {
    case MAIN_RESTAURANTS : {
      const new_state = action.restaurants
      return new_state
    }
    case RESTAURANTS_PAGE : {
      const new_state = action.restaurant
      return new_state
    }
    default :
      return state
  }
}

export default restaurantsReducer