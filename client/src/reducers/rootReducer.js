import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entries from './entries.js';
import signUp from './signUp.js';
import user from './user.js';
import trends from './trends.js';

const rootReducer = combineReducers({
  entries,
  signUp,
  user,
  trends,
  router: routerReducer
});

export default rootReducer;
