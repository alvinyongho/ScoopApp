import React, {Component} from 'react'


import {
  View,
  Text,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet

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

  constructor(props) {
    super(props);
    this._smallBoxWidth = smallBoxWidth;
    this._smallBoxHeight = smallBoxHeight;



    this.keySelected = 0;
    this.typeOfBoxSelected = undefined;



    this.left = 0;
    this.top = 0;
    this.prev_left = 0;
    this.prev_top = 0;



    // the last item set as selected
    this.state = {
        selected: null,
        mainPicture: {
          key: 'mainPicture',
          backgroundColor: 'skyblue'
        },
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
            backgroundColor: 'purple'
          }
        ],


    }
  }

  componentWillMount(){
    // Handle the pannign responders
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        // Should start pan responder if something in view selected
        return gestureState.dx!==0 || gestureState.dy !==0;
      },

      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        const {pageX, pageY, target, locationX, locationY} = evt.nativeEvent;

        offsetPageY = pageY-HEADER_SIZE
        this.typeOfBoxSelected = offsetPageY < largeBoxHeight ? 'LARGE': 'SMALL'

        if(this.typeOfBoxSelected === 'SMALL'){
          // Determine the index of the small box selected
          smallBoxTopIndex =  Math.floor((offsetPageY - largeBoxHeight) / smallBoxHeight);
          smallBoxLeftIndex = Math.floor(pageX / smallBoxWidth)
          this.keySelected = smallBoxTopIndex*3 + smallBoxLeftIndex

          // console.log(smallBoxWidth*smallBoxLeftIndex)
          this.prev_left = smallBoxWidth * smallBoxLeftIndex;
          this.prev_top = smallBoxHeight * smallBoxTopIndex + largeBoxHeight;
          console.log(this.prev_top)


        } else {
          this.keySelected = 'mainPicture'
          this.prev_left = 0;
          this.prev_top = 0;
        }

        return true
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          selected: this.keySelected,
        });

        if(this.typeOfBoxSelected === 'LARGE'){
          console.log('handle large drag')

          let box = this.refs["mainPictureBox"];
          box.setNativeProps({
            style: { opacity:0.7, }
          })
        }
        else if(this.typeOfBoxSelected === 'SMALL') {
          console.log('handle small drag')
          let box = this.refs["smallPictureBox" + this.keySelected];
          box.setNativeProps({
            style: {
              opacity:0.7,
              }
          })
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        this.left = this.prev_left + gestureState.dx;
        this.top =  this.prev_top + gestureState.dy;


        if(this.typeOfBoxSelected === 'LARGE'){
          let box = this.refs["mainPictureBox"];
          box.setNativeProps({
            style: {top:this.top, left:this.left},
          });
        }

        if(this.typeOfBoxSelected === 'SMALL') {
          let box = this.refs["smallPictureBox" + this.keySelected];
          console.log(this.left)
          box.setNativeProps({
            style: {top:this.top, left:this.left},
          })
        }


      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if(this.typeOfBoxSelected === 'LARGE'){
          let box = this.refs["mainPictureBox"];
          box.setNativeProps({
            style: {opacity:1,}
          });
        }

        if(this.typeOfBoxSelected === 'SMALL') {
          let box = this.refs["smallPictureBox" + this.keySelected];
          box.setNativeProps({
            style: {opacity:1,}
          })
        }
        this.typeOfBoxSelected = undefined;
      },
      onPanResponderTerminate: (evt, gestureState) => this._release(evt, gestureState),
      onShouldBlockNativeResponder: (event, gestureState) => true,

    });
  }

  // When the layout of the view gets loaded we set an async function that will
  // bind the DropZoneLayout after the styles all get loaded

  render(){

    const smallPicturesBoxes = this.state.albumPictures.map((elem, index) => {
      let top = Math.floor(index/3) * this._smallBoxHeight + largeBoxHeight;
      let left = (index % 3) * this._smallBoxWidth;
      return (
        <View ref={"smallPictureBox" + index} key={elem.key} style={[styles.smallPictureBox, {top, left}]} >
          <View style={[styles.smallPictureBoxContainer, {backgroundColor:elem.backgroundColor}]}>
            {/* TODO: add image here */}
            <Text> PICTURE </Text>
          </View>
        </View>
      );
    })


    // // Move the selected picture to the end of the array.
    // let selectedPicture = smallPicturesBoxes[this.state.selected];
    // smallPicturesBoxes.splice(this.state.selected, 1);    //Remove selected picture DOM
    // smallPicturesBoxes.push(selectedPicture);    // Move it to the end


    const mainPictureBox =
      <View ref={"mainPictureBox"} key={this.state.mainPicture.key} style={[styles.mainPictureBox, {top:0, left:0}]} >
        <View style={[styles.mainPictureBoxContainer, {backgroundColor:this.state.mainPicture.backgroundColor}]}>
          <Text> PICTURE </Text>
        </View>
      </View>


    return (
      <View {...this._panResponder.panHandlers}>
        <View style={styles.mainPictureContainer}>
          {mainPictureBox}
        </View>

        <View style={styles.smallPicturesContainer}>
            {smallPicturesBoxes}
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



  mainPictureContainer: {
    width: largeBoxWidth,
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
