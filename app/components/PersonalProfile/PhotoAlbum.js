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
    this.activeBlockOffset = null

    this.currentActiveBlockPositionX = null;
    this.currentActiveBlockPositionY =null;

    this.initialWasBig = false
    this.releasedDrag = true


    this.state = {
      currentBig: 'picture0',
      gridLayout: null,
      pictures: [
          {
            backgroundColor: 'skyblue',
            imagesrc: images.placeholder_mainalbum
          },
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
          }
      ],
      blockPositions: [],
      blockPositionsSetCount: 0,
      activeBlock: null,          // The block that is set from a long press select.
      activeBlockIndex: null,
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

  activateDrag = (key, index) => () => {
    this.panCapture = true;
    // console.log('activated drag on key:  ' + key)
    this.setState({activeBlock: key, activeBlockIndex: index});

    // Set the initialWasBig. when we scale down we have to offset the x and y
    if (this.state.activeBlock === this.state.currentBig) {
      this.initialWasBig = true;
    }


    this.releasedDrag = false

  }

  handleGranted = (evt, gestureState)  => {
    // this gets called once when the drag event is activated and it set sht eoffsetX and offsetY position
    // which is where the original block origin is at
    this.blockTouchRelease = true;
    if(this.state.activeBlock != null){
      let activeBlockOrigin = this._getActiveBlockPositions().originalPosition  // get active block position
      //x0, y0  :  the screen coordinates of the responder grant
      let offsetX = activeBlockOrigin.x - gestureState.x0
      let offsetY = activeBlockOrigin.y - gestureState.y0
      this.activeBlockOffset = {x: offsetX, y: offsetY}

      this.currentActiveBlockPositionX = this._getActiveBlockPositions().originalPosition.x
      this.currentActiveBlockPositionY = this._getActiveBlockPositions().originalPosition.y
      console.log(`active offsets`)
      console.log(this.activeBlockOffset)
      //
      //
      // this._getActiveBlockPositions().currentPosition.setOffset({offsetX, offsetY})
      // this._getActiveBlockPositions().currentPosition.setValue({x: gestureState.moveX, y: gestureState.moveY})
    }
  }


  handleMove = (evt, gestureState) => {
    // Block TouchableWithoutFeedback from releasing

    const {moveX, moveY, dx, dy} = gestureState

    if (dx != 0 || dy != 0) this.initialDragDone = true
    // let dragPosition = { x: moveX, y: moveY}
    drag_pos_x = this.currentActiveBlockPositionX + dx
    drag_pos_y = this.currentActiveBlockPositionY + dy

    let dragPosition = { x: drag_pos_x, y: drag_pos_y  }
    this.dragPosition = dragPosition

    let originalPosition = this._getActiveBlockPositions().originalPosition

    this._getActiveBlockPositions().currentPosition.setValue(dragPosition)


    if(this.initialWasBig && this.state.currentBig === this.state.activeBlock){
      dragPosition = { x:drag_pos_x - this.activeBlockOffset.x - smallBoxWidth/2, y:drag_pos_y - this.activeBlockOffset.y - smallBoxHeight}
      this.dragPosition = dragPosition
      this._getActiveBlockPositions().currentPosition.setValue(dragPosition)
    }

    // handle the case where the initial block selected was the big block
    // and then drag into a smaller block, the position needs to be offset
    if(this.initialWasBig && this.state.currentBig !== this.state.activeBlock){
      dragPosition = { x:drag_pos_x - this.activeBlockOffset.x - smallBoxWidth/2, y:drag_pos_y - this.activeBlockOffset.y - smallBoxHeight}
      this.dragPosition = dragPosition
      this._getActiveBlockPositions().currentPosition.setValue(dragPosition)
    }

    // handle the case where the initial block selected was NOT the big block
    // and then drag into the big block, the position needs to be offset

    // this does not handle the case where the currently being dragged is wider than the smallBoxWidth
    if(!this.initialWasBig && this.state.currentBig == this.state.activeBlock){
      // console.log('have to offset further')
      dragPosition = { x:drag_pos_x , y:drag_pos_y}
      this.dragPosition = dragPosition
      // console.log(dragPosition)
      this._getActiveBlockPositions().currentPosition.setValue(dragPosition)
    }

    this._endMove(evt, gestureState)

    let blockPositions = this.state.blockPositions
    this.setState({ blockPositions })
  }


  _getDistanceTo = (point) => {
    let xDistance = this.dragPosition.x- point.x
    let yDistance = this.dragPosition.y- point.y
    return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) )
  }


  _endMove = (evt, gestureState) => {
    let originalPosition = this._getActiveBlockPositions().originalPosition
    let distanceToOrigin = this._getDistanceTo(originalPosition)
    let closest = this.state.activeBlock
    let closestDistance = distanceToOrigin

    for (var key in this.state.blockPositions) {
      if(key !== this.state.activeBlock && this.state.blockPositions[key].originalPosition){
        let blockPosition = this.state.blockPositions[key].originalPosition

        let distance = this._getDistanceTo(blockPosition)
          if(key === this.state.currentBig){
            // check the distance to the second row of ghost boxes

            if (distance < closestDistance && distance < largeBoxWidth) {
               closest = key
               closestDistance = distance
            }
          }
          else{
            if (distance < closestDistance && distance < smallBoxWidth) {
              closest = key
              closestDistance = distance
            }
          }
      }
    }

    if(closest !== this.state.activeBlock){
      Animated.spring(
        this._getBlock(closest).currentPosition,
        {
          toValue: this._getActiveBlockPositions().originalPosition,
          // duration: 300,
          // useNativeDriver: true,
        }
      ).start()

      // should we modify current big?
      if(this.state.currentBig === this.state.activeBlock){
        this.setState({
          currentBig: closest
        })
      }

      if(this.state.currentBig === closest){
        // convert the closest to smallblock
        this.setState({
          currentBig: this.state.activeBlock
        })

        this._getBlock(closest).currentPosition.setValue({x: largeBoxWidth/3, y: largeBoxHeight/3})
      }

      this.handleAnimation(closest);

      let blockPositions = this.state.blockPositions
      this._getActiveBlockPositions().originalPosition = blockPositions[closest].originalPosition
      blockPositions[closest].originalPosition = originalPosition
      this.setState({ blockPositions })

    }

  }

  handleAnimation = (closest) => {
    Animated.spring(
      this._getBlock(closest).currentPosition,
      {
        toValue: this._getActiveBlockPositions().originalPosition,
        // duration: 100,
        // useNativeDriver: true,
      }
    ).start()
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
    this.initialWasBig = false;
    // console.log('released drag')
    this.releasedDrag = true;
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
    // console.log(nativeEvent)
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
  }

  _blockPositionsSet = () => this.state.blockPositionsSetCount === 7

  _getBlockStyle = (index, name) =>{

    // handle the case where it must be a small block
    if(name+index!==this.state.currentBig){
      return (
        [{width: smallBoxWidth,
          height: smallBoxHeight,
          justifyContent: 'center' },
        this._blockPositionsSet() && (this.initialDragDone) &&
        { position: 'absolute',
          top: this._getBlock(name+index).currentPosition.getLayout().top._value,
          left: this._getBlock(name+index).currentPosition.getLayout().left._value
        }]
      );
    }

    // handle the medium block
    if(!this.releasedDrag && this.state.activeBlock !== this.state.currentBig){
      console.log('handle medium block')

    }

    // handle big block
    if(!this.releasedDrag && this.state.activeBlock == this.state.currentBig){
      console.log('handle small block')

      return (
          [{width: smallBoxWidth,
            height: smallBoxHeight,
            alignItems: 'center',
            justifyContent: 'center', },
          this._blockPositionsSet() && (this.initialDragDone) &&
          { position: 'absolute',
            top: this._getBlock(name+index).currentPosition.getLayout().top._value,
            left: this._getBlock(name+index).currentPosition.getLayout().left._value
          }]
        );

    }


    // otherwise return a small block
    return (
      [{width: largeBoxWidth,
        height: largeBoxHeight,
        justifyContent: 'center' },
      this._blockPositionsSet() && (this.initialDragDone) &&
      { position: 'absolute',
        top: this._getBlock(name+index).currentPosition.getLayout().top._value,
        left: this._getBlock(name+index).currentPosition.getLayout().left._value
      }]
    );


    //
    // // handle the big block
    // if(name+index===this.state.currentBig && this.releasedDrag){
    //   // console.log("handle large")
    //   return (
    //       [{width: largeBoxWidth,
    //         height: largeBoxHeight, backgroundColor: 'skyblue',
    //         justifyContent: 'center', },
    //       this._blockPositionsSet() && (this.initialDragDone) &&
    //       { position: 'absolute',
    //         top: this._getBlock(name+index).currentPosition.getLayout().top._value,
    //         left: this._getBlock(name+index).currentPosition.getLayout().left._value
    //       }]
    //     );
    // }



    // else if(name+index===this.state.currentBig && !this.releasedDrag){
    //   return (
    //       [{width: largeBoxWidth,
    //         height: largeBoxHeight, backgroundColor: 'skyblue',
    //         justifyContent: 'center', },
    //       this._blockPositionsSet() && (this.initialDragDone) &&
    //       { position: 'absolute',
    //         top: this._getBlock(name+index).currentPosition.getLayout().top._value,
    //         left: this._getBlock(name+index).currentPosition.getLayout().left._value
    //       }]
    //     );
    // }





  }



  _getBlock = (key) => {
    return this.state.blockPositions[ key ]
  }


  assessGridSize = ({nativeEvent}) => {
    // this is called from the onlayout for the animated.view root view for the photoalbum
    // this sets up the layout constraints including the height of the view and the width of the view

    // originally this code also sets up the block width and the heights but we have defined
    // that already at the top of this class using largeBoxHeight, largeBoxWidth, smallBoxWidth, smallBoxHeight

    if (this.state.gridLayout != nativeEvent.layout) {
      this.setState({
        gridLayout: nativeEvent.layout,
      })
    }
  }

  render(){
    const pictures = this.state.pictures.map((elem, key) => {
          //Picture Block is an Animated View
      return (
        <PictureBlock
          key = {'picture'+ key}
          delayLongPress={50}
          panHandlers = { this._panResponder.panHandlers }
          onPress =     { ()=>this.handleShortPress() }
          onLongPress = { this.activateDrag('picture'+ key, key) }
          onPressOut =  { this.handlePressOut() }
          picture =     { elem }
          onLayout=     { this.saveBlockPositions('picture'+ key) }
          style =       { this._getBlockStyle(key, 'picture') }
          currentBig =   { this.state.currentBig }
          identifier = {'picture' + key}
          releasedDrag = {this.releasedDrag}
          activeBlock  = {this.state.activeBlock}
        />
      )
    })

    if(this._blockPositionsSet() && (this.initialDragDone)){
      let selectedItem = pictures[this.state.activeBlockIndex];
      pictures.splice(this.state.activeBlockIndex, 1);
      pictures.push(selectedItem);
    }


    return (
      <Animated.View
        style={styles.pictureContainer}
        onLayout= {this.assessGridSize}
        >
        {this.state.gridLayout && pictures}
      </Animated.View>
    );
  }
}

