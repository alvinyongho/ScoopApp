import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedScoops = createReducer({}, {

});

export const matchCount = createReducer(0, {
  [types.ADD_MATCH](state, action){
    return state+1;
  }
})
