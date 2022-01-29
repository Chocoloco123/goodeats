const GET_IMAGES = 'images/GET_IMAGES';

const loadRestaurantImages = (images, restaurantId) => ({
  type: GET_IMAGES,
  images,
  restaurantId
})

export const getRestImages = (restaurantId) => async(dispatch) => {
  if (restaurantId) {
    const res = await fetch(`/api/images/${restaurantId}`)
    const images = await res.json();
    dispatch(loadRestaurantImages(images, restaurantId))
  }
}

const initial_state = {};

const imagesReducer = (state = initial_state, action) => {
  switch(action.type) {
    case GET_IMAGES: {
      const newState = {};
      for (const[key, val] of Object.entries(action.images)) {
        newState[key] = val
      }
      return newState;
    }
    default:
      return state;
  }
}

export default imagesReducer;