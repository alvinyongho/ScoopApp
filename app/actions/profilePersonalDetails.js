import * as types from './types'

import {getEduExperience
} from '../services/facebook'

import {performSaveMyProfileAccordianSettings} from '../lib/scoopAPI'


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


export function setProfileSettingToSave(setting){
	// input is {setting_type: setting_value}
	return (dispatch, getState) => {
		dispatch(setPendingProfileChanges(setting))
	}
}


export function saveChangesToAPI(){
	return (dispatch, getState) => {
		console.log("save changes to api")
		const pendingChanges = getState().myProfile.pendingChanges
		const scoopUserId = getState().scoopUserProfile.scoopId
    const scoopUserToken = getState().scoopUserProfile.scoopToken



		// console.log(pendingChanges)
		performSaveMyProfileAccordianSettings(scoopUserId, scoopUserToken, pendingChanges)



	}
}


export function setPendingProfileChanges(setting){
	return {
		type: types.SET_PENDING_PROFILE_CHANGES,
		setting
	}
}


export function gotEduBackground(eduBackground){
  return{
    type: types.GOT_EDU_BACKGROUND,
    eduBackground
  }
}
