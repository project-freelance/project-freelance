import axios from "axios";

//constants
const GET_USER = "GET_USER";
const UPDATE_ROLE = "UPDATE_ROLE";
const UPDATE_SPECIALTY = "UPDATE_SPECIALTY";

//action creators
export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/user")
  };
}
export function updateRole(id, role) {
  return {
    type: UPDATE_ROLE,
    payload: axios.put(`/api/user/role/${id}`, role)
  };
}
export function updateSpecialty(id, specialty) {
  return {
    type: UPDATE_SPECIALTY,
    payload: axios.put(`/api/user/specialty/${id}`, specialty)
  };
}

//initial state
const initialState = {
  user: [],
  loading: false
};

//reducer
export default function userReducer(state = initialState, action) {
  // console.log(action.type, action.payload);
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data,
        loading: false
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        loading: false
      };

    case `${UPDATE_ROLE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_ROLE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data
      };
    case `${UPDATE_ROLE}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${UPDATE_SPECIALTY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_SPECIALTY}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data
      };
    case `${UPDATE_SPECIALTY}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
