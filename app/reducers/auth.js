import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const loginStatus = createReducer({},{
  [types.LOGIN_REQUEST](state, action){
    return {message: 'Logging in...'}
  },
  [types.LOGIN_SUCCESS](state, action){
    return{message: 'Logged in!'}
  },
  [types.LOGOUT](state,action){
    return {message: 'Logged out'}
  }
});


export const isAuthenticated = createReducer(false,{
  [types.LOGIN_SUCCESS](state, action){
    return true
  },
  [types.LOGOUT](state, action){
    return false
  }
});

export const userProfile = createReducer({},{
  [types.LOGIN_SUCCESS](state, action){
    let profile = {
      facebookToken: action.facebookToken,
      facebookProfile: action.facebookProfile,
    }
    return profile
  },
  [types.LOGOUT](state, action){
    return {}
  }

});
