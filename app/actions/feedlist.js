import * as types from './types'
import {
  performLoadFeedTask,
  performLoadProfileTask,
  performLoadFeedWithNoGeo,
  performSaveFilterSettings } from '../lib/scoopAPI'


// Make async call to the web service to retrieve the user specific information
export function fetchUser(targetId){
  return (dispatch, getState) => {
    dispatch(setLoadingUserStatus(true))
    performLoadProfileTask(targetId).then((results) => {
      const response = results.userInfo
      dispatch(viewProfile({user_information:response}))
      dispatch(setLoadingUserStatus(false))
    })
  }
}


export function reloadMatches(match_attributes){
  return(dispatch, getState) => {
    let lon = getState().currentLocation.lon
    let lat = getState().currentLocation.lat
    performLoadFeedTask(579, 'bdvvqtctgs', lon, lat).then((results) => {
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

    performLoadFeedTask(579, 'bdvvqtctgs', lon, lat).then((results) => {
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
