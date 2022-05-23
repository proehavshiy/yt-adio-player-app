/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(logger),
  ),
);

console.log('store:', store.getState());

export default store;
