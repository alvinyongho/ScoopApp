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

var SMALL_RECT_HEIGHT = 75
var MARGIN_SPACE = 15
var NUM_SMALL_RECTS = 6 //per row... has to be an even
var NUM_ROWS = 2


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export default class EditPhotoAlbum extends React.Component {

  componentWillMount(){
    // row_with_cells = []
    cells = []


    for (var i = 0; i < NUM_SMALL_RECTS; i++) {
      //Left Cell
      if(i%(NUM_SMALL_RECTS/NUM_ROWS) === 0){
        cells.push(
          <View key={'smallCell_'+i} style={[styles.leftSmallRect,styles.draggableContainer]}>
            <Animated.View />
          </View>
        );
      }
      //Right Cell
      else if(i%(NUM_SMALL_RECTS/NUM_ROWS) === (NUM_SMALL_RECTS/NUM_ROWS)-1){
        cells.push(
          <View key={'smallCell_'+i} style={[styles.rightSmallRect,styles.draggableContainer]}>
            <Animated.View />
          </View>
        );
      }
      //Middle Cell(s)
      else {
        cells.push(
          <View key={'smallCell_'+i} style={[styles.midSmallRect,styles.draggableContainer]}>
            <Animated.View />
          </View>
        );
      }
    }



    this.setState({cells})

  }

  render(){
    return (
      <View style={styles.container}>
        {/* BIG RECT */}
        <View style={styles.bigRectContainer}>
        </View>

        {/* SMALL RECTS */}
        <View style={styles.smallRectsContainer}>
          {this.state.cells}
        </View>


      </View>
    )
  }

}

NUM_SMALL_RECTS_PER_ROW = NUM_SMALL_RECTS/NUM_ROWS
NUM_GAPS_BETWEEN_RECTS = NUM_SMALL_RECTS_PER_ROW-1
NUM_GAPS_TOTAL = NUM_GAPS_BETWEEN_RECTS + 2 // Left and right margin
CELL_WIDTH = ((screenWidth-NUM_GAPS_TOTAL*MARGIN_SPACE)/NUM_SMALL_RECTS_PER_ROW)

var styles = StyleSheet.create({
  container:{
    margin:MARGIN_SPACE
  },
  bigRectContainer: {
    backgroundColor: 'skyblue',
    flex: 1,
    height: 200
  },
  smallRectsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: MARGIN_SPACE
  },
  leftSmallRect:{
    height: SMALL_RECT_HEIGHT,
    width: CELL_WIDTH,
    marginRight: MARGIN_SPACE/2,
    backgroundColor: 'orange',
    marginBottom: MARGIN_SPACE,
  },
  midSmallRect:{
    height: SMALL_RECT_HEIGHT,
    width: CELL_WIDTH,
    marginLeft: MARGIN_SPACE/2,
    marginRight:MARGIN_SPACE/2,
    backgroundColor: 'red',
    marginBottom: MARGIN_SPACE,
  },
  rightSmallRect:{
    height: SMALL_RECT_HEIGHT,
    width: CELL_WIDTH,
    marginLeft: MARGIN_SPACE/2,
    backgroundColor: 'green',
    marginBottom: MARGIN_SPACE,
  },
  draggableContainer:{

  }


});
