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


boxHeight = screenWidth/3 - 35
boxWidth = screenWidth/3 - 15


export default class PanningRectExample extends React.Component {

  constructor(props) {
    super(props);
    this._width = boxWidth;
    this._height = boxHeight


    // the last item set as selected
    this.state = {
        selected: 5,
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
        ]
    }
  }

  componentWillMount(){
    // Handle the pannign responders
    this._panResponder = PanResponder.create({
    });
  }

  // When the layout of the view gets loaded we set an async function that will
  // bind the DropZoneLayout after the styles all get loaded

  render(){

    const picturesBoxes = this.state.albumPictures.map((elem, index) => {
      let top = Math.floor(index/3) * this._height;
      let left = (index % 3) * this._width;
      return (
        <View ref={"pictureBox" + index} key={elem.key} style={[styles.pictureBox, {top, left}]} >
          <View style={[styles.pictureBoxContainer, {backgroundColor:elem.backgroundColor}]}>
            {/* TODO: add image here */}
            <Text> Content Here </Text>
          </View>
        </View>
      );
    })
    return (
      <View
        style={styles.smallAlbumsContainer}>
          {picturesBoxes}
      </View>
    );
  }




}




var styles = StyleSheet.create({
  smallAlbumsContainer:{
    width: screenWidth,
    backgroundColor: 'skyblue',
    margin: MARGIN
  },

  pictureBoxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: screenWidth/3 - 15,
    height:screenWidth/3 - 35,
  },


  pictureBox:{
    width: screenWidth/3 - 15,
    height: screenWidth/3 - 35,
    backgroundColor:"#fff",
    position:"absolute",
    left:0,
    top:0,
  },

});
