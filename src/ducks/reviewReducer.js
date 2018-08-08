import axios from "axios";

//constants
const GET_REVIEWS = "GET_REVIEWS";
const DELETE_REVIEW = "DELETE_REVIEW";
const ADD_REVIEW = "ADD_REVIEW";

//action creators
export function getReviews() {
  return {
    type: GET_REVIEWS,
    payload: axios.get("/api/reviews")
  };
}

export function deleteReview(id) {
  return {
    type: DELETE_REVIEW,
    payload: axios.delete(`/api/review/${id}`)
  };
}

export function addReview(review, user_id, reviewer_id, moment, rating) {
  // console.log(review, user_id, review_id, moment, rating);
  return {
    type: ADD_REVIEW,
    payload: axios.post(`/api/review/`, {
      review,
      user_id,
      reviewer_id,
      moment,
      rating
    })
  };
}

//initial state
const initialState = {
  reviews: [],
  isLoading: false
};

//reducer
export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_REVIEWS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_REVIEWS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        reviews: action.payload.data
      };
    case `${GET_REVIEWS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        reviews: action.payload.data
      };

    case `${DELETE_REVIEW}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${DELETE_REVIEW}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        reviews: action.payload.data
      };
    case `${DELETE_REVIEW}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${ADD_REVIEW}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_REVIEW}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,

        reviews: action.payload.data
      };
    case `${ADD_REVIEW}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
