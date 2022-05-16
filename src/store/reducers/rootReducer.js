import { combineReducers } from 'redux';
import trackReducer from './trackReducer';

const rootReducer = combineReducers({
  data: trackReducer,
});

export default rootReducer;
