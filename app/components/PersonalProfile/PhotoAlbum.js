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

import _ from 'lodash'

import Button from 'react-native-button'
import images from '@assets/images';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

var ALBUM_WIDTH = 80;
var ALBUM_HEIGHT = 60;
var MARGIN = 12;
var HEADER_SIZE = 64    // IOS
var NUM_PER_ROW = 3

const NULL_FN = () => {}

var largeBoxHeight = (screenWidth/3)*2
var largeBoxWidth = (screenWidth)
var smallBoxHeight = screenWidth/3 - 30
var smallBoxWidth = screenWidth/NUM_PER_ROW

export default class PhotoAlbum extends React.Component {
  constructor(props){
    super(props);
    this.indexSelected = null
    this.panCapture = false     //initially capture touch event from TouchableWithoutFeedback
    this.blockTouchRelease = false  // prevents the touchablewithoutfeedback from releasing the pan event

    this.initialDragDone = false
    this.activeBlockOffset = null

    this.currentActiveBlockPositionX = null;
    this.currentActiveBlockPositionY =null;

    this.initialWasBig = false
    this.releasedDrag = true

    this.itemOrder = []
    this.state = {
      currentBig: 'picture0',
      gridLayout: null,
      pictures: [
          {
            imagesrc: images.placeholder_mainalbum
          },
          {
            imagesrc: images.placeholder_album1
          },
          {
            imagesrc: images.placeholder_album2
          },
          {
            imagesrc: images.placeholder_album3
          },
          {
            imagesrc: images.placeholder_album4
          },
          {
            imagesrc: images.placeholder_album5
          },
          {
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

  componentDidMount(){
    // console.log('save the original order of the pictures')
    // var items = {};
    this.itemOrder = this.state.pictures.map((elem, index) => {
      let activeItemkey = 'picture'+index
      return {imagesrc: elem.imagesrc, order: index}
    })
    // this.itemOrder = items;
    // console.log(this.itemOrder)
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
    // Set the initialWasBig. when we scale down we have to offset the x and y
    this.setState({activeBlock: key, activeBlockIndex: index});

    if (this.state.activeBlock === this.state.currentBig) {
      this.initialWasBig = true;
    }

    this.props.changeScrollState(false);
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
      dragPosition = { x:drag_pos_x , y:drag_pos_y}
      this.dragPosition = dragPosition
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

    // if the block we are changing with isnt the current block
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
        curr = this._getBlock(closest).originalPosition
        this._getBlock(closest).currentPosition.setValue({x: 0, y: curr.y})
        this.setState({
          currentBig: closest
        })
      }

      if(this.state.currentBig === closest){
        // convert the closest to smallblock
        this.setState({
          currentBig: this.state.activeBlock
        })

        // move the block to the middle before sending it back down
        this._getBlock(closest).currentPosition.setValue({x: largeBoxWidth/3, y: largeBoxHeight/3})
      }

      this.handleAnimation(closest);

      // swap the positions
      let blockPositions = this.state.blockPositions
      this._getActiveBlockPositions().originalPosition = blockPositions[closest].originalPosition
      blockPositions[closest].originalPosition = originalPosition
      this.setState({ blockPositions })

      // swap the order indexes

      closestIndex = closest.replace('picture', '')
      // console.log(closestIndex)
      // console.log(this.itemOrder[parseInt(closestIndex)])
      let tempOrderIndex = this.itemOrder[this.state.activeBlockIndex].order
      this.itemOrder[this.state.activeBlockIndex].order = this.itemOrder[parseInt(closestIndex)].order
      this.itemOrder[parseInt(closestIndex)].order = tempOrderIndex

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
    // reset the grid
    for (var key in this.state.blockPositions) {
        this.state.blockPositions[key].currentPosition.setValue(this.state.blockPositions[key].originalPosition)
    }
    this.setState({activeBlock: null});
    this.panCapture = false;
    this.blockTouchRelease = false;
    this.initialWasBig = false;
    this.props.changeScrollState(true);
    this.releasedDrag = true;

    // use the lodash sorting function based on the attribute of the hash map
    let itemOrder = _.sortBy(this.itemOrder, item => item.order)


    this.props.onFinishedDrag(itemOrder)
    // console.log(itemOrder)

  }

  handleShortPress(key){
    //TODO: handle the short press for key which might be better off as a callback
    this.props.onShortPress(key)
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

  _containsAddBlock = () => {
    return this.state.blockPositionsSetCount < 7
  }

  _blockPositionsSet = () => {
    return this.state.blockPositionsSetCount === this.itemOrder.length
  }

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

    }

    // handle big block
    if(!this.releasedDrag && this.state.activeBlock == this.state.currentBig){

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

  _fixItemOrderOnDeletion = (orderItem) => {
    if(!orderItem) return false

    orderItem.order--; // decrement the orderItem
    this._fixItemOrderOnDeletion(_.find(this.itemOrder, item => item.order === orderItem.order + 2))

  }

  removeBlock = (key) => {
    let pictures = this.state.pictures
    let blockPositions = this.state.blockPositions;
    let blockPositionsSetCount = this.state.blockPositionsSetCount;
    let currentBig = this.state.currentBig;
    --blockPositionsSetCount; // decrement the number of block positions
    // get the order
    let order = this.itemOrder[key].order
    this.itemOrder.splice(key, 1)
    pictures.splice(key, 1)

    // blockPosKey splice equivalent
    var blockPosKey = key
    for(blockPosKey; blockPosKey < blockPositionsSetCount; blockPosKey++){
        blockPositions['picture'+blockPosKey] = blockPositions['picture'+(blockPosKey+1)]
    }
    delete blockPositions['picture'+blockPositionsSetCount];

    sortedItemOrder = _.sortBy(this.itemOrder, item => item.order)
    for (var i=0; i<blockPositionsSetCount; i++){

      // could this be causing the flickering
      blockPos = _.findIndex(this.itemOrder, item => item.order === sortedItemOrder[i].order)
      console.log(blockPos)

      if(i===0){
        blockPositions['picture'+blockPos].originalPosition = {x:0, y:0}
        blockPositions['picture'+blockPos].currentPosition.setValue({x:0,y:0})
        currentBig = 'picture'+blockPos
        this.setState({currentBig})
      } else {
        let x = ((i-1) % 3) * smallBoxWidth
        let y = Math.floor((i-1) / 3) * smallBoxHeight + largeBoxHeight
        blockPositions['picture'+blockPos].originalPosition = {x, y}
        blockPositions['picture'+blockPos].currentPosition.setValue({x,y})
      }
    }
    this.setState({pictures,blockPositions, blockPositionsSetCount, currentBig})
  }

  animateBlockMove = (blockIndex, position) => {
    Animated.timing(
      this._getBlock('picture'+blockIndex).currentPosition,
      {
        toValue: position,
        duration: 100
      }
    ).start()
  }

  renderAddPictureButton = () => {
    <PictureBlock
      key = {'addBlock'}
      delayLongPress={50}
      onPress =     { ()=>this.handleShortPress(key) }

      style =       { {position: 'absolute',
        top: 150,
        left: 150
    }   }

    />
  }


  render(){
    const pictures = this.state.pictures.map((elem, key) => {
          //Picture Block is an Animated View
      return (
        <PictureBlock
          key = {'picture'+ key}
          delayLongPress={50}
          panHandlers = { this._panResponder.panHandlers }
          onPress =     { ()=>this.handleShortPress(key) }
          onLongPress = { this.activateDrag('picture'+ key, key) }
          onPressOut =  { this.handlePressOut() }
          picture =     { elem }
          onLayout=     { this.saveBlockPositions('picture'+ key) }
          style =       { this._getBlockStyle(key, 'picture') }
          currentBig =   { this.state.currentBig }
          identifier = {'picture' + key}
          releasedDrag = {this.releasedDrag}
          activeBlock  = {this.state.activeBlock}
          removeBlock  = { () => this.removeBlock(key)}
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

        {pictures.length < 7  &&
        <View style={{ flex:1, alignItems:'center', justifyContent: 'center',  position: 'absolute', top: Math.floor((this.state.blockPositionsSetCount-1)/3) * smallBoxHeight + largeBoxHeight , left:((this.state.blockPositionsSetCount-1)%3)*smallBoxWidth,
              backgroundColor: 'white',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#E6E6E6',
              marginLeft:10, marginRight:10, marginTop:10, marginBottom: 10,
              width:smallBoxWidth-20, height: smallBoxHeight-10}}>

              <Button onPress={console.log('add picture')}>
                <View style={{width: smallBoxWidth, height: smallBoxHeight, alignItems: 'center', justifyContent: 'center',}}>
                  <View
                    style={{
                    height: 20,
                    width: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'blue',
                    borderWidth:1,
                    borderColor: '#54C9EC',
                    borderRadius:20/2}}>
                    <View style={{position: 'absolute', height: 10, width: 1, backgroundColor: '#54C9EC'}}/>
                    <View style={{position: 'absolute', width: 10, height: 1, backgroundColor: '#54C9EC'}}/>
                  </View>
                </View>
              </Button>

        </View>
        }

        {this.state.gridLayout && pictures}
      </Animated.View>

    );
  }
}

DELETE_BUTTON_WIDTH = 30
class PictureBlock extends Component {
  constructor(props){
    super(props)
  }


  deleteButton = () => {
    if(this.props.identifier !== this.props.currentBig){
      return (
        <Button onPress={this.props.removeBlock}>
          <View
              style={{position: 'absolute',
                      top: -smallBoxHeight+7,
                      left: smallBoxWidth-37,
                      height: DELETE_BUTTON_WIDTH,
                      width: DELETE_BUTTON_WIDTH,
                      backgroundColor: 'white',
                      borderWidth:1,
                      borderColor: '#E6E6E6',
                      borderRadius:DELETE_BUTTON_WIDTH/2}}>
          </View>
        </Button>
      )
    }
  }
  // Handles how the imageview should look
  imageView = () => {
    // handle all blocks that are not big
    // if the imageview isnt the current big image the size constraints are the small box size
    if(this.props.identifier === this.props.activeBlock && this.props.activeBlock !== this.props.currentBig){
      return (
          <Image source={this.props.picture.imagesrc}
                style={{flex: 1, marginLeft:5, marginRight:5, marginTop:5, width:smallBoxWidth-10,
                  borderColor: 'white',
                  borderWidth: MARGIN/3,
                  borderRadius:5,
                  height: smallBoxHeight}}
          />
      );
    }


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
            {this.props.releasedDrag && !this.props.activeBlock && this.deleteButton()}
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
