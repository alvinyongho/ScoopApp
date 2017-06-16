import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';


// reducer updates the state tree
export const foundMatches = createReducer({}, {
  [types.SET_FOUND_MATCHES](state, action){
    let newState = {}
    action.matches_found.forEach( (match) => {
      newState[match.id] = match
    });
    return newState
  },
  [types.REMOVE_FOUND_MATCH](state, action){
    var key = action.userId
    return update(state, {
      [key]: {$set: undefined}
    })
  }




});

export const currentLocation = createReducer({}, {
  [types.SET_FOUND_MATCHES](state, action){
    return action.current_location;
  }
})

// Updates the counter for number of matches based on action
export const matchCount = createReducer(0, {
  // Gets triggered when SET_FOUND_MATCHES is triggered
  [types.SET_FOUND_MATCHES](state, action){
    return action.matches_found.length;
  },
});

// Sets the state variable profile detail to the retrieved user information
export const viewingProfileDetail = createReducer({}, {
  [types.VIEW_PROFILE](state, action){
    return action.user_information;
  }
})


export const isLoadingUser = createReducer(true, {
  [types.LOADING_USER](state, action){
    return action.is_loading;
  }
})
