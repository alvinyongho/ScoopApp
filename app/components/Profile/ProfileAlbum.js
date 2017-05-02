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


export default class ProfileAlbum extends Component {
  render(){
    return(
      <View style={styles.wrapper}>
      <Swiper showsButtons={true} loop={false}>

        <View style={styles.profilePicture}>
          <View style={styles.flag}>
          </View>
        </View>
        <View style={styles.profilePicture}>
          <View style={styles.flag}>
          </View>
        </View>
        <View style={styles.profilePicture}>
          <View style={styles.flag}>
          </View>
        </View>
      </Swiper>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  wrapper: {
    backgroundColor:'#E6E6E6'
  },
  flag: {
    position:'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    backgroundColor:'#E6E6E6'
  },
  profilePicture: {
    flex: 1,
    height: 280,
    margin: 15,
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 5
  }
})
