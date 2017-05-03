'use strict';

import React, {Component} from 'react'


import {
  View,
  Text,
  ScrollView
} from 'react-native';

import EditPhotoAlbum from './EditPhotoAlbum'
import PanningRectExample from './PanningRectExample'


export default class EditProfileScrollView extends React.Component {
  render(){
    return (
      <ScrollView>
        {/* <EditPhotoAlbum /> */}
        <PanningRectExample />

      </ScrollView>
    )
  }

}
