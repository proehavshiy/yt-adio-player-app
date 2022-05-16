import { combineReducers } from 'redux';
import trackReducer from './trackReducer';

const rootReducer = combineReducers({
  tracks: trackReducer,
});

export default rootReducer;
