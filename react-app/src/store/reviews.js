const GET_REVIEWS = "reviews/GET_REVIEWS";
const POST_REVIEW = "reviews/POST_REVIEW";

const loadPageReviews = (reviews, id) => ({
  type: GET_REVIEWS,
  reviews,
  id
})

const addReview = (review) => ({
  type: POST_REVIEW,
  review
})

export const getPageReviews = (id) => async(dispatch) => {
  if (id) {
    const res = await fetch(`/api/restaurants/${id}/reviews`)
    const reviews = await res.json();
    dispatch(loadPageReviews(reviews, id))
  }
}

export const addNewReview = (review, restaurantId) => async(dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/reviews/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review)
  });

  try {
    const newRev = await res.json();
    dispatch(addReview(newRev));
    return newRev;
  } catch(error) {
    console.log(error)
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
    case POST_REVIEW : {
      const newState = {
        ...state,
        [action.newRev.review.id]:action.newRev.review
      }
      return newState
    }
    default:
      return state;
  }
}

export default reviewsReducer