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
//initial state

//reducer
