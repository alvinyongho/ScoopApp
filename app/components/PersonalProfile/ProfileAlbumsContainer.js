'use strict';

import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Platform
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { NavigationActions } from 'react-navigation';


import EditPhotoAlbum from './EditPhotoAlbum'
import PhotoAlbum from './PhotoAlbum'


// This handles reloading the photo albums component. The logic is that
// since the data source for the albums is deep and difficult to keep track
// of, the most practical way of updating is to reload its state completely
// by repopulating it with the resulting order. Idealy re-setting the state
// variable with new images is the ideal solution but complications arise
// from having to update the view layout and block positions.
// By using a temporary state, any modifications on main picture state,
// myProfileImages, has to be sent to the ordered state.
// TLDR: The temporary order state: myAlbumsPicturesOrder
// is used prior to populating the main pictures state: myProfileImages


export class ProfileAlbumsContainer extends React.Component {
  constructor(props){
    super(props)
    this.acc = 0
    this.prevImages = this.props.myProfileImages
    this.state = {
      profileImages: this.props.myProfileImages,

    }
  }

  componentWillReceiveProps(nextProps){
    // Re-render by accumulating the key
    if(nextProps.myProfileImages.length !== this.prevImages.length
      && nextProps.myProfileImages.length > this.prevImages.length
      || this.props.albumImageState === "REPLACING_IMAGE"
    ){


      this.acc += 1
      this.renderPhotoAlbum(nextProps.myProfileImages, this.acc)
      this.setState({profileImages:nextProps.myProfileImages})
    }
    this.prevImages = nextProps.myProfileImages
    this.props.setViewingAlbumState()
  }

  convertItemOrderToImageArray(itemOrder){
    return itemOrder.map((item, index)=>{
      return item.imagesrc.uri
    })
  }

  mapImagesToArray(myProfileImages){
    // console.log("MAPPING IMAGES TO ARRAY")

    //TODO: handle init state (need to check what is initial value)
    if(!myProfileImages === {} || !myProfileImages === [])
      return []

    return myProfileImages.map((images, index)=>{
      return {imagesrc: {uri: images}}
    })


  }

  // Goto Import picture should take argument
  renderPhotoAlbum = (myProfileImages, acc) => {
    // console.log("RENDERING HAPPENING")
    if(Platform.OS === 'ios'){
      return (
        <View key={acc} style={{height: 480, backgroundColor: 'white'}}>
        <PhotoAlbum
            changeScrollState={this.props.changeScrollState}
            onFinishedDrag={(itemOrder)=>{
              this.props.syncOrderToPhotoAlbumOrder(itemOrder) // remove after adding a reset for order
              this.props.postProfileImages(this.convertItemOrderToImageArray(itemOrder))}}
            onShortPress={(key)=>this.props.GoToImportPicture(key)}
            profileImages={this.mapImagesToArray(myProfileImages)}
            onFinishedDelete={(itemOrder)=>{
              this.props.syncOrderToPhotoAlbumOrder(itemOrder)
              this.props.postProfileImages(this.convertItemOrderToImageArray(itemOrder))}}
        />
        </View>
      );
    } else {
      // Handle Android case
      return(
        <View style={{height: 550, backgroundColor: '#EEEEEE'}} >
        <PhotoAlbum changeScrollState={this.props.changeScrollState}
                    onFinishedDrag={(itemOrder)=>{
                      this.props.syncOrderToPhotoAlbumOrder(itemOrder) // remove after adding a reset for order
                      this.props.postProfileImages(this.convertItemOrderToImageArray(itemOrder))}}
                    onShortPress={(key)=>this.props.GoToImportPicture(key)}
                    profileImages={this.mapImagesToArray(myProfileImages)}
                    onFinishedDelete={(itemOrder)=>{
                      this.props.syncOrderToPhotoAlbumOrder(itemOrder)
                      this.props.postProfileImages(this.convertItemOrderToImageArray(itemOrder))}}
        />
        </View>
      );
    }
  }

  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    return (
      <View>
        {this.renderPhotoAlbum(this.state.profileImages, this.acc)}
      </View>
    )
  }

}

function mapStateToProps(state){
  return {
    myProfileImages: state.myProfileImages,
    albumImageState: state.albumImageState,
    // myProfileDetails: state.viewingProfileDetail,
    scoopUserId: state.scoopUserProfile.scoopId


  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(ProfileAlbumsContainer);
