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


export function resetAlbumImagePreview(){
  return (dispatch, getState) =>{
    dispatch(resetImagePreview())
  }
}


///TODO
export function postProfileImages(imageArray){

  console.log("POSTING PROFILE IMAGES WITH IMAGE ARRAY")
  console.log(imageArray)
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

      myProfileImagesArray[slotIndexToImportInto] = imageURL

      // dispatch(setUserImages(myProfileImagesArray))
      // save my picture to ordered index

      // 
      // const resetAction = NavigationActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({ routeName: 'Profile'})
      //   ]
      // })
      //
      // dispatch(resetAction)




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

export function exitAlbumDetailActionCreator(){
  return(dispatch, getState)=>{
    dispatch(exitAlbumDetail())
  }
}

export function GoToImportPicture(key){
  return(dispatch, getState) => {

    // if(key==undefined || key == null) dispatch(importPicture("undefined"))
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
//
// export function updateAlbumPhotos(imagesArray){
//   console.log('updating album photos')
//   console.log(imagesArray)
//   return {
//     type: types.SET_MY_IMAGES,
//     imagesArray
//   }
// }
