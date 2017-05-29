import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Slider,
  Image,
  PanResponder,
  Animated
} from 'react-native';


export default class MultiSlider extends Component{

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }


  render() {
    return(
      <View style={{flex:1, height: 50, backgroundColor: 'white', justifyContent: 'center'}}>
        <View style={{height: 5, borderRadius: 5/2, marginLeft: 25, marginRight: 25, backgroundColor: 'orange' }} />

        <Animated.View {...this._panResponder.panHandlers} style={{position: 'absolute', justifyContent: 'center' }}>
          <View style={{position: 'absolute', left: 50, height:22, width: 22, borderRadius: 22/2, backgroundColor:'white', justifyContent: 'center', alignItems:'center'}}>
            <View style={{height:18, width: 18, borderRadius: 18/2, backgroundColor: 'orange'}} />
          </View>

          <View style={{position: 'absolute', left: 100, height:22, width: 22, borderRadius: 22/2, backgroundColor:'white', justifyContent: 'center', alignItems:'center'}}>
            <View style={{height:18, width: 18, borderRadius: 18/2, backgroundColor: 'orange'}} />
          </View>
        </Animated.View>
      </View>
    );
  }
}
