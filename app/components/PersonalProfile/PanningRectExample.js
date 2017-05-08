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
  LayoutAnimation

} from 'react-native';

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


export default class PanningRectExample extends React.Component {

  constructor() {
    super();
    this._smallBoxWidth = smallBoxWidth;
    this._smallBoxHeight = smallBoxHeight;
    this.keySelected = 0;
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

    // the last item set as selected
    this.state = {
        numEnabled: 6,
        activeBlock: null,
        selected: 6,

        albumPictures: [
          {
            key: 0,
            backgroundColor: 'red'

          },
          {
            key: 1,
            backgroundColor: 'orange'
          },
          {
            key: 2,
            backgroundColor: 'yellow'
          },
          {
            key: 3,
            backgroundColor: 'green'
          },
          {
            key: 4,
            backgroundColor: 'blue'
          },
          {
            key: 5,
            backgroundColor: 'purple',

          },
          {
            key: 6,
            backgroundColor: 'skyblue'
          },
        ],
    }
  }

  componentWillMount(){
    // Handle the pannign responders
    this._panResponder = PanResponder.create({
      onPanResponderTerminate:             (evt, gestureState) => {this.initialKeySelected = 0},
      onStartShouldSetPanResponder:        (evt, gestureState) => {
        return gestureState.dx!==0 || gestureState.dx!==0;
      },
      onMoveShouldSetPanResponder:         (evt, gestureState) => true,
      onShouldBlockNativeResponder:        (evt, gestureState) => true,
      onPanResponderTerminationRequest:    (evt, gestureState) => true,
      onPanResponderGrant:                  (evt, gestureState)=> {

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

        if(this.typeOfBoxSelected === 'LARGE'){
          let box = this.refs["pictureBox" + this.state.numEnabled];
          box.setNativeProps({
            style: { opacity:0.7, }
          })
        }
        else if(this.typeOfBoxSelected === 'SMALL') {
          console.log('handle small drag')
          let box = this.refs["pictureBox" + this.keySelected];
          box.setNativeProps({
            style: {
              opacity:0.7,
              }
          })
        }
        this.initialKeySelected = this.keySelected;

      },
      onPanResponderMove:    (evt, gestureState) => {
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

  render(){
    this.pictures = this.state.albumPictures.map((elem, index) => {
      if(index !== this.state.numEnabled){
        let top = Math.floor(index/3) * this._smallBoxHeight + largeBoxHeight;
        let left = (index % 3) * this._smallBoxWidth;

        return (
            <View ref={'pictureBox'+index}
                  key={elem.key}
                  style={[styles.smallPictureBox, {top, left}]} >
              <View style={[styles.smallPictureBoxContainer, {backgroundColor:elem.backgroundColor}]}>
                <Text> PICTURE </Text>
              </View>
            </View>
        );
      }

      return(
          <View ref={'pictureBox'+this.state.numEnabled}
                key={elem.key}
                style={[styles.mainPictureBox, {top:0, left:0}]} >
              <View style={[styles.mainPictureBoxContainer, {backgroundColor:elem.backgroundColor}]}>
                <Text> PICTURE </Text>
              </View>
          </View>
        );
    })

    let selectedItem = this.pictures[this.state.selected];
    this.pictures.splice(this.state.selected, 1);
    this.pictures.push(selectedItem);

    console.log(this.state.albumPictures)
    return (
      <View {...this._panResponder.panHandlers}>
        <View style={styles.smallPicturesContainer}>
        {this.pictures}
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
