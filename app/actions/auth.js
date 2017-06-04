import {
  facebookLoginAPI,
  getFacebookInfoAPI,
  facebookLogoutAPI,
  callFacebookGraphAPIForUserAlbums,
  getFBAlbumPhotos,
  getFBAlbumCover,
  getPictureUrlByPictureId,
  getFBAlbumPicture } from '../services/facebook';
import * as types from './types'

import { getUserIdAndToken } from '../lib/scoopAPI'


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


export function getAlbumCovers(){
  return (dispatch, getState) =>{
    const albums = getState().myFacebookAlbums.map((item, index)=>{
      return {id: item.id, name: item.name}
    })

    albums.map((album, index)=>{
      getFBAlbumCover(album.id)
      .then((result)=>{
        albumId = album.id
        coverId = result.cover_photo.id
        albumDescription = album.name
        dispatch(addFBAlbumIDs(albumId, albumDescription, coverId))
      })

    })

    albums.map((album, index)=>{
      coverPhotoId = 0
      getFBAlbumPhotos(album.id)
      .then((result)=>{
        coverPhotoId = result.data[0].id

      })
      .then(()=>{
        getPictureUrlByPictureId(coverPhotoId).then((result)=>{
          dispatch(addFBAlbumCoverURL(album.id, result.picture))
        })
      })

    })

  }
}



export function getImageURLById(imageId){
  return(dispatch, getState)=>{

    // console.log('@@@@@ GETTING IMAGE BY ID')
    // console.log(imageId)
    getPictureUrlByPictureId(imageId).then((image)=>{
      // console.log("ADDING COVER")
      // console.log(image.picture)
    })
  }
    // dispatch(addFBAlbumCoverURL(albumId, cover.picture))
    // return cover.picture
}



export function populateFacebookAlbums() {
  return (dispatch, getState) => {

    let albumId = "1588875886507"

    getFBAlbumPhotos(albumId).then((result)=>{

      // TODO
      // console.log('@@@@@@@')
      // console.log(result)
    })

    // dispatch(populateAlbumContents(albumContents))

  }
}


export function populateAlbumContents(albumContents){
  return {
    type: types.POPULATE_ALBUMS,
    albumContents
  }
}


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
