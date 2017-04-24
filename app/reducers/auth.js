import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const isAuthenticated = createReducer(false,{
  [types.LOGIN_SUCCESS](state, action){
    return true
  }
});

export const userProfile = createReducer({},{
  [types.LOGIN_SUCCESS](state, action){
    let profile = {
      facebookToken: action.facebookToken,
      facebookProfile: action.facebookProfile,
    }

    return profile
  }
});


//
// function authReducer(state = [], action){
//   switch(action.type) {
//     case types.LOGIN_REQUEST:
//       return [
//         ...state,
//         {
//           loginStatusMessage: 'Logging in...',
//         }
//       ]
//     case types.LOGIN_SUCCESS:
//       return [
//         ...state,
//         {
//           facebookToken: action.facebookToken,
//           facebookProfile: action.facebookProfile,
//         }
//       ]
//     case types.LOGIN_FAILURE:
//     return [
//       ...state,
//       {
//         message: action.loginError.message,
//       }
//     ]
//     case types.LOGOUT:
//     return [
//       ...state,
//       {
//         logoutMessage: 'Successfully logged out',
//       }
//     ]
//     default:
//       return state
//   }
// }
//
// export default authReducer
