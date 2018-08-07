import axios from "axios";

//constants
const ADD_FREELANCER = "ADD_FREELANCER";
const GET_FREELANCER = "GET_FREELANCER";
const GET_FREELANCERS = "GET_FREELANCERS";
const UPDATE_FREELANCER = "UPDATE_FREELANCER";

const ADD_FREELANCER_POST = "ADD_FREELANCER_POST";
const GET_FREELANCER_POST = "GET_FREELANCER_POST";
const DELETE_FREELANCER_POST = "DELETE_FREELANCER_POST";
const UPDATE_FREELANCER_POST = "UPDATE_FREELANCER_POST";

//action creators
export function addFreelancer(bio, skills, experience, city, user_id) {
  return {
    type: ADD_FREELANCER,
    payload: axios.post("/api/freelancer/", {
      bio,
      skills,
      experience,
      city,
      user_id
    })
  };
}
export function getFreelancer(id) {
  return {
    type: GET_FREELANCER,
    payload: axios.get(`/api/freelancer/${id}`)
  };
}
export function getFreelancers() {
  return {
    type: GET_FREELANCER,
    payload: axios.get("/api/freelancers")
  };
}

export function updateFreelancer(id, bio, skills, experience, city) {
  return {
    type: UPDATE_FREELANCER,
    payload: axios.put(`/api/freelancer/${id}`, bio, skills, experience, city)
  };
}

export function addFreelancerPost(title, body, user_id) {
  return {
    type: ADD_FREELANCER_POST,
    payload: axios.post("/api/freelancerPost/", {
      title,
      body,
      user_id
    })
  };
}

export function getFreelancerPost(id) {
  return {
    type: GET_FREELANCER_POST,
    payload: axios.get(`/api/freelancerPost/${id}`)
  };
}

export function deleteFreelancerPost(id) {
  return {
    type: DELETE_FREELANCER_POST,
    payload: axios.delete(`/api/freelancerPost/${id}`)
  };
}

export function updateFreelancerPost(id, obj) {
  return {
    type: UPDATE_FREELANCER_POST,
    payload: axios.put(`/api/freelancerPost/${id}`, obj)
  };
}

//initial state
const initialState = {
  freelancer: [],
  freelancers: [],
  freelancerPost: [],
  freelancerPosts: [],
  isLoading: false,
  error: ""
};

//reducer
export default function freelancerReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_FREELANCER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FREELANCER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancer: action.payload.data
      };
    case `${GET_FREELANCER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${GET_FREELANCERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FREELANCERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancers: action.payload.data
      };
    case `${GET_FREELANCERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${ADD_FREELANCER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_FREELANCER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancer: action.payload.data
      };
    case `${ADD_FREELANCER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${UPDATE_FREELANCER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_FREELANCER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancer: action.payload.data
      };
    case `${UPDATE_FREELANCER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${ADD_FREELANCER_POST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_FREELANCER_POST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancerPosts: action.payload.data
      };
    case `${ADD_FREELANCER_POST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${GET_FREELANCER_POST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FREELANCER_POST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancerPost: action.payload.data
      };
    case `${GET_FREELANCER_POST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${DELETE_FREELANCER_POST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${DELETE_FREELANCER_POST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancerPost: action.payload.data
      };
    case `${DELETE_FREELANCER_POST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${UPDATE_FREELANCER_POST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${UPDATE_FREELANCER_POST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancerPost: action.payload.data
      };
    case `${UPDATE_FREELANCER_POST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
