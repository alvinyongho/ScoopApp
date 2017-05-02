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


export default class ProfileBasicInfo extends Component {
  render(){
    return(
      <View style={styles.wrapper}>
        <Text style={styles.mainheader}>IU, 27</Text>
        <Text style={styles.subheader}>62 mi away</Text>
        <Text style={styles.subheader}>Yonsei University</Text>
        <Text style={styles.subheader}>Single</Text>

        <View style={{position: 'absolute', backgroundColor:'orange', width:60, height: 60, borderRadius:30, top:20, right:20}}>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor:'white',
    padding: 10
  },
  mainheader: {
    fontFamily: 'Avenir-Medium',
    fontSize: 23,
    marginLeft: 6
  },
  subheader: {
    fontFamily: 'Avenir-Light',
    fontSize: 17,
    marginLeft: 8,
    color: 'gray'
  }

})
