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


export default class PanningRectExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)

    // album is an object with a property that is a function named setNativeProps
    // is by default null until an object is assigned to it
    // setNativeProps returns void
    // album: (null : ?{ setNativeProps(props: Object): void }),
    }
  }


  componentWillMount(){
    // Handle the pannign responders

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});

        Animated.sequence([
          Animated.spring(
            this.state.scale,
            { toValue: 1.1, friction: 3 }
          ),

        ]).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();

        // Animated.sequence([
          Animated.spring(
            this.state.scale,
            { toValue: 1, friction: 3 }
          ).start();
          Animated.spring(            //Step 1
              this.state.pan,         //Step 2
              {toValue:{x:0,y:0}}     //Step 3
          ).start();
        // ]).start();
      }
    });


  }

  render(){


    return (
      <View
        style={styles.container}>
        <View style = {styles.dropZone}>
          <Text> DRAG TO HERE </Text>
        </View>

        { this.renderDraggable() }
      </View>
    );
  }

  renderDraggable(){
    let { pan, scale } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let rotate = '0deg';
    let albumStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    return (
      <View style={styles.draggableContainer}>
      <Animated.View
        style={[albumStyle, styles.album]}
        {...this._panResponder.panHandlers}
      />
      </View>
    );
  }




}


let Window = Dimensions.get('window');

var styles = StyleSheet.create({
  album: {
    backgroundColor: 'green',
    height: 80,
    width: 100,
    top: 240,
  },

  draggableContainer:{
    position: 'absolute',

  },

  dropZone: {
    height: 200,
    margin:20,
    backgroundColor:'#2c3e50'
  },

  container: {
    flex: 1,
    // justifyContent: 'center',
  },

});
