const MAIN_RESTAURANTS = 'restaurants/MAIN_RESTAURANTS'

const getMainRestaurants = (restaurants) => ({
  type: MAIN_RESTAURANTS,
  restaurants
})

export const mainRestaurants = () => async (dispatch) => {
  const res = await fetch('/api/restaurants/main');
  if (res.ok) {
    const restaurants = await res.json();
    dispatch(getMainRestaurants(restaurants))
  }
}



const initial_state = {}

const restaurantsReducer = (state=initial_state, action) => {
  switch(action.type) {
    case MAIN_RESTAURANTS : {
      const new_state = action.restaurants
      return new_state
    }
    default :
      return state
  }
}

export default restaurantsReducer