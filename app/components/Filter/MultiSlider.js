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

numThumbs = 2
thumbs = [{
    initialPosition: 0,
  },
  {
    initialPosition: 1,
  },
]

hasSteps = true
numSteps = 3
debug = true
thumbSize = 22
thumbBorderRadiusWidth = 4
thumbColor = 'orange'
sliderLeftRightMargin = 25
sliderHeight = 5


export default class MultiSlider extends Component{

  constructor(props){
    super(props)

    this.panCapture = false     //initially capture touch event from TouchableWithoutFeedback
    this.thumbPrevPositions = []
    this.finishedLayoutSetup = false

    this.state = ({
      isSliderWidthSet: false,
      sliderWidth: null,
      stepDistance: null,
      thumbPositions: [],
      activeThumb: null,
    })
  }

  componentWillMount() {
    this.thumbPanResponders = thumbs.map((key, index) => {
      return PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // console.log('granted for key' + index)
          this.props.changeScrollState(false);
          // set the active block
          // The guesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}

          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
          const {moveX, dx} = gestureState
          thumbPositions = this.state.thumbPositions

          if(this.thumbPrevPositions[index]){
            newX = dx+this.thumbPrevPositions[index].x
            if (newX < 0) newX = 0
            if (newX > this.state.sliderWidth) newX = this.state.sliderWidth
            thumbPositions[index].x.setValue(newX)
            this.setState({thumbPositions})
          }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {

          this.thumbPrevPositions[index].x = this.state.thumbPositions[index].x._value


          this.props.changeScrollState(true);
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

    })



  }


  setActiveThumb = (key) => {
    console.log('setting the active block to ' + key)
    this.setState({activeThumb: key})
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
    var {x, y, width} = event.nativeEvent.layout
    this.setState({sliderWidth: width})
    // Set the step distance
    if(hasSteps)
      this.setStepDistances(width)

  }

  setStepDistances(width){
    this.setState({stepDistance: width/numSteps})
    // if(debug)
    //   console.log('setting the stepDistance to ' + width/numSteps)
  }

  getThumbComputedPosition(key){
    if (this.state.thumbPositions[key]){
      return this.state.thumbPositions[key].x._value - (thumbSize/2)
    }
  }

  getThumbStyle(key){

    if(this.finishedLayoutSetup && this.state.thumbPositions.length == numThumbs){
      return [styles.thumbOuter, {left: this.getThumbComputedPosition(key)}]
    }

    return({
      height: thumbSize,
      width: thumbSize,
      borderRadius: thumbSize/2,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    })

  }


  // on layout set initial position as Animated.ValueXY
  _saveThumbPositions = (key) => ({nativeEvent}) => {

      let thisPosition = {
        x: nativeEvent.layout.x,
        y: nativeEvent.layout.y,
      }
      let thumbPositions = this.state.thumbPositions

      thisPosition.x = this.state.sliderWidth * thumbs[key].initialPosition
      thumbPosition = new Animated.ValueXY(thisPosition)

      this.thumbPrevPositions[key] = thisPosition
      thumbPositions[key] = thumbPosition
      this.setState({thumbPositions})
    // }


    if(this.state.thumbPositions.length === numThumbs){
      console.log('finished layout setup')
      this.finishedLayoutSetup = true;
    }

  }


  _renderThumbs(){
    const thumbViews = thumbs.map((key, index)=> {
      return(
        <Animated.View {...this.thumbPanResponders[index].panHandlers} onLayout={this._saveThumbPositions(index)} style={styles.thumbContainer} key={index}>
          {this.finishedLayoutSetup &&
            <View style={this.getThumbStyle(index)}>
              <View style={styles.thumbInner} />
            </View>
          }
        </Animated.View>
      );
    })
    return thumbViews;
  }

  render() {
    return(
      <View style={{flex:1, height: 50, marginLeft:25, marginRight: 25, backgroundColor: 'gray', justifyContent: 'center'}}>
        <View onLayout={this._setSliderWidth} style={styles.sliderContainer} />
        {this.state.sliderWidth &&
            this._renderThumbs()
        }
      </View>
    );
  }
}


var styles = StyleSheet.create({
  sliderContainer: {
    height: sliderHeight,
    borderRadius: sliderHeight/2,
    backgroundColor: 'orange'
  },
  thumbContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbOuter: {
    position: 'absolute',
    height: thumbSize,
    width: thumbSize,
    borderRadius: thumbSize/2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbInner: {
    height: thumbSize-thumbBorderRadiusWidth,
    width: thumbSize-thumbBorderRadiusWidth,
    borderRadius: (thumbSize-thumbBorderRadiusWidth)/2,
    backgroundColor: thumbColor
  }

})
