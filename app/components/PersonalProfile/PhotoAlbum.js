import React, {Component} from 'react'

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
  Image,

} from 'react-native';

import images from '@assets/images';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

var ALBUM_WIDTH = 80;
var ALBUM_HEIGHT = 60;
var MARGIN = 20;

largeBoxHeight = (screenWidth/3)*2
largeBoxWidth = (screenWidth)
smallBoxHeight = screenWidth/3 - 20
smallBoxWidth = screenWidth/3

HEADER_SIZE = 64    // IOS


export default class PhotoAlbum extends React.Component {

  componentWillMount(){

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });

    this.state = {
      panEnabled: false,
      bigPicture: {
        backgroundColor: 'skyblue',
        imagesrc: images.placeholder_mainalbum
      },
      smallPictures: [
        {
          backgroundColor: 'red',
          imagesrc: images.placeholder_album1
        },
        {
          backgroundColor: 'orange',
          imagesrc: images.placeholder_album2
        },
        {
          backgroundColor: 'yellow',
          imagesrc: images.placeholder_album3
        },
        {
          backgroundColor: 'green',
          imagesrc: images.placeholder_album4
        },
        {
          backgroundColor: 'blue',
          imagesrc: images.placeholder_album5
        },
        {
          backgroundColor: 'purple',
          imagesrc: images.placeholder_album6
        },
      ],

    }
  }

  handleLongPress(){
    console.log('handle long press')
    this.setState({panEnabled: true});
  }
  handleShortPress(){
    console.log('handle short press')
  }
  handlePressOut(){
    console.log('handle press out')
    this.setState({panEnabled: false});
  }


  render(){

    this.smallPictures = this.state.smallPictures.map((elem, index) => {
      let top = Math.floor(index/3) * smallBoxHeight + largeBoxHeight;
      let left = (index % 3) * smallBoxWidth;
      return (
          <View ref={'smallPictureRef'+index}
                key={'smallPictureKey'+index}
                style={[styles.smallPictureBox, {top, left}]} >
                  <View style={[styles.smallPictureBoxContainer,]}>
                    <Image source={elem.imagesrc} style={styles.smallPictureBoxContainer}/>
                  </View>
          </View>
      );
    })


    return (
      <View>
        <TouchableWithoutFeedback
          delayLongPress={400}
          onPress={() => this.handleShortPress()}
          onLongPress={() => this.handleLongPress()}
          onPressOut={() => this.handlePressOut()}
          pressRetentionOffset = {{top: 0, left: 0, bottom: screenHeight, right: screenWidth}}
          >

          <View {...this._panResponder.panHandlers}>

            <View style={styles.smallPicturesContainer}>
              {this.smallPictures}
            </View>

          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

}


var styles = StyleSheet.create({
  smallPicturesContainer:{    // OVERALL CONTAINER
    width: screenWidth
  },
  smallPictureBoxContainer:{  // INDIVIDUAL CONTAINER
    alignItems:"center",
    justifyContent:"center",
    width: smallBoxWidth,
    height:smallBoxHeight,
  },
  smallPictureBox:{           // WRAPPER
    backgroundColor:"#fff",
    position:"absolute",
  },
  mainPictureBoxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: largeBoxWidth,
    height: largeBoxHeight,
  },
  mainPictureBox: {           // WRAPPER
    backgroundColor: "#fff",
    position: "absolute",
  },
});
