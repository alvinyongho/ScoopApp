import React, {Component} from 'react'

import {
  View,
  Text,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  LayoutAnimation,
  Image,
} from 'react-native';

import images from '@assets/images';

import Button from 'react-native-button'

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
ACTION_TIMER = 4000

export default class PanningRectExample extends React.Component {

  constructor(props) {
    super(props);
    // Used to handle case where touch but drag finger out of the frame
    this.initialMoveOutOfFrameX = 0;
    this.initialMoveOutOfFrameY = 0;
    this.allowSwap              = true;
    this.finishedDeleting       = true;
    this.tapTimer               = null
    this.tapIgnore              = false
    this.pressEnabled           = false
    this._smallBoxWidth         = smallBoxWidth;
    this._smallBoxHeight        = smallBoxHeight;
    this.keySelected            = 0;
    this.typeOfBoxSelected = undefined;
    this.left = 0;
    this.top = 0;
    this.prev_left = 0;
    this.prev_top = 0;
    this.pictures = []
    this.initialKeySelected = 0;
    this.animations = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 0.7,
      },
    };

    this.state = {
      renderDelete: true,
      numEnabled: 6,
      activeBlock: null,
      selected: 6,
      albumPictures: [
        {
          key: 0,
          backgroundColor: 'white',
          imagesrc: images.placeholder_album1
        },
        {
          key: 1,
          backgroundColor: 'white',
          imagesrc: images.placeholder_album2
        },
        {
          key: 2,
          backgroundColor: 'white',
          imagesrc: images.placeholder_album3
        },
        {
          key: 3,
          backgroundColor: 'white',
          imagesrc: images.placeholder_album4
        },
        {
          key: 4,
          backgroundColor: 'white',
          imagesrc: images.placeholder_album5
        },
        {
          key: 5,
          backgroundColor: 'white',
          imagesrc: images.placeholder_album6
        },
        {
          key: 6,
          backgroundColor: 'skyblue',
          imagesrc: images.placeholder_mainalbum
        },
      ],
    }
  }

  handlePressIn() {
    if(this.state.numEnabled <= 1){
      this.pressEnabled = false
    }
    // Need to change with an actual hold down
    this.tapTimer = setTimeout( () => {
      if(this.initialKeySelected === this.keySelected && this.initialMoveOutOfFrameX === 0 && this.initialMoveOutOfFrameY === 0 && this.allowSwap === true){
        this.pressEnabled = true

        let box = this.refs["pictureBox" + this.keySelected];
        box.setNativeProps({
          style: { opacity:0.7, transform:[{scale:1.1}]},
        })
        this.setState({renderDelete: false});

      } else {
        this.pressEnabled = false
      }
    }, 600)
  }

  resetGrid(){
    // reset big box
    let box = this.refs["pictureBox" + this.state.numEnabled];
    box.setNativeProps({
      style: {top:0, left:0, opacity:1, transform:[{scale:1.0}]},
    });

    // reset small boxes
    for(i=0; i<this.state.numEnabled; i++){
      fixed_top = Math.floor(i/3)*this._smallBoxHeight + largeBoxHeight;
      fixed_left = (i%3)*this._smallBoxWidth;

      let box = this.refs["pictureBox" + i];
      box.setNativeProps({
        style: {top:fixed_top, left:fixed_left, opacity:1, transform:[{scale:1.0}]},
      });
      console.log('setting prop location for pictureBox ' + i )
    }


  }

  handlePressOut() {
    this.pressEnabled = false
    // Snap to grid
    this.resetGrid()
    this.setState({renderDelete: true});
  }

  setPressEnabled(status){
    this.pressEnabled = status;
  }

  componentWillUnmount = () => { if (this.tapTimer) clearTimeout(this.tapTimer) }

  componentWillMount(){
    // Handle the pannign responders
    this._panResponder = PanResponder.create({
      onPanResponderTerminate:             (evt, gestureState) => {this.handlePressOut()},
      onStartShouldSetPanResponder:        (evt, gestureState) => {
        console.log('starting signal')
        this.initialMoveOutOfFrameX = 0
        this.initialMoveOutOfFrameY = 0
        this.handlePressIn()

        const {pageX, pageY} = evt.nativeEvent;

        offsetPageY = pageY-HEADER_SIZE
        this.typeOfBoxSelected = offsetPageY < largeBoxHeight ? 'LARGE': 'SMALL'

        if(this.typeOfBoxSelected === 'SMALL'){
          smallBoxTopIndex =  Math.floor((offsetPageY - largeBoxHeight) / smallBoxHeight);
          smallBoxLeftIndex = Math.floor(pageX / smallBoxWidth)
          this.keySelected = smallBoxTopIndex*3 + smallBoxLeftIndex
          this.prev_left = smallBoxWidth * smallBoxLeftIndex;
          this.prev_top = smallBoxHeight * smallBoxTopIndex + largeBoxHeight;
        } else {
          this.keySelected = this.state.numEnabled;
          this.prev_left = 0;
          this.prev_top = 0;
        }

        this.setState({
          selected: this.keySelected,
        });
        this.initialKeySelected = this.keySelected;
        return gestureState.dx!==0 || gestureState.dx!==0;
      },
      onMoveShouldSetPanResponder:         (evt, gestureState) => {
        const {pageX, pageY} = evt.nativeEvent;

        // for handling touch and then drag out of frame case
        this.initialMoveOutOfFrameX = pageX;
        this.initialMoveOutOfFrameY = pageY;

        return this.pressEnabled
      },
      onShouldBlockNativeResponder:        (evt, gestureState) => true,
      onPanResponderTerminationRequest:    (evt, gestureState) => true,
      onPanResponderGrant:                  (evt, gestureState)=> {

      },
      onPanResponderMove: (evt, gestureState) => {
        this.left = this.prev_left + gestureState.dx;
        this.top =  this.prev_top + gestureState.dy;

        if(this.initialKeySelected !== this.state.numEnabled){
          if(this.typeOfBoxSelected === 'LARGE'){
            let box = this.refs["pictureBox" + this.state.numEnabled];
            box.setNativeProps({
              style: {top:this.top, left:this.left},
            });
          }
        } else {
          let box = this.refs["pictureBox" + this.state.numEnabled];
          box.setNativeProps({
            style: {top:0, left:0},
          });
        }
        if(this.typeOfBoxSelected === 'SMALL') {
          let box = this.refs["pictureBox" + this.keySelected];
          // console.log(this.left)
          box.setNativeProps({
            style: {top:this.top, left:this.left},
          })
        }

        this._endMove(evt, gestureState)

      },
      onPanResponderRelease: (evt, gestureState) =>{
        if(this.typeOfBoxSelected === 'LARGE'){
          let box = this.refs["pictureBox"+this.state.numEnabled];
          box.setNativeProps({
            style: {opacity:1,}
          });
        }

        if(this.typeOfBoxSelected === 'SMALL') {
          let box = this.refs["pictureBox" + this.keySelected];
          box.setNativeProps({
            style: {opacity:1,}
          })
        }
        this.typeOfBoxSelected = undefined;
        this.initialKeySelected = 0;

        // TODO: cleanup and fixes on release
        this.handlePressOut();


      },
    });
  }

  _endMove(evt, gestureState) {
    console.log('initial key selected:   ' + this.initialKeySelected)
    if(this.keySelected !== this.state.numEnabled && this.initialKeySelected !== this.state.numEnabled){
      topIndexDraggedOver = Math.floor((this.top-largeBoxHeight) / this._smallBoxHeight + 0.5);
      leftIndexDraggedOver = Math.floor(this.left/this._smallBoxWidth + 0.5);

      if((0 > topIndexDraggedOver)){
        console.log('swapping with big')
        draggedOverIndex = (topIndexDraggedOver*3 + leftIndexDraggedOver)%this.state.numEnabled;

        if (draggedOverIndex < 0){
          draggedOverIndex = this.state.numEnabled
        }

        let albumPictures = this.state.albumPictures;
        let movedBox = albumPictures[this.keySelected];

        albumPictures.splice(this.keySelected, 1);
        albumPictures.splice(draggedOverIndex, 0, movedBox);

        this.setState({
          albumPictures
        })

        if (draggedOverIndex !== this.keySelected) {
          this.keySelected = draggedOverIndex
          this.setState({
            selected: draggedOverIndex,
          });
        }
      }

      if ((-1 < topIndexDraggedOver) && (topIndexDraggedOver < 2) && (-1 < leftIndexDraggedOver) && (leftIndexDraggedOver < 3)){
        draggedOverIndex = (topIndexDraggedOver*3 + leftIndexDraggedOver)%this.state.numEnabled;

        let albumPictures = this.state.albumPictures;
        let movedBox = albumPictures[this.keySelected];

        albumPictures.splice(this.keySelected, 1);
        albumPictures.splice(draggedOverIndex, 0, movedBox);

        this.setState({
          albumPictures
        })

        if (draggedOverIndex !== this.keySelected) {
          this.keySelected = draggedOverIndex
          this.setState({
            selected: draggedOverIndex,
          });
        }

      } else {
        let box = this.refs["pictureBox" + this.keySelected];
        let top = this.topIndex*this._smallBoxHeight;
        let left = this.leftIndex*this._smallBoxWidth;
        LayoutAnimation.configureNext(this.animations);
      }
      LayoutAnimation.configureNext(this.animations);

    } else {
      const {pageY, pageX} = evt.nativeEvent
      leftIndexDraggedOver = -1
      topIndexDraggedOver = -1

      if(pageY > largeBoxHeight+HEADER_SIZE && pageY < largeBoxHeight+HEADER_SIZE+smallBoxHeight*2){
        if(pageY > largeBoxHeight+HEADER_SIZE && pageY < largeBoxHeight+HEADER_SIZE+smallBoxHeight)
          topIndexDraggedOver = 0
        else topIndexDraggedOver = 1

        if(pageX < smallBoxWidth && pageX > 0)
          leftIndexDraggedOver = 0
        else if (pageX < smallBoxWidth*2 && pageX > smallBoxWidth)
          leftIndexDraggedOver = 1
        else if (pageX < smallBoxWidth*3 && pageX > smallBoxWidth*2)
          leftIndexDraggedOver = 2
      } else {
        leftIndexDraggedOver = -1
        topIndexDraggedOver = -1
      }

      if (this.initialKeySelected !== this.state.numEnabled){
        let box = this.refs["pictureBox" + this.state.numEnabled];
        box.setNativeProps({
          style: {top:0, left:0},
        });

        if(leftIndexDraggedOver > -1 && topIndexDraggedOver > -1)
        {
          draggedOverIndex = (topIndexDraggedOver*3 + leftIndexDraggedOver)%this.state.numEnabled;
          let albumPictures = this.state.albumPictures;
          let movedBox = albumPictures[this.keySelected];

          albumPictures.splice(this.keySelected, 1);
          albumPictures.splice(draggedOverIndex, 0, movedBox);
          this.setState({
            albumPictures
          })
          if (draggedOverIndex !== this.keySelected) {

            this.keySelected = draggedOverIndex
            this.setState({
              selected: draggedOverIndex,
            });
          }
          LayoutAnimation.configureNext(this.animations);
        } else {
          let box = this.refs["pictureBox" + this.keySelected];
          let top = this.topIndex*this._smallBoxHeight;
          let left = this.leftIndex*this._smallBoxWidth;
        }
      }

      if (this.initialKeySelected == this.state.numEnabled){
        if(leftIndexDraggedOver > -1 && topIndexDraggedOver > -1)
        {
          draggedOverIndex = (topIndexDraggedOver*3 + leftIndexDraggedOver)%this.state.numEnabled;
          let albumPictures = this.state.albumPictures;
          let movedBox = albumPictures[this.keySelected];
          albumPictures.splice(this.keySelected, 1);
          albumPictures.splice(draggedOverIndex, 0, movedBox);
          this.setState({
            albumPictures
          })

          if (draggedOverIndex !== this.keySelected) {
            console.log('dragged over different index' + draggedOverIndex)

            this.keySelected = draggedOverIndex
            this.setState({
              selected: draggedOverIndex,
            });
            LayoutAnimation.configureNext(this.animations);
          }
        } else {
          let box = this.refs["pictureBox" + this.keySelected];
          let top = this.topIndex*this._smallBoxHeight;
          let left = this.leftIndex*this._smallBoxWidth;
        }
      }
    }

    if (this.initialKeySelected === this.state.numEnabled){
      const {pageY, pageX} = evt.nativeEvent

      if(pageY < largeBoxHeight+HEADER_SIZE){
        draggedOverIndex = this.state.numEnabled
        let albumPictures = this.state.albumPictures;
        let movedBox = albumPictures[this.keySelected];

        albumPictures.splice(this.keySelected, 1);
        albumPictures.splice(draggedOverIndex, 0, movedBox);

        this.setState({
          albumPictures
        })

        if (draggedOverIndex !== this.keySelected) {
          this.keySelected = draggedOverIndex
          this.setState({
            selected: draggedOverIndex,
          });
        }
      }
    }
  }

  deleteAlbumAtIndex(index){
    // update dictionary
    console.log('deleting item at index' + index)
    let albumPictures = this.state.albumPictures;
    // Delete count of 1 at index.
    albumPictures.splice(index, 1);
    this.setState({
      albumPictures
    })

    this.setState({numEnabled: this.state.numEnabled-1})
    if(this.state.numEnabled < 2){
      this.allowSwap = false;
    }
    console.log(this.allowSwap)
  }

  _toRenderDelete(){
    const deleteButtons = this.state.albumPictures.map((elem, index) => {
      DELETE_BUTTON_WIDTH = 30
      if(index !== this.state.numEnabled){
        let top = Math.floor(index/3) * this._smallBoxHeight + largeBoxHeight;
        let left = (index % 3) * this._smallBoxWidth + this._smallBoxWidth - (DELETE_BUTTON_WIDTH);
        return(
          <Button key={'deleteButton' + elem.key} onPress={()=> this.deleteAlbumAtIndex(index)}>
          <View ref={'deleteRef'+elem.key} key={'deleteKey' + elem.key}
              style={{position:'absolute',
                      top, left,
                      height: DELETE_BUTTON_WIDTH,
                      width: DELETE_BUTTON_WIDTH,
                      backgroundColor: 'blue',
                      borderRadius:DELETE_BUTTON_WIDTH/2}}>
          </View>
          </Button>
        );
      }
    })

    if (this.state.renderDelete)
      return deleteButtons
    else
      return
  }

  render(){
    this.pictures = this.state.albumPictures.map((elem, index) => {
      if(index !== this.state.numEnabled){
        let top = Math.floor(index/3) * this._smallBoxHeight + largeBoxHeight;
        let left = (index % 3) * this._smallBoxWidth;
        return (
            <View ref={'pictureBox'+index}
                  key={elem.key}
                  style={[styles.smallPictureBox, {top, left}]} >
                    <View style={[styles.smallPictureBoxContainer,]}>
                      <Image source={elem.imagesrc} style={styles.smallPictureBoxContainer}/>
                    </View>
            </View>
        );
      }

      return(
          <View ref={'pictureBox'+this.state.numEnabled}
                key={elem.key}
                style={[styles.mainPictureBox, {top:0, left:0}]} >
              <View style={[styles.mainPictureBoxContainer,]}>
                <Image source={elem.imagesrc} style={styles.mainPictureBoxContainer}/>

              </View>
          </View>
        );
    })

    let selectedItem = this.pictures[this.state.selected];
    this.pictures.splice(this.state.selected, 1);
    this.pictures.push(selectedItem);

    return (
      <View>
        <View {...this._panResponder.panHandlers}>
          <View style={styles.smallPicturesContainer}>
          {this.pictures}
          </View>
        </View>
        {/* DELETE BUTTONS */}
        <View style={{position:'absolute'}}>
          {this._toRenderDelete()}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  smallPicturesContainer:{    // OVERALL CONTAINER
    width: screenWidth,
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
