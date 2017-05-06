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






    this.panCapture = false;


    // the last item set as selected
    this.state = {

        activeBlock: null,
        selected: 6,
        // mainPicture: {
        //   key: 'mainPicture',
        //   backgroundColor: 'skyblue'
        // },
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
      onPanResponderTerminate:             (evt, gestureState) => {},
      onStartShouldSetPanResponder:        (evt, gestureState) => {
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
          this.keySelected = 6
          this.prev_left = 0;
          this.prev_top = 0;
        }

        return true
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,

      onMoveShouldSetPanResponder:         (evt, gestureState) => this.panCapture,
      onMoveShouldSetPanResponderCapture:  (evt, gestureState) => this.panCapture,

      onShouldBlockNativeResponder:        (evt, gestureState) => false,
      onPanResponderTerminationRequest:    (evt, gestureState) => false,

      onPanResponderGrant:                  (evt, gestureState)=> {
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
      onPanResponderMove:    (evt, gestureState) => {
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

        this._endMove(evt, gestureState)

      },
      onPanResponderRelease: (evt, gestureState) =>{
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
    });
  }


  _endMove(evt, gestureState) {

    finalTopIndex = Math.floor((this.top-largeBoxHeight) / this._smallBoxHeight + 0.5);
    finalLeftIndex = Math.floor(this.left/this._smallBoxWidth + 0.5);
    console.log(finalTopIndex)
    console.log(finalLeftIndex)
  }

  //
  // onActiveBlockIsSet = (fn) => (evt, gestureState) => {
  //   if (this.state.activeBlock != null) fn(evt, gestureState)
  // }

  // When the layout of the view gets loaded we set an async function that will
  // bind the DropZoneLayout after the styles all get loaded

  render(){

    const pictures = this.state.albumPictures.map((elem, index) => {

      if(elem.key !== 6){
        let top = Math.floor(elem.key/3) * this._smallBoxHeight + largeBoxHeight;
        let left = (elem.key % 3) * this._smallBoxWidth;
        return (
            <View ref={'smallPictureBox'+elem.key}
                  key={elem.key}
                  style={[styles.smallPictureBox, {top, left}]} >

              <View style={[styles.smallPictureBoxContainer, {backgroundColor:elem.backgroundColor}]}>
                {/* TODO: add image here */}
                <Text> PICTURE </Text>
              </View>
            </View>
        );
      }

      return(
          <View ref={'mainPictureBox'}
                key={elem.key}
                style={[styles.mainPictureBox, {top:0, left:0}]} >

              <View style={[styles.mainPictureBoxContainer, {backgroundColor:elem.backgroundColor}]}>
                <Text> PICTURE </Text>
              </View>
          </View>
        );


    })

    let selectedItem = pictures[this.state.selected];
    pictures.splice(this.state.selected, 1);
    pictures.push(selectedItem);

    return (
      <View {...this._panResponder.panHandlers}>
        {pictures}
      </View>
    );
  }



  activateDrag = (key) => () => {
    // this.panCapture = true
    // this.onDragStart( this.itemOrder[key] )
    // this.setState({ activeBlock: key })
    // this._defaultDragActivationWiggle()
    console.log('actiating drag')

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
