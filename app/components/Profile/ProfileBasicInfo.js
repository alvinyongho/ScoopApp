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
        <View style={{flex:.8}}>
          <Text style={styles.mainheader}>Placeholder for a very long name here, 27</Text>
          <Text style={styles.subheader}>62 mi away</Text>
          <Text style={styles.subheader}>Yonsei University</Text>
          <Text style={styles.subheader}>Single</Text>
        </View>

        <View sytle={{flex:.2}}>
          <View style={{backgroundColor:'orange', width:60, height: 60, borderRadius:30}}>
          </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor:'white',
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
  mainheader: {
    fontFamily: 'Avenir-Medium',
    fontSize: 23,
    marginLeft: 6
  },
  subheader: {
    fontFamily: 'Avenir-Light',
    fontSize: 18,
    marginLeft: 8,
    color: 'gray'
  }

})
