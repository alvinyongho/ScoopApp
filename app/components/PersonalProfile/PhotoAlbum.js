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

  constructor(props){
    super(props);
    this.indexSelected = null,

    //initially capture touch event from TouchableWithoutFeedback
    this.panCapture        = false

    this.state = {
      pictures: [
        {
          type: 'largeImage',
          bigPicture: {
            backgroundColor: 'skyblue',
            imagesrc: images.placeholder_mainalbum
          }
        },
        {
          type: 'smallImages',
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
          }]
        },
      ]
    }
  }

  componentWillMount(){
    this.createTouchHandlers();
  }

  createTouchHandlers = () => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,

      onMoveShouldSetPanResponder: (evt, gestureState) => this.panCapture,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.panCapture,

      onShouldBlockNativeResponder: (evt, gestureState) => false,

      onPanResponderTerminate: (evt, gestureState) => {},
      onPanResponderTerminationRequest: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {console.log('granted')},
      onPanResponderMove: (evt, gestureState) => {console.log('moving')},
      onPanResponderRelease: (evt, gestureState) => { this.onDragRelease() },
    });
  }

  activateDrag = (key) => () => {
    this.panCapture = true;
    console.log('activated drag')
  }

  // Handle case where touch down but don't move and just release
  handlePressOut = () => () => {
    this.onDragRelease();
  }

  // Handle case where move and then release
  onDragRelease = () => {
    this.panCapture = false;
    console.log('released drag')
  }

  handleShortPress(){
    console.log('handle short press')
  }

  // Helper functions
  getIndexSelected(pageX, pageY){
    console.log('get coordinate selected' + pageX + "  " + pageY)
  }

  resetIndexSelected(){
    this.indexSelected = null;
  }

  render(){
    const pictures = this.state.pictures.map((elem, key) => {
      if (elem.type == 'largeImage'){
        return (
          <PictureBlock
            key = {'largePicture'+key}
            delayLongPress={400}
            panHandlers = { this._panResponder.panHandlers }
            onPress =     { ()=>this.handleShortPress()    }
            onLongPress = { this.activateDrag(0)           }
            onPressOut =  { this.handlePressOut()          }
            picture =     { elem.bigPicture }
            style =       {[styles.pictureContainer, styles.largeBox]}
          />
        );
      }
      if (elem.type == 'smallImages'){
        const small_pictures = elem.smallPictures.map((smallPicture, smallPicture_key) => {
          let num_bigImages = 1
          let top  = Math.floor((smallPicture_key)/3) * smallBoxHeight + largeBoxHeight;
          let left = ((smallPicture_key) % 3) * smallBoxWidth;

          return (
            <PictureBlock
              key = {'smallPicture'+ smallPicture_key}
              delayLongPress={400}
              panHandlers = { this._panResponder.panHandlers }
              onPress =     { ()=>this.handleShortPress()    }
              onLongPress = { this.activateDrag(0)           }
              onPressOut =  { this.handlePressOut()          }
              picture =     { smallPicture }
              style =       {[styles.pictureContainer, styles.smallPictureBoxContainer, {top, left, borderRadius: 5}]}
            />
          )
        });
        return small_pictures;
      }
    })

    return (
      <Animated.View>
        {pictures}
      </Animated.View>
    );
  }
}

class PictureBlock extends Component {
  constructor(props){
    super(props)
  }

  render = () =>
    <Animated.View {...this.props.panHandlers}>
      <TouchableWithoutFeedback
        delayLongPress={400}
        onPress=       {this.props.onPress}
        onLongPress=   {this.props.onLongPress}
        onPressOut=    {this.props.onPressOut}
        pressRetentionOffset = {{top: 0, left: 0, bottom: screenHeight, right: screenWidth}}
        >
          <View style={{position:'absolute'}}>
            <Image source={this.props.picture.imagesrc} style={this.props.style}/>
          </View>
      </TouchableWithoutFeedback>
    </Animated.View>
}


var styles = StyleSheet.create({

  pictureContainer:{
    position: 'absolute',
  },
  smallPictureBoxContainer:{  // INDIVIDUAL CONTAINER
    width: smallBoxWidth,
    height:smallBoxHeight,
  },

  largeBox:{
    top: 0,
    left: 0,
    height:largeBoxHeight,
    width:screenWidth,
    backgroundColor: 'blue'
  },

});
