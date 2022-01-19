const FIND_RESTAURANT = 'search/FIND_RESTAURANT';

const searchedRestaurant = (restaurants) => ({
  type: FIND_RESTAURANT,
  restaurants
})

export const  searchForRestaurant = (query) => async(dispatch) => {
  const res = await fetch(`/api/restaurants/search/${query}`)
  
  if (res.ok) {
    const searchedRest = await res.json();
    dispatch(searchedRestaurant(searchedRest))
    return searchedRest
  }
}

const searchReducer = (state={}, action) => {
  switch(action.type) {
    case FIND_RESTAURANT: {
      const newState = action.restaurants
      return newState
    }
    default:
      return state;
  }
}

export default searchReducer;