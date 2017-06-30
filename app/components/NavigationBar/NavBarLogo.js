import React, { PropTypes, Component } from 'react';

import {
  Image,
  View,
} from "react-native";

import images from '@assets/images';


export default class NavBarLogo extends Component{
  render(){
    return (
      <View style={{alignItems: 'center', marginTop: 5}}>
      <Image
          source={images.scoopLogo}
          resizeMode='contain'
          style={{height: 20, width: 125}}/>
      </View>
    )
  }
}
