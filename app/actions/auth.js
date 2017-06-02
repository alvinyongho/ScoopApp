import { facebookLoginAPI, getFacebookInfoAPI, facebookLogoutAPI } from '../services/facebook';
import * as types from './types'

import { getUserIdAndToken } from '../lib/scoopAPI'


export function facebookLogin() {
  return (dispatch) => {
    dispatch(loginRequest()); // Start the login request

    const successValues = [];
    facebookLoginAPI()  // Returns the AccessToken
    .then((facebookAuthResult) => {
      successValues.push(facebookAuthResult.accessToken)
      return getFacebookInfoAPI(facebookAuthResult.accessToken);
    })
    .then((facebookProfile) => {
      successValues.push(facebookProfile)
      dispatch(loginSuccess(...successValues))
    })
    .catch((error) => {
      dispatch(loginError(error));;
    });
  };
}


export function getScoopUserIdAndToken() {
  return (dispatch, getState) => {
    let fbId = getState().userProfile.facebookProfile.id
    // let fbId = 10211414919833392
    getUserIdAndToken(fbId).then((userCredentials) => {
      console.log(userCredentials)
      dispatch(getToken(userCredentials.userInfo.userId, userCredentials.userInfo.userToken));
    });
  }
}

export function facebookLogout() {
  facebookLogoutAPI()

  return (dispatch) => {
    dispatch(logout());
  }
}

export function getToken(userId, userToken) {
  return {
    type: types.GET_TOKEN,
    userId,
    userToken,
  }
}


// Delay login request to test
export function loginRequest(){
  return {
      type: types.LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false,
  }
}

export function loginSuccess(facebookToken, facebookProfile){
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    facebookToken,
    facebookProfile
  }
}

export function loginError(message){
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function logout(){
  return {
    type: types.LOGOUT,
    isAuthenticated: false
  }
}
