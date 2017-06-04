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
    console.log(albumId)
    getFBAlbumPhotos(albumId)
    .then((albumContent)=>{
      console.log(albumContent.data)
      dispatch(setAlbumDetailImages(albumContent.data))
      dispatch(NavigationActions.navigate({ routeName:'AlbumContents' }))

    })
    // .then(()=>{
    //   // console.log('GETTING ALBUM DETAIL IMAGE URLS')
    //   // getAlbumDetailImageURLs()
    //
    // })


  }
}

export function getAlbumDetailImageURLs(){
  return(dispatch, getState) => {
    // console.log('GOT THE ALBUM DETAIL IMAGE URLS')
    // console.log(getState().myAlbumImages)
    getState().myAlbumImages.map((imageData, index)=>{
      getPictureUrlByPictureId(imageData.id).then((result)=>{
        // console.log('')
        // console.log('SETTING ALBUM DETAIL IMAGES URL')
        // dispatch(addAlbumDetailImageURL(index, result.picture))
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
    dispatch(NavigationActions.navigate({ routeName:'PicturePreview'}))
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
