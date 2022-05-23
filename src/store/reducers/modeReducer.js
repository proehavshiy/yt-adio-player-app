/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
import { randomModeInitialState } from '../initialState';
import { MODE_RANDOM } from '../actions/actions';

function modeReducer(state = randomModeInitialState, action) {
  const { type } = action;
  switch (type) {
    case MODE_RANDOM:
      return {
        ...state,
        isRandomMode: !state.isRandomMode,
      };
    default:
      return state;
  }
}

export default modeReducer;
