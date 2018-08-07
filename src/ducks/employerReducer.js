import axios from "axios";

const ADD_EMPLOYER = "ADD_EMPLOYER";
const GET_EMPLOYER = "GET_EMPLOYER";
const GET_EMPLOYERS = "GET_EMPLOYERS";
const UPDATE_EMPLOYER = "UPDATE_EMPLOYER";

export function addEmployer(
  bio,
  company,
  position,
  city,
  user_id,
  company_logo
) {
  return {
    type: ADD_EMPLOYER,
    payload: axios.post("/api/employer/", {
      bio,
      company,
      position,
      city,
      user_id,
      company_logo
    })
  };
}
export function getEmployer(id) {
  return {
    type: GET_EMPLOYER,
    payload: axios.get(`/api/employer/${id}`)
  };
}
export function getEmployers() {
  return {
    type: GET_EMPLOYERS,
    payload: axios.get("/api/employers")
  };
}

export function updateEmployer(
  id,
  bio,
  company,
  position,
  city,
  user_id,
  company_logo
) {
  return {
    type: UPDATE_EMPLOYER,
    payload: axios.put(
      `/api/employer/${id}`,
      bio,
      company,
      position,
      city,
      user_id,
      company_logo
    )
  };
}

//initial state
const initialState = {
  employer: [],
  employers: [],
  isLoading: false,
  error: ""
};

export default function employerReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_EMPLOYER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EMPLOYER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        employer: action.payload.data
      };
    case `${GET_EMPLOYER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${GET_EMPLOYERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EMPLOYERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        employers: action.payload.data
      };
    case `${GET_EMPLOYERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case `${ADD_EMPLOYER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_EMPLOYER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        employer: action.payload.data
      };
    case `${ADD_EMPLOYER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${UPDATE_EMPLOYER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_EMPLOYER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        employer: action.payload.data
      };
    case `${UPDATE_EMPLOYER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
  }
}
