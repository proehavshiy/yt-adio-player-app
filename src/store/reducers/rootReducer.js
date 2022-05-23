import { combineReducers } from 'redux';
import trackReducer from './trackReducer';
import modeReducer from './modeReducer';

const rootReducer = combineReducers({
  data: trackReducer,
  mode: modeReducer,
});

export default rootReducer;
