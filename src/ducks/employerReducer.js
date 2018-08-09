import axios from "axios";

const ADD_EMPLOYER = "ADD_EMPLOYER";
const GET_EMPLOYER = "GET_EMPLOYER";
const GET_EMPLOYERS = "GET_EMPLOYERS";
const UPDATE_EMPLOYER = "UPDATE_EMPLOYER";

const ADD_EMPLOYER_POST = "ADD_EMPLOYER_POST";
const GET_EMPLOYER_POSTS = "GET_EMPLOYER_POSTS";
const DELETE_EMPLOYER_POST = "DELETE_EMPLOYER_POST";
const UPDATE_EMPLOYER_POST = "UPDATE_EMPLOYER_POST";

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

export function addEmployerPost(
  title,
  body,
  specialty,
  price,
  user_id,
  moment
) {
  return {
    type: ADD_EMPLOYER_POST,
    payload: axios.post("/api/employerPost/", {
      title,
      body,
      specialty,
      price,
      user_id,
      moment
    })
  };
}

export function getEmployerPosts() {
  return {
    type: GET_EMPLOYER_POSTS,
    payload: axios.get(`/api/employerPosts/`)
  };
}

export function deleteEmployerPost(id) {
  return {
    type: DELETE_EMPLOYER_POST,
    payload: axios.delete(`/api/employerPost/${id}`)
  };
}

export function updateEmployerPost(id, obj) {
  return {
    type: UPDATE_EMPLOYER_POST,
    payload: axios.put(`/api/employerPost/${id}`, obj)
  };
}

//initial state
const initialState = {
  employer: [],
  employers: [],
  employerPosts: [],
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

    case `${ADD_EMPLOYER_POST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_EMPLOYER_POST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        employerPosts: action.payload.data
      };
    case `${ADD_EMPLOYER_POST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${GET_EMPLOYER_POSTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EMPLOYER_POSTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        employerPosts: action.payload.data
      };
    case `${GET_EMPLOYER_POSTS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${DELETE_EMPLOYER_POST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${DELETE_EMPLOYER_POST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        employerPosts: action.payload.data
      };
    case `${DELETE_EMPLOYER_POST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${UPDATE_EMPLOYER_POST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_EMPLOYER_POST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        employerPosts: action.payload.data
      };
    case `${UPDATE_EMPLOYER_POST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
