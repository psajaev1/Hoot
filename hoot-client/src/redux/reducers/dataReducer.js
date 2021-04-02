import {
    SET_ALL_USERS,
    SET_ALL_POSTS
  } from '../types';
  
  const initialState = {
    allUsers: [],
    allPosts: [],
  };
  
  export default function dataReducer(state = initialState, action) {
    switch (action.type) {
      case SET_ALL_USERS:
        return {
          ...state,
          allUsers: action.payload
        };
      case SET_ALL_POSTS:
        return {
          ...state,
          allPosts: action.payload
        };
      default:
        return state;
    }
  }