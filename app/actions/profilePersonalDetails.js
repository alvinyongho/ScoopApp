import * as types from './types'

import {getEduExperience
} from '../services/facebook'


export function retrieveEduExperience() {
	return (dispatch,getState) => {
		// console.log('retrieving edu')
    fbId = getState().userProfile.facebookProfile.id
    getEduExperience(fbId).then((result)=>{
      // console.log("GOT USER")
      // console.log(result)
      eduBackground = result.education
      dispatch(gotEduBackground(eduBackground))
    })

	}
}


export function gotEduBackground(eduBackground){
  return{
    type: types.GOT_EDU_BACKGROUND,
    eduBackground
  }
}



export function setProfileSettingToSave(setting){
	return (dispatch, getState) => {
		console.log("setting profile setting to save")
		console.log(setting)
		dispatch(setPendingProfileChanges(setting))
	}
}


export function setPendingProfileChanges(setting){
	return {
		type: types.SET_PENDING_PROFILE_CHANGES,
		setting
	}
}
