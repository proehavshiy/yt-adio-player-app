/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
import initialState from '../initialState';
import { TRACK_NEXT, TRACK_PREV } from '../actions/actions';

function trackReducer(state = initialState, action) {
  switch (action.type) {
    case TRACK_NEXT:
      if (state.currIndex === state.tracks.length - 1) {
        return {
          ...state,
          currIndex: 0,
        };
      }
      return {
        ...state,
        currIndex: state.currIndex + 1,
      };
    case TRACK_PREV:
      if (state.currIndex === 0) {
        return {
          ...state,
          currIndex: state.tracks.length - 1,
        };
      }
      return {
        ...state,
        currIndex: state.currIndex - 1,
      };
    default:
      return state;
  }
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
