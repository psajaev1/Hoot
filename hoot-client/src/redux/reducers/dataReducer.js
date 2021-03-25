// import {
//     SET_TODAYS_ACTIVITIES,
//     SET_ACTIVE_DAYS,
//   } from '../types';
  
//   const initialState = {
//     todaysActivities:[],
//     activeDays: [],
//     loading: false
//   };
  
//   export default function dataReducer(state = initialState, action) {
//     switch (action.type) {
//     //   case LOADING_DATA:
//     //     return {
//     //       ...state,
//     //       loading: true
//     //     };
//       case SET_TODAYS_ACTIVITIES:
//         return {
//           ...state,
//           todaysActivities: action.payload
//         };
//       case SET_ACTIVE_DAYS:
//         return {
//           ...state,
//           activeDays: action.payload
//         };
//       default:
//         return state;
//     }
//   }