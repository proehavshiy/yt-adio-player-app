/* eslint-disable object-shorthand */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
import { modeInitialState } from '../initialState';
import {
  MODE_RANDOM, MODE_LOOP, MODE_TRACK_DURATION, MODE_TRACK_CURRENT_TIME,
  MODE_VOLUME,
} from '../actions/actions';

function modeReducer(state = modeInitialState, action) {
  const {
    type, duration, currentTime, currVolume, prevVolume,
  } = action;
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
    case MODE_TRACK_DURATION:
      return {
        ...state,
        currTrackData: {
          ...state.currTrackData,
          trackDuration: duration,
        },
      };
    case MODE_TRACK_CURRENT_TIME:
      return {
        ...state,
        currTrackData: {
          ...state.currTrackData,
          currentTime,
        },
      };
    case MODE_VOLUME:
      return {
        ...state,
        volume: {
          ...state.volume,
          current: currVolume,
          prev: prevVolume,
        },
      };
    default:
      return state;
  }
}

export default modeReducer;
