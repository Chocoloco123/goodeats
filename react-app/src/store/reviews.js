const GET_REVIEWS = "reviews/GET_REVIEWS";

const loadPageReviews = (reviews, id) => ({
  type: GET_REVIEWS,
  reviews,
  id
})

export const getPageReviews = (id) => async(dispatch) => {
  if (id) {
    const res = await fetch(`/api/restaurants/${id}/reviews`)
    const reviews = await res.json();
    dispatch(loadPageReviews(reviews, id))
  }
}

const initial_state = {};

const reviewsReducer = (state = initial_state, action) => {
  switch(action.type) {
    case GET_REVIEWS : {
      const newState = {};
      for (const[key, value] of Object.entries(action.reviews)) {
        newState[key] = value
      }
      return newState
    }
    default:
      return state;
  }
}

export default reviewsReducer