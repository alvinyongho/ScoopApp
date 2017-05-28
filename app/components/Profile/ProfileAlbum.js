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
  constructor(props){
    super(props)

  }

  profilePictures = (images) => {

    if(images === undefined) return null
    return pictureViews = images.map((imgsource, index) =>{
        if(imgsource){
          return(
            <Image key={'albumPicture'+index} source={{uri:imgsource}} style={styles.profilePicture}>
              <View style={styles.flag} />
            </Image>
          )
        }
    })
  }

  render(){
    return(
      <View style={styles.wrapper}>
      <Swiper 
        showsButtons={true} 
        loop={false} 
        onDragRelease={() => this.props.changeScrollState(true)}
        onDragStart={() => this.props.changeScrollState(false)}
      >
        {this.profilePictures(this.props.images)}
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
