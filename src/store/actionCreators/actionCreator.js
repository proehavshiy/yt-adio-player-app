import { TRACK_NEXT, TRACK_PREV } from '../actions/actions';

function nextTrack() {
  return {
    type: TRACK_NEXT,
  };
}

function prevTrack() {
  return {
    type: TRACK_PREV,
  };
}

export { nextTrack, prevTrack };

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
