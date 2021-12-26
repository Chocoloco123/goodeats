const GET_REVIEWS = "reviews/GET_REVIEWS";
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS"
// const GET_SINGLE_REVIEW = "reviews/GET_SINGLE_REVIEW";
const POST_REVIEW = "reviews/POST_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

const loadPageReviews = (reviews, id) => ({
  type: GET_REVIEWS,
  reviews,
  id
})

const allReviews = (reviews) => ({
  type: GET_ALL_REVIEWS,
  reviews
})

// const getAReview = (review, id) => ({
//   type: GET_SINGLE_REVIEW,
//   review,
//   id
// })

const addReview = (review) => ({
  type: POST_REVIEW,
  review
})

const editReview = (review) => ({
  type: UPDATE_REVIEW,
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

export const getAllReviews = () => async(dispatch) => {
  const res = await fetch(`/api/reviews`)
  const reviews = await res.json();
  dispatch(allReviews(reviews))
}

// export const getOneReview = (id) => async(dispatch) => {
//   if (id) {
//     const res = await fetch(`/api/reviews/${id}`)
//     const review = await res.json();
//     dispatch(getAReview(review, id));
//   }
// }

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

export const editAReview = (review, reviewId) => async(dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });

  const updatedReview = await res.json();
  dispatch(editReview(updatedReview))
  return updatedReview;
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
      for (const[key, val] of Object.entries(action.reviews)) {
        newState[key] = val
      }
      return newState
    }
    case GET_ALL_REVIEWS : {
      const newState = {}
      for (const [key, val] of Object.entries(action.reviews)) {
        newState[key] = val
      }
      return newState
    }
    // case GET_SINGLE_REVIEW : {
    //   // const newState = {};
    //   // for (const[key, val] of Object.entries(action.reviews)) {
    //   //   newState[key] = val
    //   // }
    //   // return newState
    //   const newState = { [action.review.id]: action.review}
    //   return newState;
    // }
    case POST_REVIEW : {
      const newState = { ...state, [action.review.id]: action.review };
      return newState;
    }
    case UPDATE_REVIEW : {
      const newState = { ...state,[action.review.id]: action.review }
      console.log('the newState -------> :', newState)
      return newState

      
      // const newState = {[action.review.id]:action.review}
      // return newState;
      // if (!state[action.review]) {
      //   const newState = { ...state, [action.review.id]: action.review };
      //   return newState;
      // }
      
      // return state;
      // const newState = { ...state, [action.review.id]: action.review }
      // return newState;
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