const MAIN_RESTAURANTS = 'restaurants/MAIN_RESTAURANTS'
const RESTAURANTS_PAGE = 'restaurants/RESTAURANTS_PAGE'
const ADD_RESTAURANT = 'restaurants/ADD_RESTAURANT'
// const CLEAR_RESTAURANT = 'restaurants/CLEAR_RESTAURANT'
const DELETE_RESTAURANT = 'restaurants/DELETE_RESTAURANT'

const getMainRestaurants = (restaurants) => ({
  type: MAIN_RESTAURANTS,
  restaurants
})

const getSingleRestaurant = (restaurant) => ({
  type: RESTAURANTS_PAGE,
  restaurant
})

const addSingleRestaurant = (restaurant) => ({
  type: ADD_RESTAURANT,
  restaurant
})

// export const clearRestaurant = () => ({
//   type: CLEAR_RESTAURANT
// })

const deleteSingleRestaurant = (restaurant) => ({
  type: DELETE_RESTAURANT,
  restaurant
})

export const mainRestaurants = () => async (dispatch) => {
  const res = await fetch('/api/restaurants/');
  
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

export const addNewRestaurant = (data) => async(dispatch) => {
  const res = await fetch('/api/restaurants/new', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const newRestauarant = await res.json();
    dispatch(addSingleRestaurant(newRestauarant))
    return newRestauarant
  }
}

export const deleteOneRestaurant = (id) => async(dispatch) => {
  const res = await fetch(`/api/restaurants/${id}/delete`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(deleteSingleRestaurant(id))
  }
}

const initial_state = {}

const restaurantsReducer = (state=initial_state, action) => {
  switch(action.type) {
    case MAIN_RESTAURANTS : {
      const new_state = action.restaurants
      return new_state
    }
    case RESTAURANTS_PAGE : {
      // const new_state = action.restaurant
      const new_state = {}
      new_state[action.restaurant.id] = action.restaurant
      return new_state
    }
    case ADD_RESTAURANT : {
      console.log('action for ADD_RESTAURANT reducer: ', action)
      const new_state = { ...state, [action.restaurant.id]:action.restaurant }
      return new_state
    }
    // case CLEAR_RESTAURANT : {
    //   return {}
    // }
    case DELETE_RESTAURANT : {
      const newState = { ...state }
      delete newState[action.restaurant]
      return newState
    }
    default :
      return state
  }
}

export default restaurantsReducer