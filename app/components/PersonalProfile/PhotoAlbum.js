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
    return (
      <Animated.View>
        <PictureBlock
            style={{height:50, width: 50, backgroundColor: 'blue'}}
            delayLongPress={400}
            panHandlers = { this._panResponder.panHandlers }
            onPress =     { ()=>this.handleShortPress()    }
            onLongPress = { this.activateDrag(0)           }
            onPressOut =  { this.handlePressOut()          }
            />


      </Animated.View>
    );
  }

}

class PictureBlock extends Component {
  constructor(props){
    super(props)
    console.log('initial props')
    console.log(props)
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
          <View style={{height:50, width:50, backgroundColor:'blue'}}>
          </View>
      </TouchableWithoutFeedback>
    </Animated.View>
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
