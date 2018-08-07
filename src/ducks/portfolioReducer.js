import axios from 'axios';

//constants
const ADD_PORTFOLIO = 'ADD_PORTFOLIO';
const GET_PORTFOLIO = 'GET_PORTFOLIO';
const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
const DELETE_PORTFOLIO = 'DELETE_PORTFOLIO';

//action creators
export function addPortfolio() {
  return {
    type: ADD_PORTFOLIO,
    payload: axios.post('/api/portfolio', {
      image_url
    })
  };
}
export function getPortfolio(id) {
  return {
    type: GET_PORTFOLIO,
    payload: axios.get(`/api/portfolio/${id}`)
  };
}
export function updatePortfolio(id, image_url) {
  return {
    type: UPDATE_PORTFOLIO,
    payload: axios.put(`/api/portfolio/${id}`, image_url)
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
  error: ''
};
//reducer