class PictureBlock extends Component {
  constructor(props){
    super(props)
  }

  // Handles how the imageview should look
  imageView = () => {
    // handle all blocks that are not big
    // if the imageview isnt the current big image the size constraints are the small box size
    if(this.props.identifier !== this.props.currentBig)
      return (
          <Image source={this.props.picture.imagesrc}
                style={{flex: 1, marginLeft:10, marginRight:10, marginTop:10, width:smallBoxWidth-20,
                  borderColor: 'white',
                  borderWidth: MARGIN/3,
                  borderRadius:5,
                  height: smallBoxHeight}}
          />
      );

    // handle the (possibly) medium block
    // dragging the small block (POSSIBLY) to the big block
    if(!this.props.releasedDrag && this.props.activeBlock !== this.props.currentBig){
      console.log('turning it medium')
      return (
          <Image source={this.props.picture.imagesrc}
                style={{flex: 1, margin:30, marginBottom: 10, width:largeBoxWidth-60, height: largeBoxHeight,

                  borderColor: 'white',
                  borderWidth: MARGIN/3,
                  borderRadius:5,}} />);
    }
    // handle big block
    // dragging the big block (POSSIBLY) to the small block
    else if(!this.props.releasedDrag && this.props.activeBlock == this.props.currentBig){
      return (<Image source={this.props.picture.imagesrc}
                style={{flex: 1, margin:5, width:smallBoxWidth-10, height: smallBoxHeight,

                  borderColor: 'white',
                  borderWidth: MARGIN/3,
                  borderRadius:5,}} />);
    }
    // released press and not a big block
    else
      return (<Image source={this.props.picture.imagesrc}
        style={{flex: 1, margin:10, marginBottom:0, width:largeBoxWidth-20, height: largeBoxHeight,

          borderColor: 'white',
          borderWidth: MARGIN/3,
          borderRadius:5,}} />);
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
          <View style={styles.itemImageContainer}>
            <View style={{flex:1}}>
            {this.imageView()}
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
    alignItems:'center',
    justifyContent: 'center'
  }

});
