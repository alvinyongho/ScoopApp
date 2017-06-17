import * as types from './types'
import {
  performLoadFeedTask,
  performLoadProfileTask,
  performLoadFeedWithNoGeo,
  performSaveFilterSettings,
  performLikeDislikeUser } from '../lib/scoopAPI'
import { NavigationActions } from 'react-navigation';



export function resetFeedRoutes(){
  return(dispatch)=>
  {
    dispatch(resetFeedRouteStack())
  }
}


export function resetFeedRouteStack(){
  return{
    type: types.RESET_FEED_ROUTE_STACK
  }
}


// Make async call to the web service to retrieve the user specific information
export function fetchUser(targetId){
  return (dispatch, getState) => {
    dispatch(setLoadingUserStatus(true))

    let scoopUserId = getState().scoopUserProfile.scoopId
    // console.log('THE SCOOP USER ID IS ' + scoopUserId)
    performLoadProfileTask(targetId, scoopUserId).then((results) => {
      const response = results.userInfo

      // console.log('fetched USER')
      // console.log(results["z-distance"])
      dispatch(viewProfile({user_information:response}))
      dispatch(setLoadingUserStatus(false))
    })
  }
}


export function getMyProfileInfo(){
  // console.log("GETTING MY PROFILE INFO")
  return (dispatch, getState) => {

    let scoopUserId = getState().scoopUserProfile.scoopId
    targetId = scoopUserId
    performLoadProfileTask(targetId, scoopUserId).then((results) => {
      const response = results.userInfo
      // console.log('THE RESPONSE IS')
      // console.log(response)

      dispatch(getMyProfile({user_information:response}))
      // console.log('fetched USER')
      // console.log(results["z-distance"])
      // dispatch(viewProfile({user_information:response}))
      // dispatch(setLoadingUserStatus(false))
    })
  }
}


export function reloadMatches(match_attributes){
  return(dispatch, getState) => {
    let lon = getState().currentLocation.lon
    let lat = getState().currentLocation.lat
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken
    performLoadFeedTask(scoopUserId, scoopUserToken, lon, lat).then((results) => {
      const response = results.users.map((user, index) => {
        return {
          id: user.userId,
          name: user.name,
          image: user.picURL,
          jobTitle: user.jobTitle
        }
      })
      dispatch(setFoundMatches( { matches_found: response, current_location: {lon, lat} } ));
    });
  }
}

// Make async call to the web service to get the list of matches that
// fit in the criterias defined by match attributes
export function fetchMatches(match_attributes){
  return(dispatch, getState) => {
    let lon = match_attributes.coords.longitude
    let lat = match_attributes.coords.latitude
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken
    performLoadFeedTask(scoopUserId, scoopUserToken, lon, lat).then((results) => {
      console.log("Performing load feed task")
      console.log('LOAD FEED RESULTS')
      console.log("LON : " + lon)
      console.log("LAT : " + lat)
      console.log(results)

      const response = results.users.map((user, index) => {
        return {
          id: user.userId,
          name: user.name,
          image: user.picURL,
          jobTitle: user.jobTitle
        }
      })
      dispatch(setFoundMatches( { matches_found: response, current_location: {lon, lat} } ));
    });
  }
}


export function toggleUserLikesTarget(isALike, userId){
  return(dispatch, getState) => {
    let likeBinaryValue = 0
    if(isALike){
      likeBinaryValue = 1
    } else {
      likeBinaryValue = 0
    }

    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken
    let notifyFrom = getState().myProfile.scoopApiStore.firstName
    let targetId = userId
    dispatch(removeFoundMatch(userId))


    performLikeDislikeUser(scoopUserId, scoopUserToken, likeBinaryValue, notifyFrom, targetId).then((result)=>{
      // console.log("RESULT")
      // console.log(result)
      if (result.status && result.status === "98"){
        console.log("You cannot like a user with 0 Scoops! Tap the Scoops tab to get more!")
      }
      if (result.status && result.status === "99"){
        console.log("You cannot like users while your profile is hidden")
      }
    })


  }
}


export function removeFoundMatch (userId){
  return {
    type: types.REMOVE_FOUND_MATCH,
    userId
  }
}



export function goToChatDetailFromFeed(){
  return(dispatch, getState)=> {
    dispatch(NavigationActions.navigate({ routeName: 'SendMessageFromFeed' }))
  }
}


// Set found matches takes in a payload of fetched matches (args) => args.matches_found
// input: matches found
// output: state with the type
export function setFoundMatches( { matches_found, current_location } ){
  return {
    type: types.SET_FOUND_MATCHES,
    matches_found,
    current_location
  }
}

export function addMatch() {
  return {
    type: types.ADD_MATCH,
  }
}

export function setLoadingUserStatus(is_loading){
  return {
    type: types.LOADING_USER,
    is_loading
  }
}

export function viewProfile( {user_information} ){
  return {
    type: types.VIEW_PROFILE,
    user_information
  }
}

export function getMyProfile( {user_information} ){
  return {
    type: types.GET_MY_PROFILE,
    user_information
  }
}
