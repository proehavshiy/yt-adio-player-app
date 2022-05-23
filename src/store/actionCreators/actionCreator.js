/* eslint-disable object-shorthand */
import {
  TRACK_NEXT, TRACK_PREV, TRACK_NEXT_IN_SEQUENCE, MODE_RANDOM, MODE_LOOP,
  MODE_TRACK_DURATION,
  MODE_TRACK_CURRENT_TIME,
} from '../actions/actions';

function nextTrack(isRandom = false) {
  return {
    type: TRACK_NEXT,
    isRandom: isRandom,
  };
}

function prevTrack(isRandom = false) {
  return {
    type: TRACK_PREV,
    isRandom: isRandom,
  };
}

function nextTrackInSequence() {
  return {
    type: TRACK_NEXT_IN_SEQUENCE,
  };
}

function switchChangingTrackMode() {
  return {
    type: MODE_RANDOM,
  };
}

function switchLoopTrackMode() {
  return {
    type: MODE_LOOP,
  };
}

function setTrackDuration(duration = 0) {
  return {
    type: MODE_TRACK_DURATION,
    duration,
  };
}
function setCurrentTrackTime(currentTime = 0) {
  return {
    type: MODE_TRACK_CURRENT_TIME,
    currentTime,
  };
}

export {
  nextTrack, prevTrack, nextTrackInSequence, switchChangingTrackMode, switchLoopTrackMode,
  setTrackDuration, setCurrentTrackTime,
};

// export function incrementCounter(payload) {
//   return {
//     type: INCREMENT,
//     payload,
//   };
// }
// export function decrementCounter(payload) {
//   return {
//     type: DECREMENT,
//     payload,
//   };
// }
