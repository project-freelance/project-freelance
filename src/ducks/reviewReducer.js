import axios from "axios";

//constants
const GET_REVIEWS = "GET_REVIEWS";
const DELETE_REVIEW = "DELETE_REVIEW";
const ADD_REVIEW = "ADD_REVIEW";
const GET_AVG_RATING = "GET_AVG_RATING";

//action creators
export function getReviews(id) {
  return {
    type: GET_REVIEWS,
    payload: axios.get(`/api/reviews/${id}`)
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

export function getAvgRating(id) {
  return {
    type: GET_AVG_RATING,
    payload: axios.get(`/api/rating/${id}`)
  };
}

//initial state
const initialState = {
  reviews: [],
  rating: [],
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

    case `${GET_AVG_RATING}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_AVG_RATING}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        rating: action.payload.data
      };
    case `${GET_AVG_RATING}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload.data
      };

    default:
      return state;
  }
}
