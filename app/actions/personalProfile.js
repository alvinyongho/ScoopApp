import { getUserIdAndToken } from '../lib/scoopAPI'

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


export function getUserImages(images) {
  return {
    type: types.GET_MY_IMAGES,
    images,
  }
}
