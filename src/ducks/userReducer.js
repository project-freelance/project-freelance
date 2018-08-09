import axios from "axios";

//constants
const GET_USER = "GET_USER";
const GET_USERS = "GET_USERS";
const UPDATE_ROLE = "UPDATE_ROLE";
const UPDATE_SPECIALTY = "UPDATE_SPECIALTY";
const UPDATE_USER = "UPDATE_USER";

//action creators
export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/user")
  };
}
export function getUsers() {
  return {
    type: GET_USERS,
    payload: axios.get("/api/users")
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
export const updateUser = obj => {
  console.log(obj);
  return {
    type: UPDATE_USER,
    payload: axios.put("/api/user", obj)
  };
};

//initial state
const initialState = {
  user: [],
  users: [],
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

    case `${GET_USERS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        users: action.payload.data,
        loading: false
      };
    case `${GET_USERS}_REJECTED`:
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
    case `${UPDATE_USER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_USER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data
      };
    case `${UPDATE_USER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload.data
      };

    default:
      return state;
  }
}
