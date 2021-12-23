const GET_REVIEWS = "reviews/GET_REVIEWS";
const POST_REVIEW = "reviews/POST_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

const loadPageReviews = (reviews, id) => ({
  type: GET_REVIEWS,
  reviews,
  id
})

const addReview = (review) => ({
  type: POST_REVIEW,
  review
})

const deleteAReview = (review) => ({
  type: DELETE_REVIEW,
  review
})

export const getPageReviews = (id) => async(dispatch) => {
  if (id) {
    const res = await fetch(`/api/reviews/${id}`)
    const reviews = await res.json();
    dispatch(loadPageReviews(reviews, id))
  }
}

export const addNewReview = (review, id) => async(dispatch) => {
  const res = await fetch(`/api/reviews/${id}/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review)
  });

  // if (res.ok) {
  //   const reviewData = await res.json();
  //   dispatch(addNewReview(reviewData.new, id))
  //   return res;
  // }
  // if (res.ok) {
  //   const reviewData = await res.json();
  //   dispatch(addReview(reviewData))
  //   return reviewData;
  // }
  // try {
    const newRev = await res.json();
    // console.log('this is newRev: ',newRev)
    dispatch(addReview(newRev));
    return newRev;
  // } catch(error) {
  //   console.log(error)
  // }
}

// export const deleteOneReview = (id, reviewId) => async(dispatch) => {
//   const res = await fetch(`/api/restaurants/${id}/reviews/${reviewId}`, {
//     method: 'DELETE',
//   })

//   if (res.ok) {
//     dispatch(deleteAReview(reviewId))
//   }
// }
// export const deleteOneReview = (reviewId, id) => async (dispatch) => {
export const deleteOneReview = (reviewId) => async (dispatch) => {
  // ! for some reason id is undefined
  // const res = await fetch(`/api/restaurant/${id}/reviews/${reviewId}`, {
  const res = await fetch(`/api/reviews/${reviewId}/delete`, {
    method: 'DELETE',
  })

  if (res.ok) {
    const delReview = await res.json();
    console.log('the deleted review: ---> ', delReview)
    dispatch(deleteAReview(delReview))
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
      const newState = { ...state, [action.review.id]: action.review };
      return newState;
      // let newState = {}
      // if (!state[action.newRev.id]) {
      //   newState = {
      //     ...state,
      //     [action.newRev.review.id]:action.newRev.review
      //   }
      // }
      // return newState
    }
    case DELETE_REVIEW : {
      const newState = { ...state }
      delete newState[action.review.id]
      return newState
    }
    default:
      return state;
  }
}

export default reviewsReducer