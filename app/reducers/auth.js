import { combineReducers } from 'redux'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/auth';

function authReducer(state= [], action){
  switch(action.type) {
    case LOGIN_REQUEST:
      return [
        ...state,
        {
          loginStatusMessage: 'Logging in...',
        }
      ]
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        facebookToken: action.facebookToken,
        facebookProfile: action.facebookProfile,
      });
    case LOGIN_FAILURE:
    return [
      ...state,
      {
        message: action.loginError.message,
      }
    ]
    case LOGOUT:
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
