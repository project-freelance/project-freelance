import axios from "axios";

//constants
const ADD_PORTFOLIO = "ADD_PORTFOLIO";
const GET_PORTFOLIO = "GET_PORTFOLIO";
const UPDATE_PORTFOLIO = "UPDATE_PORTFOLIO";
const DELETE_PORTFOLIO = "DELETE_PORTFOLIO";

//action creators
export function addPortfolio(
  // image_url,
  user_id
) {
  return {
    type: ADD_PORTFOLIO,
    payload: axios.post("/api/portfolio", {
      // image_url,
      user_id
    })
  };
}
export function getPortfolio(id) {
  return {
    type: GET_PORTFOLIO,
    payload: axios.get(`/api/portfolio/${id}`)
  };
}
export function updatePortfolio(
  id,
  image_url1,
  image_url2,
  image_url3,
  link1,
  link2,
  link3
) {
  return {
    type: UPDATE_PORTFOLIO,
    payload: axios.put(
      `/api/portfolio/${id}`,
      image_url1,
      image_url2,
      image_url3,
      link1,
      link2,
      link3
    )
  };
}
export function deleteFreelancerPost(id) {
  return {
    type: DELETE_PORTFOLIO,
    payload: axios.delete(`/api/portfolio/${id}`)
  };
}
//initial state
const initialState = {
  portfolio: [],
  isLoading: false,
  error: ""
};
//reducer
export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PORTFOLIO}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PORTFOLIO}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        portfolio: action.payload.data
      };
    case `${GET_PORTFOLIO}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${ADD_PORTFOLIO}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_PORTFOLIO}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        portfolio: action.payload.data
      };
    case `${ADD_PORTFOLIO}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${UPDATE_PORTFOLIO}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_PORTFOLIO}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        portfolio: action.payload.data
      };
    case `${UPDATE_PORTFOLIO}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${DELETE_PORTFOLIO}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${DELETE_PORTFOLIO}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        portfolio: action.payload.data
      };
    case `${DELETE_PORTFOLIO}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
