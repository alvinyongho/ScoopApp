import * as types from './types'
import {performSetProfileHiddenTask} from '../lib/scoopAPI'

export function updatePrivacyState(hideProfile){
  return (dispatch, getState) => {
    console.log("POST PRIVACY STATE")
    console.log(`hideProfile: ${hideProfile}`)

    isHidden = hideProfile ? 1 : 0

    userId = getState().scoopUserProfile.scoopId
    userToken = getState().scoopUserProfile.scoopToken

    performSetProfileHiddenTask(userId, userToken, isHidden).then((result)=>{
      console.log(result)
      if(result.status !== "1"){
        // TODO: Handle error
        console.log("ERROR. TODO HANDLE ERROR")
      }

      dispatch(setUserPrivacyState(hideProfile))

    })
  }
}


export function setUserPrivacyState(isHidden){
  return{
    type: types.SET_USER_PRIVACY,
    isHidden
  }
}
