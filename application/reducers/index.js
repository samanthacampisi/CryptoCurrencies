import { combineReducers } from 'redux';

import CoinsReducer from './CoinsReducer';

const appReducer = combineReducers({
  CoinsReducer,
});

export default (state, action) => appReducer(state, action);
