const GET_IMAGES = "images/GET_IMAGES";
const ADD_IMAGE ="images/ADD_IMAGES";

const loadRestaurantImages = (images, restaurantId) => ({
  type: GET_IMAGES,
  images,
  restaurantId
});

const addNewImage = (image) => ({
  type: ADD_IMAGE,
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
    methods: "POST",
    headers: {
      'Content Type': 'application/json'
    },
    body: JSON.stringify(image)
  });

  const newImage = await res.json();
  dispatch(addNewImage(newImage));
  return newImage;
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
    default:
      return state;
  }
}

export default imagesReducer