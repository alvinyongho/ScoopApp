import {
  facebookLoginAPI,
  getUserInfoForFirstTimeUser,  // Additional params
  getFacebookInfoAPI,
  facebookLogoutAPI,
  callFacebookGraphAPIForUserAlbums,
  getFBAlbumPhotos,
  getFBAlbumCover,
  getPictureUrlByPictureId,
  getFBAlbumPicture } from '../services/facebook';
import * as types from './types'

import { getUserIdAndToken, performLoginRegisterUsingFields } from '../lib/scoopAPI'


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

export function getUserAlbums() {
  return (dispatch, getState) =>{
    let fbId = getState().userProfile.facebookProfile.id

    callFacebookGraphAPIForUserAlbums(fbId).then((result)=>{
      dispatch(albumRetrievalSuccess(result.data))
    })
  }
}


// This performs initial user profile information
export function initialLoginRegisterUserTaskCall(){
  return (dispatch, getState) =>{
    let fbId = getState().userProfile.facebookProfile.id
    let accessToken = getState().userProfile.facebookToken

    console.log("THE FACEBOOK ID")
    console.log(fbId)
    console.log("THE ACCESS TOKEN")
    console.log(accessToken)

    userInfoResult = {
      aboutMe: "",
      birthday: "0000-00-00 00:00:00",
      education: "",
      facebookId: fbId,
      firstName: "",
      lastName: "",
      picURL: "",
      task: "loginRegister",
      work: "",
      z: "scoo"
    }

    getUserInfoForFirstTimeUser(accessToken).then((result)=>{
      console.log("HANDLING FIRST TIME USER FUNCTION")
      if(result.about)
        userInfoResult.aboutMe    = result.about
      if(result.first_name)
        userInfoResult.firstName  = result.first_name
      if(result.last_name)
        userInfoResult.lastName   = result.last_name
      if(result.birthday)
        userInfoResult.birthday   = result.birthday
      if(result.gender)
        userInfoResult.gender     = result.gender
      if(result.relationship_status)
        userInfoResult.relationship_status = result.relationship_status
      if(result.education)
        userInfoResult.education  = result.education
      if(result.work)
        userInfoResult.work       = result.work

      return ({userInfoResult, accessToken})
    })
    .then((result)=>{
      performLoginRegisterUsingFields(fbId, result.accessToken, result.userInfoResult).then((userCredentials)=>{
        console.log("LOGIN RESULT")
        console.log(userCredentials)
        dispatch(getToken(userCredentials.userInfo.userId, userCredentials.userInfo.userToken));

      })
    })

  }
}



export function getAlbumCovers(){
  return (dispatch, getState) =>{

    let fbId = getState().userProfile.facebookProfile.id
    callFacebookGraphAPIForUserAlbums(fbId)
    .then((result)=>{
      dispatch(albumRetrievalSuccess(result.data))
      return result.data
    })
    .then((albumIds)=>{
      // Extract the raw cover ids from the api call
      return raw_album_ids = albumIds.map((album, index)=>{
        return (album.id)
      })
    })
    .then((raw_ids)=>{
      raw_ids.map((id, index)=>{
        console.log(id)
        //Get album cover photo by album id
        coverPhotoId = 0
        getFBAlbumPhotos(id).then((result)=>{
            coverPhotoId = result.data[0].id
            albumId = id
            albumOrderIndex = index
            dispatch(setCoverPhotoIds(albumOrderIndex, albumId, coverPhotoId))
        })
        .then(()=>{
          getPictureUrlByPictureId(coverPhotoId).then((result)=>{
            dispatch(addFBAlbumCoverURL(index, result.picture))
          })
        })
      })
    })


  }
}



export function getImageURLById(imageId){
  return(dispatch, getState)=>{
    getPictureUrlByPictureId(imageId).then((image)=>{
    })
  }
}
//
//
// export function populateFacebookAlbums() {
//   return (dispatch, getState) => {
//
//     let albumId = "1588875886507"
//
//     getFBAlbumPhotos(albumId).then((result)=>{
//
//       // TODO
//       // console.log('@@@@@@@')
//       // console.log(result)
//     })
//
//     // dispatch(populateAlbumContents(albumContents))
//
//   }
// }


export function setCoverPhotoIds(albumOrderIndex, albumId, coverPhotoId){
  console.log(`setting cover photo ids with ${albumOrderIndex}`)

  return {
    type: types.SET_COVER_PHOTO_IDS,
    albumOrderIndex,
    albumId,
    coverPhotoId
  }
}

//
// export function populateAlbumContents(albumContents){
//   return {
//     type: types.POPULATE_ALBUMS,
//     albumContents
//   }
// }


export function addFBAlbumIDs(albumId, albumName, coverURL){
  return {
    type: types.ADD_ALBUM_IDS,
    albumId,
    albumName,
    coverId
  }
}


export function addFBAlbumCoverURL(albumId, coverURL){
  console.log('adding fbalbum cover url')
  return {
    type: types.ADD_ALBUM_COVER_URL,
    albumId,
    coverURL
  }
}


export function getScoopUserIdAndToken() {
  return (dispatch, getState) => {
    let fbId = getState().userProfile.facebookProfile.id
    // let fbId = 10211414919833392
    getUserIdAndToken(fbId).then((userCredentials) => {
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



export function albumRetrievalSuccess(albums){
  return {
    type: types.GOT_MY_ALBUMS,
    albums
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
