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

thumbs = {
  0: {
    initialPosition: 0,
  },
  1: {
    initialPosition: 1,
  },
}

hasSteps = true
numSteps = 3
debug = true
thumbSize = 22
thumbBorderRadiusWidth = 4
thumbColor = 'orange'

export default class MultiSlider extends Component{

  constructor(props){
    super(props)
    this.state = ({
      isSliderWidthSet: false,
      sliderWidth: null,
      stepDistance: null,

      thumbPositions: [],
      thumbPrevPositions: [],
    })
  }

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


  /*
    States set:
      sliderWidth       -> event.nativeEvent.layout.width
      isSliderWidthSet  -> true

    Sets the sliderWidth which is provided by the nativeEvents layout
    Afterwards, it toggles that the slider width is set so that we can
    spawn the thumbs
  */
  _setSliderWidth = (event) => {
    console.log('setting the slider width')
    var {x, y, width} = event.nativeEvent.layout
    this.setState({sliderWidth: width})

    // Set the step distance
    if(hasSteps)
      this.setStepDistances(width)

  }

  setStepDistances(width){
    this.setState({stepDistance: width/numSteps})

    if(debug)
      console.log('setting the stepDistance to ' + width/numSteps)
  }

  getThumbComputedPosition(key){
    if (this.state.thumbPrevPositions[key])
      return this.state.thumbPositions[key]
    else {
      console.log('thumb position does not exist! returning 0')
      return 0
    }
  }

  getThumbStyle(key){
    return {left: this.getThumbComputedPosition(key)}
  }

  _renderThumbs(){
    const thumbViews = Object.keys(thumbs).map((key, index)=> {
      return <View key={index} style={[styles.thumbOuterStyle, this.getThumbStyle(key)]}>
                <View style={styles.thumbInnerStyle} />
             </View>
    })
    return thumbViews;
  }

  render() {
    return(
      <View style={{flex:1, height: 50, backgroundColor: 'gray', justifyContent: 'center'}}>
        <View onLayout={this._setSliderWidth} style={{height: 5, borderRadius: 5/2, marginLeft: 25, marginRight: 25, backgroundColor: 'orange' }} />
        <Animated.View {...this._panResponder.panHandlers} style={{position: 'absolute', justifyContent: 'center' }}>
          {this._renderThumbs()}
        </Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  thumbOuterStyle: {
    position: 'absolute',
    height: thumbSize,
    width: thumbSize,
    borderRadius: thumbSize/2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbInnerStyle: {
    height: thumbSize-thumbBorderRadiusWidth,
    width: thumbSize-thumbBorderRadiusWidth,
    borderRadius: (thumbSize-thumbBorderRadiusWidth)/2,
    backgroundColor: thumbColor
  }

})
