import { getUserIdAndToken, performSaveMyProfileImages } from '../lib/scoopAPI'
import { NavigationActions } from 'react-navigation';
import {  getFBAlbumPhotos, getPictureUrlByPictureId
} from '../services/facebook'
import * as types from './types'

import {resetFeedRoutes} from './feedlist'

export function getScoopUserImages(){
  return (dispatch, getState) => {

    console.log("GET SCOOP USER IMAGES")
    let fbId = getState().userProfile.facebookProfile.id
    // let fbId = 10211414919833392
    getUserIdAndToken(fbId).then((result) => {
      if(result.userInfo.images == undefined){
        console.log("HANDLE THE UNDEFINED USER IMAGES CASE AND UPDATE A TOGGLE TO CHANGE THE VIEW: EDIT MY PROFILE")
        console.log("EDIT_MY_PROFILE VIEW STATUS SHOULD BE: INFORM USER TO ADD AN IMAGE")
        return
      }

      dispatch(getUserImages(result.userInfo.images));
    });
  }
}


export function resetAlbumImagePreview(){
  return (dispatch, getState) =>{
    dispatch(resetImagePreview())
  }
}


export function postProfileImages(imageArray){
  return(dispatch, getState) => {
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken


    // Set in API
    performSaveMyProfileImages(scoopUserId, scoopUserToken, imageArray).then((result) =>{
      dispatch(setUserImages(result.userInfo.images))
      return result.userInfo.images
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


export function GetImageToPreview(){
  return(dispatch, getState) => {
    getPictureUrlByPictureId(getState().albumDetails.albumToSave.id).then((result)=>{
      dispatch(setImageURLToPreview(result.images[0].source))
    })
  }
}


export function saveMyPictureToPhotoAlbum(){
  return(dispatch, getState) => {
    // getPictureUrlByPictureId(getState().albumDetails.albumToSave.id).then((result)=>{
      imageURL              = getState().albumDetails.albumToPreview
      myProfileImagesArray  = getState().myProfileImages
      slotIndexToImportInto = getState().importPictureIntoSlot


      isInitialImage = getState().myProfileImages.length === 0

      if(isInitialImage){

        console.log('handle initial image')
        console.log(imageURL)
        console.log(myProfileImagesArray)
        console.log(slotIndexToImportInto)
        dispatch(appendToMyPictureOrder(imageURL))
        dispatch(setUserImages(getState().myAlbumPicturesOrder))
        dispatch(resetMyProfileNav())



      } else {

        if(getState().importPictureIntoSlot.elementKey === undefined){
          dispatch(appendToMyPictureOrder(imageURL))
          dispatch(setUserImages(getState().myAlbumPicturesOrder))

        } else {
          // console.log("handle replace case")
          dispatch(setAlbumImageAtIndex(getState().importPictureIntoSlot.elementKey, imageURL))
          dispatch(setUserImages(getState().myAlbumPicturesOrder))
          dispatch(replacingImage())

        }
        dispatch(resetMyProfileNav())
      }
  }
}



// Resulting state from set pictures
export function syncOrderToPhotoAlbumOrder(itemOrder){
  return(dispatch, getState) => {

    images = itemOrder.map((imageFormat, key)=>{
      return imageFormat.imagesrc.uri
    })

    dispatch(syncWithPhotoAlbumOrder(images))
  }
}

export function syncWithPhotoAlbumOrder(images){
  return {
    type: types.SYNC_WITH_PHOTO_ALBUM_ORDER,
    images
  }
}

export function getAlbumDetailImageURLs(){
  return(dispatch, getState) => {
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



export function PreviewProfile(){
  return(dispatch, getState) => {
    dispatch(NavigationActions.navigate({ routeName: 'PreviewProfile' }))


    // Reset the feedlist view
    dispatch(resetFeedRoutes())
  }
}



export function exitAlbumDetailActionCreator(){
  return(dispatch, getState)=>{
    dispatch(exitAlbumDetail())
  }
}

export function GoToImportPicture(key){
  return(dispatch, getState) => {
    console.log("Going to import picture at key")
    console.log(key)
    dispatch(importPicture(key))
    dispatch(NavigationActions.navigate({ routeName:'ImportPicture' }))
  }
}

export function navigateToPhotoPreviewScreen(photoId){
  return(dispatch, getState) => {
    dispatch(setAlbumImageIDToSave(photoId))
    dispatch(NavigationActions.navigate({ routeName:'PicturePreview'}))
  }
}

export function setViewingAlbumState(){
  return(dispatch)=>{
    dispatch(viewingAlbum())
  }
}

export function resetProfileTabRouterAC(){
  return (dispatch, getState) => {
    dispatch(resetMyProfileNav());
  }
}

export function setImageURLToSave(url){
  return{
    type: types.SET_IMAGE_URL_TO_SAVE,
    url
  }
}

export function setImageURLToPreview(url){
  return{
    type: types.SET_IMAGE_URL_TO_PREVIEW,
    url
  }
}

export function setAlbumImageIDToSave(photoId){
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

export function resetImagePreview(){
  console.log("RESETTING ALBUM CONTENT")
  return {
    type: types.RESET_ALBUM_IMAGE_PREVIEW
  }
}

export function appendToMyPictureOrder(imageURL){
  return {
    type: types.APPEND_TO_MY_PICTURE_ORDER,
    imageURL
  }

}

export function resetMyProfileNav(){
  return {
    type: types.RESET_MY_PROFILE_NAV,
  }
}

export function setAlbumImageAtIndex(index, imageURL){
  return{
    type: types.ALBUM_SET_IMAGEURL_AT_INDEX,
    index,
    imageURL
  }
}


export function replacingImage(){
  return{
    type: types.REPLACING_IMAGE
  }
}

export function viewingAlbum(){
  return{
    type: types.VIEWING_ALBUM
  }
}
