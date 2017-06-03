import { getUserIdAndToken, performSaveMyProfileImages } from '../lib/scoopAPI'
import { NavigationActions } from 'react-navigation';

import * as types from './types'


export function getScoopUserImages(){
  return (dispatch, getState) => {
    let fbId = getState().userProfile.facebookProfile.id
    // let fbId = 10211414919833392
    getUserIdAndToken(fbId).then((result) => {
      console.log('THE RESULT@@@@')
      console.log(result.userInfo.images)
      dispatch(getUserImages(result.userInfo.images));
    });
  }
}

export function postProfileImages(imageArray){
  return(dispatch, getState) => {
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken

    console.log('THE IMAGE ARRAY')
    console.log(imageArray)
    performSaveMyProfileImages(scoopUserId, scoopUserToken, imageArray).then((result) =>{
      console.log('set my images')
      console.log(result.userInfo.images)
      dispatch(setUserImages(result.userInfo.images))
    })

  }
}


export function GoToImportPicture(key){
  return(dispatch) => {
    dispatch(NavigationActions.navigate({ routeName:'ImportPicture' }))
  }
}

export function setUserImages(images) {
  return {
    type: types.SET_MY_IMAGES,
    images,
  }
}

export function getUserImages(images) {
  return {
    type: types.GET_MY_IMAGES,
    images,
  }
}
