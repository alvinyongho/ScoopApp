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



export default class PanningRectExample extends React.Component {

  _panResponder: {}

  componentWillMount(){
    // Handle the pannign responders
    this._panResponder = PanResponder.create({
      // Ask to become the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so that the user
        // knows what is happening

        // gestureState.d{x,y} will be set to zero for now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // accumulated move distance is:
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the responder
        // This usually means that the gesture has succeeded
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether the component should block native components from
        // becoming the JS responder. Returns true by default
        // Only supported by ANDROID

        return true;
      },


    })

  }

  render(){
    return (
      <View {...this._panResponder.pandHandlers} />
    )
  }

}


var styles = StyleSheet.create({


});
