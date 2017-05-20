'use strict';

import React, {Component} from 'react'


import {
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';

import EditPhotoAlbum from './EditPhotoAlbum'
import PanningRectExample from './PanningRectExample'
import PhotoAlbum from './PhotoAlbum'


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

var ALBUM_WIDTH = 80;
var ALBUM_HEIGHT = 60;
var MARGIN = 20;

largeBoxHeight = (screenWidth/3)*2
largeBoxWidth = (screenWidth)
smallBoxHeight = screenWidth/3 - 20
smallBoxWidth = screenWidth/3


export default class EditProfileScrollView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isScrollEnabled: true
    }
  }

  changeScrollState = (isEnabled) => {
    this.setState({isScrollEnabled: isEnabled})
  }


  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    return (
      <ScrollView scrollEnabled={this.state.isScrollEnabled}>
        {/* <EditPhotoAlbum /> */}
        <PhotoAlbum changeScrollState={this.changeScrollState}
                            onFinishedDrag={(itemOrder)=>console.log(itemOrder)}
                            onShortPress={(key)=>console.log("handleShortPress for key: " + key)}
        />

      </ScrollView>
    )
  }

}
