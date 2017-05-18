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
var MARGIN = 12;
var HEADER_SIZE = 64    // IOS
var NUM_PER_ROW = 3

var largeBoxHeight = (screenWidth/3)*2
var largeBoxWidth = (screenWidth)
var smallBoxHeight = screenWidth/3 - 20
var smallBoxWidth = screenWidth/NUM_PER_ROW


export default class PhotoAlbum extends React.Component {
  constructor(props){
    super(props);
    this.indexSelected = null
    this.panCapture = false     //initially capture touch event from TouchableWithoutFeedback
    this.blockTouchRelease = false

    this.initialDragDone = false

    this.state = {
      gridLayout: null,
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
      blockPositionsSetCount: 0,
      activeBlock: null,          // The block that is set from a long press select.
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

      onPanResponderGrant: this.onActiveBlockIsSet(this.handleGranted),
      onPanResponderMove: this.onActiveBlockIsSet(this.handleMove),
      onPanResponderRelease: (evt, gestureState) => { this.onDragRelease() },
    });
  }

  // onActiveBlock takes in a function that takes in a function and returns another function that
  // takes in the evt and gestureState parameter
  onActiveBlockIsSet = (fn) => (evt, gestureState) => {
    if (this.state.activeBlock != null) fn(evt, gestureState)
  }

  activateDrag = (key) => () => {
    this.panCapture = true;
    // console.log('activated drag on key:  ' + key)
    this.setState({activeBlock: key});
    console.log('setting the active block:   ')
    console.log(this.state.activeBlock)
  }

  handleMove = (evt, gestureState) => {
    // Block TouchableWithoutFeedback from releasing
    console.log('handling move')
    const {moveX, moveY, dx, dy} = gestureState

    if (dx != 0 || dy != 0) this.initialDragDone = true


    let dragPosition = { x: moveX, y: moveY}
    //
    // console.log('setting activeBlock position to ')
    // console.log(dragPosition)
    // this._getActiveBlockPositions().currentPosition.setValue(dragPosition)
    //
    //
    // console.log("get animated value")
    // console.log(this._getActiveBlockPositions().currentPosition)
    //
    // Animated.timing(
    //   this._getActiveBlockPositions().currentPosition,
    //   {
    //     toValue: dragPosition,
    //     duration: 300
    //   }
    // ).start(() => console.log('done'));



  }

  handleGranted = (evt, gestureState)  => {
    this.blockTouchRelease = true;
    console.log('handle granted and start dragging')

    if(this.state.activeBlock != null){
      // get active Block position
      console.log('@@@@get active block position')
      let activeBlockOrigin = this._getActiveBlockPositions().originalPosition
      let offsetX = activeBlockOrigin.x - gestureState.dx
      let offsetY = activeBlockOrigin.y - gestureState.dy
      console.log({offsetX, offsetY})
      this._getActiveBlockPositions().currentPosition.setOffset({offsetX, offsetY})
      console.log('moveX:   ' + gestureState.moveX)
      console.log('moveY:   ' + gestureState.moveY)
      this._getActiveBlockPositions().currentPosition.setValue({x: gestureState.moveX, y: gestureState.moveY})


    }
  }

  // Handle case where touch down but don't move and just release
  handlePressOut = () => () => {
    if (this.blockTouchRelease === false)
      this.onDragRelease();
  }

  // Handle case where move and then release
  onDragRelease = () => {
    this.setState({activeBlock: null});
    this.panCapture = false;
    this.blockTouchRelease = false;
    console.log('released drag')
  }

  handleShortPress(){
    console.log('handle short press')

  }
  // Helper functions
  // Returns the active block Positions: current Position and original Position
  _getActiveBlockPositions = () => {
    return this.state.blockPositions[ this.state.activeBlock ];
  }

  saveBlockPositions = (key) => ({nativeEvent}) => {
    // console.log('@@@handling saving of key')
    console.log(nativeEvent)
    let blockPositions = this.state.blockPositions
    // if blockPositions does not contain this key
    if(!blockPositions[key]){
      // increment the number of block positions
      let blockPositionsSetCount = ++this.state.blockPositionsSetCount;
      let thisPosition ={
        x: nativeEvent.layout.x,
        y: nativeEvent.layout.y,
      }
      blockPositions[key] = {
        currentPosition: new Animated.ValueXY(thisPosition),
        originalPosition: thisPosition
      }

      this.setState({blockPositions, blockPositionsSetCount});

    }
    // console.log('block positions@@@')
    // console.log(this.state.blockPositions)
  }

  _blockPositionsSet = () => this.state.blockPositionsSetCount === 7

  _getBlockStyle = (key, type) =>{
    // console.log('getting the block style for key')
    // console.log('@@@ get block style@@@ for:    ' + key+type)
    // console.log((this.initialDragDone))
    // console.log(this.state.blockPositions)
    if(this._blockPositionsSet() && (this.initialDragDone) && key === 0){
      console.log("@@@TOP@@@")
      console.log(this._getBlock(type+key).currentPosition.getLayout().top._value)
      console.log("@@@LEFT@@@")
      console.log(this._getBlock(type+key).currentPosition.getLayout().left._value)
    }

    if (type === "largePicture"){
      // console.log('handle large picture')

      return (
        [{width: largeBoxWidth,
          height: largeBoxHeight, backgroundColor: 'skyblue',
          justifyContent: 'center' },
        this._blockPositionsSet() && (this.initialDragDone) &&
        { position: 'absolute',
          top: this._getBlock(type+key).currentPosition.getLayout().top,
          left: this._getBlock(type+key).currentPosition.getLayout().left
        }]

        // [{position: 'absolute', top:50, left:50}]
      );
    }

    return (
      [{width: smallBoxWidth,
        height: smallBoxHeight, backgroundColor: 'green',
        justifyContent: 'center' },
      this._blockPositionsSet() && (this.initialDragDone) &&
      { position: 'absolute',
        top: this._getBlock(type+key).currentPosition.getLayout().top,
        left: this._getBlock(type+key).currentPosition.getLayout().left
      }]
    );
  }



  _getBlock = (key) => {
    return this.state.blockPositions[ key ]
  }

  assessGridSize = ({nativeEvent}) => {
    // this.blockWidth = nativeEvent.layout.width / this.itemsPerRow
    // this.blockHeight = 100
    if (this.state.gridLayout != nativeEvent.layout) {
      console.log("assessing the grid size")
      this.setState({
        gridLayout: nativeEvent.layout,
        // blockWidth: this.blockWidth,
        // blockHeight: this.blockHeight
      })
      console.log(nativeEvent.layout)
    }
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
            onLongPress = { this.activateDrag('largePicture'+key)           }
            onPressOut =  { this.handlePressOut()          }
            picture =     { elem.bigPicture }
            onLayout=     { this.saveBlockPositions('largePicture'+ key) }
            style =       { this._getBlockStyle(key, 'largePicture') }
            blockType =   {'largePicture'}
          />
        );
      }
      if (elem.type == 'smallImages'){
        const small_pictures = elem.smallPictures.map((smallPicture, smallPicture_key) => {
          let num_bigImages = 1
          let top  = Math.floor((smallPicture_key)/NUM_PER_ROW) * smallBoxHeight + largeBoxHeight;
          let left = ((smallPicture_key) % NUM_PER_ROW) * smallBoxWidth;
          let marginLeft = MARGIN * (((smallPicture_key) % NUM_PER_ROW)+1)
          //Picture Block is an Animated View
          return (
            <PictureBlock
              key = {'smallPicture'+ smallPicture_key}
              delayLongPress={400}
              panHandlers = { this._panResponder.panHandlers }
              onPress =     { ()=>this.handleShortPress() }
              onLongPress = { this.activateDrag('smallPicture'+ smallPicture_key) }
              onPressOut =  { this.handlePressOut() }
              picture =     { smallPicture }
              onLayout=     { this.saveBlockPositions('smallPicture'+ smallPicture_key) }
              style =       { this._getBlockStyle(smallPicture_key, 'smallPicture') }
              blockType =   { 'smallPicture' }
            />
          )
        });
        return small_pictures;
      }
    })

    return (
      <Animated.View
        style={styles.pictureContainer}
        onLayout= {this.assessGridSize}
        >
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
    <Animated.View
      style={this.props.style}
      onLayout = { this.props.onLayout }
      {...this.props.panHandlers}
    >
      <TouchableWithoutFeedback
        style={{flex:1}}
        delayLongPress={400}
        onPress=       {this.props.onPress}
        onLongPress=   {this.props.onLongPress}
        onPressOut=    {this.props.onPressOut}
        >
          <View style = {styles.itemImageContainer}>
            <View>
            {this.props.blockType === 'smallPicture' ?
              <Image source={this.props.picture.imagesrc} style={{width:smallBoxWidth, height: smallBoxHeight}} />
            : <Image source={this.props.picture.imagesrc} style={{width:largeBoxWidth, height: largeBoxHeight}} />
            }
            </View>
          </View>
      </TouchableWithoutFeedback>
    </Animated.View>
}


var styles = StyleSheet.create({

  pictureContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  itemImageContainer: {
    flex: 1,
    justifyContent: 'center'
  }



});
