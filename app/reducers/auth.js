import { combineReducers } from 'redux'
import * as types from '../actions/types';


function authReducer(state = [], action){
  switch(action.type) {
    case types.LOGIN_REQUEST:
      return [
        ...state,
        {
          loginStatusMessage: 'Logging in...',
        }
      ]
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        facebookToken: action.facebookToken,
        facebookProfile: action.facebookProfile,
      });
    case types.LOGIN_FAILURE:
    return [
      ...state,
      {
        message: action.loginError.message,
      }
    ]
    case types.LOGOUT:
    return [
      ...state,
      {
        logoutMessage: 'Successfully logged out',
      }
    ]
    default:
      return state
  }
}

export default authReducer
