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
var MARGIN = 15;
var HEADER_SIZE = 64    // IOS

var NUM_PER_ROW = 3

var largeBoxHeight = (screenWidth/3)*2
var largeBoxWidth = (screenWidth)
var smallBoxHeight = screenWidth/3 - 20
var smallBoxWidth = (screenWidth - ((NUM_PER_ROW+1)*MARGIN))/NUM_PER_ROW


export default class PhotoAlbum extends React.Component {
  constructor(props){
    super(props);
    this.indexSelected = null
    this.panCapture = false     //initially capture touch event from TouchableWithoutFeedback
    this.blockTouchRelease = false

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
      ],
      blockPositions: [],

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

      onPanResponderGrant: (evt, gestureState) => { this.handleGranted() },
      onPanResponderMove: (evt, gestureState) => {this.handleMove()},
      onPanResponderRelease: (evt, gestureState) => { this.onDragRelease() },
    });
  }

  activateDrag = (key) => () => {
    this.panCapture = true;
    console.log('activated drag')
  }

  handleMove = () => {
    // Block TouchableWithoutFeedback from releasing
    console.log('handling move')
  }

  handleGranted = ()  => {
    this.blockTouchRelease = true;
  }

  // Handle case where touch down but don't move and just release
  handlePressOut = () => () => {

    if (this.blockTouchRelease === false)
      this.onDragRelease();
  }

  // Handle case where move and then release
  onDragRelease = () => {
    this.panCapture = false;
    this.blockTouchRelease = false;
    console.log('released drag')
  }



  handleShortPress(){
    console.log('handle short press')

  }

  // Helper functions
  getKeySelected(pageX, pageY){
    console.log('get coordinate selected' + pageX + "  " + pageY)
  }

  resetIndexSelected(){
    this.indexSelected = null;
  }

  saveBlockPositions = (key) => ({nativeEvent}) => {
    console.log('handling saving of key')
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
            onLayout=     { this.saveBlockPositions('largePicture'+ key) }
            style =       {[styles.pictureContainer, styles.largeBox]}
          />
        );
      }
      if (elem.type == 'smallImages'){
        const small_pictures = elem.smallPictures.map((smallPicture, smallPicture_key) => {
          let num_bigImages = 1
          let top  = Math.floor((smallPicture_key)/NUM_PER_ROW) * smallBoxHeight + largeBoxHeight;
          let left = ((smallPicture_key) % NUM_PER_ROW) * smallBoxWidth;
          let marginLeft = MARGIN * (((smallPicture_key) % NUM_PER_ROW)+1)

          return (
            <PictureBlock
              key = {'smallPicture'+ smallPicture_key}
              delayLongPress={400}
              panHandlers = { this._panResponder.panHandlers }
              onPress =     { ()=>this.handleShortPress() }
              onLongPress = { this.activateDrag(0) }
              onPressOut =  { this.handlePressOut() }
              picture =     { smallPicture }
              onLayout=     { this.saveBlockPositions('smallPicture'+ smallPicture_key) }
              style =       {[styles.pictureContainer, styles.smallPictureBoxContainer, {top, left, borderRadius: 5, marginLeft}]}
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
          <View style={styles.pictureContainer}>
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
    width:  smallBoxWidth,
    height: smallBoxHeight-MARGIN,
    marginTop: MARGIN,
    borderColor: 'white',
    borderWidth: MARGIN/3,

  },

  largeBox:{
    top: 0,
    left: 0,
    height:largeBoxHeight-MARGIN,
    width:screenWidth-MARGIN*2,
    backgroundColor: 'blue',
    borderRadius: 5,
    margin: MARGIN,
    marginBottom: 0,
    borderColor: 'white',
    borderWidth: MARGIN/3,
  },

});
