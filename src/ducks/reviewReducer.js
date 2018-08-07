import axios from "axios";

//constants
const GET_REVIEWS = "GET_REVIEWS";

//action creators
export function getReviews() {
  return {
    type: GET_REVIEWS,
    payload: axios.get("/api/reviews")
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

    default:
      return state;
  }
}
