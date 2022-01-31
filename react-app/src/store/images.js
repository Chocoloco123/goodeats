const GET_IMAGES = "images/GET_IMAGES";
const ADD_IMAGE = "images/ADD_IMAGES";
const DELETE_IMAGE = "images/DELETE_IMAGE";

const loadRestaurantImages = (images, restaurantId) => ({
  type: GET_IMAGES,
  images,
  restaurantId
});

const addNewImage = (image) => ({
  type: ADD_IMAGE,
  image
});

const deleteAnImage = (image) => ({
  type: DELETE_IMAGE,
  image
})

export const getRestImages = (restaurantId) => async(dispatch) => {
  if (restaurantId) {
    const res = await fetch(`/api/images/${restaurantId}`)
    const images = await res.json();
    dispatch(loadRestaurantImages(images, restaurantId))
  } else {
    return 'restaurantId does not exist!!!'
  }
}

export const addAnImage = (image, restaurantId) => async(dispatch) => {
  const res = await fetch(`/api/images/${restaurantId}/newImage`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(image)
  });

  const newImage = await res.json();
  dispatch(addNewImage(newImage));
  return newImage;
}

export const deleteImage = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}/delete`, {
    method: 'DELETE',
  })

  if (res.ok) {
    const delImage = await res.json();
    dispatch(deleteAnImage(delImage))
  }
}

const initial_state = {};

const imagesReducer = (state = initial_state, action) => {
  switch(action.type) {
    case GET_IMAGES : {
      const newState = {};
      for (const[key, val] of Object.entries(action.images)) {
        newState[key] = val
      }
      return newState;
    }
    case ADD_IMAGE : {
      const newState = { ...state, [action.image.id]: action.image
      }
      return newState;
    }
    case DELETE_IMAGE : {
      const newState = { ...state }
      delete newState[action.image.id]
      return newState
    }
    default:
      return state;
  }
}

export default imagesReducer