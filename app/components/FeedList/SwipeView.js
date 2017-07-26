import React, {Component} from 'react';

import {
  View,
  Text,
  PanResponder,
  StyleSheet,
  Animated
} from 'react-native'

export default class SwipeView extends Component{

  componentWillMount(){
    this.animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0}
    this.animatedValue.addListener((value) => this._value = value);

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // console.log('granted')
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        })

        this.animatedValue.setValue({ x: 0, y: 0})

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.animatedValue.x, dy: 0}
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (e, gestureState) => {



        this.animatedValue.flattenOffset();
        // console.log(this._value)

        if(this._value.x < -170){
          console.log( "swiped right")
        } else if(this._value.x > 170) {
          console.log( "swiped left")
        }



        Animated.spring(this.animatedValue,
          {toValue:{x:0,y:0}}
        ).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled

        this.animatedValue.flattenOffset();
        Animated.spring(this.animatedValue,
          {toValue:{x:0,y:0}}
        ).start();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }



  render(){
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    }
    return(
      <View style={styles.container}>
        <View style={{position: 'absolute', height: 150, width: 150, backgroundColor: 'blue'}} />
        <Animated.View {...this._panResponder.panHandlers} style={[styles.draggableCard, animatedStyle]}><Text>Test</Text></Animated.View>
      </View>
    )


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  draggableCard: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  }

})
