/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
import initialState from '../initialState';

function trackReducer(state = initialState, action) {
  return state;
}

export default trackReducer;

// function counterReducer(state = initialValue, action) {
//   switch (action.type) {
//     case INCREMENT:
//       return {
//         ...state,
//         value: state.value + action.payload,
//       };
//     case DECREMENT:
//       return {
//         ...state,
//         value: state.value - action.payload,
//       };
//     default:
//       return state;
//   }
// }
