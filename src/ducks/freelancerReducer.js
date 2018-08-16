import axios from "axios";

//constants
const ADD_FREELANCER = "ADD_FREELANCER";
const GET_FREELANCER = "GET_FREELANCER";
const GET_FREELANCERS = "GET_FREELANCERS";
const GET_ALL_FREELANCER_INFO = "GET_ALL_FREELANCER_INFO";
const UPDATE_FREELANCER = "UPDATE_FREELANCER";

const ADD_FREELANCER_POST = "ADD_FREELANCER_POST";
const GET_FREELANCER_POSTS = "GET_FREELANCER_POSTS";
const DELETE_FREELANCER_POST = "DELETE_FREELANCER_POST";
const UPDATE_FREELANCER_POST = "UPDATE_FREELANCER_POST";

const ADD_FAVE_JOB = "ADD_FAVE_JOB";
const GET_FAVE_JOBS = "GET_FAVE_JOBS";
const DELETE_FAVE_JOB = "DELETE_FAVE_JOB";

//action creators
// export function addFreelancer(bio, skills, experience, city, user_id) {
//   return {
//     type: ADD_FREELANCER,
//     payload: axios.post("/api/freelancer/", {
//       bio,
//       skills,
//       experience,
//       city,
//       user_id
//     })
//   };
// }
export function addFreelancer(id) {
  return {
    type: ADD_FREELANCER,
    payload: axios.post(`/api/freelancer/${id}`)
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
    type: GET_FREELANCERS,
    payload: axios.get("/api/freelancers")
  };
}
export function getAllFreelancerInfo() {
  return {
    type: GET_ALL_FREELANCER_INFO,
    payload: axios.get("/api/all_freelancers")
  };
}

export function updateFreelancer(
  id,
  heading,
  bio,
  skills,
  experience,
  city,
  state
) {
  return {
    type: UPDATE_FREELANCER,
    payload: axios.put(
      `/api/freelancer/${id}`,
      heading,
      bio,
      skills,
      experience,
      city,
      state
    )
  };
}

export function addFreelancerPost(title, body, user_id, moment) {
  return {
    type: ADD_FREELANCER_POST,
    payload: axios.post("/api/freelancerPost/", {
      title,
      body,
      user_id,
      moment
    })
  };
}

export function getFreelancerPosts() {
  return {
    type: GET_FREELANCER_POSTS,
    payload: axios.get(`/api/freelancerPosts/`)
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
export function addFaveJob(employer_post_id, freelancer_id) {
  return {
    type: ADD_FAVE_JOB,
    payload: axios.post("/api/user/jobs", {
      employer_post_id,
      freelancer_id
    })
  };
}
export function getFaveJobs(id) {
  return {
    type: GET_FAVE_JOBS,
    payload: axios.get(`/api/user/jobs/${id}`)
  };
}
export function deleteFaveJob(empid, freeid) {
  return {
    type: DELETE_FAVE_JOB,
    payload: axios.delete(`/api/user/job/${empid}/${freeid}`)
  };
}

//initial state
const initialState = {
  freelancer: [],
  freelancers: [],
  allFreelancers: [],
  favJob: [],
  favJobs: [],
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
    case `${GET_ALL_FREELANCER_INFO}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_ALL_FREELANCER_INFO}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        allFreelancers: action.payload.data
      };
    case `${GET_ALL_FREELANCER_INFO}_REJECTED`:
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

    case `${GET_FREELANCER_POSTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FREELANCER_POSTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        freelancerPosts: action.payload.data
      };
    case `${GET_FREELANCER_POSTS}_REJECTED`:
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

    case `${ADD_FAVE_JOB}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_FAVE_JOB}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        favJob: action.payload.data
      };
    case `${ADD_FAVE_JOB}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${GET_FAVE_JOBS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FAVE_JOBS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        favJobs: action.payload.data
      };
    case `${GET_FAVE_JOBS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case `${DELETE_FAVE_JOB}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${DELETE_FAVE_JOB}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        favJobs: action.payload.data
      };
    case `${DELETE_FAVE_JOB}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
