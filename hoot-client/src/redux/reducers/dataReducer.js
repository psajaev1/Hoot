import {
    SET_ALL_USERS,
  } from '../types';
  
  const initialState = {
    allUsers: [],
  };
  
  export default function dataReducer(state = initialState, action) {
    switch (action.type) {
      case SET_ALL_USERS:
        return {
          ...state,
          allUsers: action.payload
        };
      default:
        return state;
    }
  }