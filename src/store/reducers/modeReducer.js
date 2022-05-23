/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
import { modeInitialState } from '../initialState';
import { MODE_RANDOM, MODE_LOOP } from '../actions/actions';

function modeReducer(state = modeInitialState, action) {
  const { type } = action;
  switch (type) {
    case MODE_RANDOM:
      return {
        ...state,
        isRandomMode: !state.isRandomMode,
      };
    case MODE_LOOP:
      return {
        ...state,
        isLoopedTrack: !state.isLoopedTrack,
      };
    default:
      return state;
  }
}

export default modeReducer;
