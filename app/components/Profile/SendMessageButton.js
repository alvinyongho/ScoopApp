import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
} from 'react-native';
import images from '@assets/images';
import Swiper from './react-native-page-swiper';
import Button from 'react-native-button';


export default class ProfileBasicInfo extends Component {
  render(){
    return(
      <View style={styles.wrapper}>
        <Button containerStyle={styles.buttonContainer}>
          <Text style={styles.subheader}> Send IU a Message </Text>
        </Button>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  wrapper: {
    backgroundColor:'white',
    padding: 10
  },
  buttonText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 23,
    marginLeft: 6,
    color: 'white'
  },
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#54C9EC',
    borderRadius:5,
    marginLeft: 8,
    marginRight: 8,
    height: 43
  },
  subheader: {
    fontFamily: 'Avenir-Light',
    fontSize: 18,
    marginTop: 2,
    color: 'white'
  }

})
