import axios from "axios";

//constants
const GET_REVIEWS = "GET_REVIEWS";
const DELETE_REVIEW = "DELETE_REVIEW";
const UPDATE_REVIEW = "UPDATE_REVIEW";

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

export function updateReview(id, obj) {
  return {
    type: UPDATE_REVIEW,
    payload: axios.put(`/api/review/${id}`, obj)
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

    case `${UPDATE_REVIEW}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_REVIEW}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        reviews: action.payload.data
      };
    case `${UPDATE_REVIEW}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
