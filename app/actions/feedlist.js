import * as types from './types'
import { performLoadFeedTask, performLoadProfileTask } from '../lib/scoopAPI'


// Make async call to the web service to retrieve the user specific information
export function fetchUser(targetId){
  return (dispatch, getState) => {

    dispatch(setLoadingUserStatus(true))
    performLoadProfileTask(targetId).then((results) => {
      // console.log("result of performing load profile task")
      // console.log(results.userInfo)
      const response = results.userInfo
      dispatch(viewProfile({user_information:response}))
      dispatch(setLoadingUserStatus(false))

    })
  }
}


// Make async call to the web service to get the list of matches that
// fit in the criterias defined by match attributes
export function fetchMatches(match_attributes){
  return(dispatch, getState) => {
    performLoadFeedTask(579, 'bdvvqtctgs').then((results) => {
      const response = results.users.map((user, index) => {
        return {
          id: user.userId,
          name: user.name,
          image: user.picURL,
          jobTitle: user.jobTitle
        }
      })
      dispatch(setFoundMatches( { matches_found: response } ));
    });
  }
}

// Set found matches takes in a payload of fetched matches (args) => args.matches_found
// input: matches found
// output: state with the type
export function setFoundMatches( { matches_found } ){
  return {
    type: types.SET_FOUND_MATCHES,
    matches_found
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
