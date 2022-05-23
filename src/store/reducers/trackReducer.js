import { tracksInitialState } from '../initialState';
import { TRACK_NEXT, TRACK_PREV, TRACK_NEXT_IN_SEQUENCE } from '../actions/actions';
import getRandomNextSong from '../../utils/getRandomNextSong';
import getNextVal from '../../utils/getNextVal';

function trackReducer(state = tracksInitialState, action) {
  const { type, isRandom } = action;

  switch (type) {
    case TRACK_NEXT:
      if (isRandom) return getRandomNextSong(state, 'currIndex');
      return getNextVal(state, 'currIndex');

    case TRACK_PREV:
      if (isRandom) return getRandomNextSong(state, 'currIndex');
      return getNextVal(state, 'currIndex', false);

    case TRACK_NEXT_IN_SEQUENCE:
      return getNextVal(state, 'nextIndexInSequence');
    default:
      return state;
  }
}

export default trackReducer;
