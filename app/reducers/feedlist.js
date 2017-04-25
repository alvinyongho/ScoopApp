import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

// reducer updates the state tree
export const foundMatches = createReducer({}, {
  [types.SET_FOUND_MATCHES](state, action){
    let newState = {}
    action.matches_found.forEach( (match) => {
      newState[match.id] = match
    });
    return newState
  }
});

export const matchCount = createReducer(0, {
  // Gets triggered when SET_FOUND_MATCHES is triggered
  [types.SET_FOUND_MATCHES](state, action){
    return action.matches_found.length;
  },
});
