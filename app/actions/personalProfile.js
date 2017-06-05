import { getUserIdAndToken, performSaveMyProfileImages } from '../lib/scoopAPI'
import { NavigationActions } from 'react-navigation';
import {  getFBAlbumPhotos, getPictureUrlByPictureId
} from '../services/facebook'
import * as types from './types'


export function getScoopUserImages(){
  return (dispatch, getState) => {
    let fbId = getState().userProfile.facebookProfile.id
    // let fbId = 10211414919833392
    getUserIdAndToken(fbId).then((result) => {
      dispatch(getUserImages(result.userInfo.images));
    });
  }
}


export function postProfileImages(imageArray){
  return(dispatch, getState) => {
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken

    performSaveMyProfileImages(scoopUserId, scoopUserToken, imageArray).then((result) =>{
      dispatch(setUserImages(result.userInfo.images))
    })
  }
}


export function GoToAlbumContents(albumId){
  return(dispatch, getState) => {
    getFBAlbumPhotos(albumId)
    .then((albumContent)=>{
      dispatch(setAlbumDetailImages(albumContent.data))
      dispatch(NavigationActions.navigate({ routeName:'AlbumContents' }))
    })
  }
}


export function saveMyPictureToPhotoAlbum(){
  return(dispatch, getState) => {
    getPictureUrlByPictureId(getState().albumDetails.albumToSave.id).then((result)=>
      console.log(result.images[0].source)
      dispatch(setImageURLToSave(result.images[0].source))

    )

  }
}


export function getAlbumDetailImageURLs(){
  return(dispatch, getState) => {
    // console.log('GOT THE ALBUM DETAIL IMAGE URLS')
    // console.log(getState().myAlbumImages)
    getState().myAlbumImages.map((imageData, index)=>{
      getPictureUrlByPictureId(imageData.id).then((result)=>{
        return result.picture
      })
      .then((pictureURL)=>{
        dispatch(addAlbumDetailImageURL(index, pictureURL))
      })
    })
  }
}

export function exitAlbumDetailActionCreator(){
  return(dispatch, getState)=>{
    dispatch(exitAlbumDetail())
  }
}



export function GoToImportPicture(key){
  console.log("GOING TO IMPORT PICTURE WITH KEY " + key)
  return(dispatch, getState) => {

    if(key==undefined || key == null) dispatch(importPicture("undefined"))
    else     dispatch(importPicture(key))

    dispatch(NavigationActions.navigate({ routeName:'ImportPicture' }))
  }
}

export function navigateToPhotoPreviewScreen(photoId){
  return(dispatch, getState) => {
    console.log('the photo selected was ' + photoId)
    dispatch(setAlbumImageToSave(photoId))
    dispatch(NavigationActions.navigate({ routeName:'PicturePreview'}))
  }
}


export function setImageURLToSave(url){
  return{
    type: types.SET_IMAGE_URL_TO_SAVE,
    url
  }
}


export function setAlbumImageToSave(photoId){
  return{
    type: types.SET_ALBUM_IMAGE_TO_SAVE,
    photoId
  }
}


export function setAlbumDetailImages(albumImages){
  return{
    type: types.SET_ALBUM_DETAIL_IMAGES,
    albumImages
  }
}

export function exitAlbumDetail(){
  return{
    type: types.EXIT_ALBUM_DETAIL
  }
}

export function addAlbumDetailImageURL(index, albumImageURL){

  // console.log('setting album detail images')
  // console.log(index)
  // console.log(albumImagesURL)
  return{
    type: types.ADD_ALBUM_DETAIL_IMAGES_URL,
    index,
    albumImageURL
  }
}

export function importPicture(albumSlot){
  return{
    type: types.IMPORT_PICTURE,
    albumSlot
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
