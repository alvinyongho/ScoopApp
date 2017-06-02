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
  Animated,
  PropTypes
} from 'react-native';



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
      disabled: this.props.disabled,
    })
  }

  static propTypes = {
    hasSteps: React.PropTypes.bool,                   // Sets whether the thumb snaps to the value defined by numSteps
    numSteps: React.PropTypes.number,                 // The number of steps
    debug: React.PropTypes.bool,                      // prints debug messages
    thumbSize: React.PropTypes.number,                // Sets the outer thumb size
    thumbBorderRadiusWidth: React.PropTypes.number,   // Sets the inner thumb width size by subtracting the outer thumb size with this defined value
    thumbColor: React.PropTypes.string,               // Sets the the inner thumb color
    sliderLeftRightMargin: React.PropTypes.number,    // Sets the left and right margins of the slider
    sliderHeight: React.PropTypes.number,             // sets the height of the slider
    thumbs:    React.PropTypes.array,
    sliderColor: React.PropTypes.string,
  }

  static defaultProps = {
    hasSteps: false,
    numSteps: 3,
    debug: false,
    thumbSize: 22,
    thumbBorderRadiusWidth: 4,
    thumbColor: 'orange',
    sliderColor: 'orange',
    sliderLeftRightMargin: 25,
    sliderHeight: 5,
    disabled: false,
    thumbs: [
              { initialPosition: 0, },
              { initialPosition: 1, },
            ]
  }

  computeReleasedPositions = () => {
    return this.state.thumbPositions.map((animValue, index) => {
      return (animValue.x._value/this.state.sliderWidth)
    })
  }

  componentWillMount() {
    // creates an array of thumbPanResponders that maps to the index of thumb
    this.thumbPanResponders = this.props.thumbs.map((key, index) => {
      return PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
          this.props.changeScrollState(false);
          this.setActiveThumb(index)
        },
        onPanResponderMove: (evt, gestureState) => {
          if (this.state.disabled) {
            return;
          }

          const {moveX, dx} = gestureState
          thumbPositions = this.state.thumbPositions

          if(this.thumbPrevPositions[index]){
            newX = dx+this.thumbPrevPositions[index].x
            if (newX < 0) newX = 0
            if (newX > this.state.sliderWidth) newX = this.state.sliderWidth
            thumbPositions[index].x.setValue(newX)
            this.setState({thumbPositions})

            this.props.onThumbMove(this.computeReleasedPositions())
          }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          if (this.state.disabled) {
            return;
          }

          if(this.props.hasSteps){
            const indexToSnapTo = Math.round(this.state.thumbPositions[index].x._value/this.state.stepDistance)
            const xPositionToSnapTo = indexToSnapTo * this.state.stepDistance
            this.state.thumbPositions[index].x.setValue(xPositionToSnapTo)
          }

          this.thumbPrevPositions[index].x = this.state.thumbPositions[index].x._value
          this.props.onRelease(this.computeReleasedPositions());
          this.setActiveThumb(null)
          this.props.changeScrollState(true);
        },
        onPanResponderTerminate: (evt, gestureState) => {},
        onShouldBlockNativeResponder: (evt, gestureState) => true,
      });
    })
  }

  setActiveThumb = (key) => {
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
    // Handling case where thumb does NOT exceeds ends of the bar
    let trueWidth = width - this.props.thumbSize
    this.setState({sliderWidth: trueWidth})
    // Set the step distance
    if(this.props.hasSteps)
      this.setStepDistances(trueWidth)

  }

  setStepDistances(width){
    this.setState({stepDistance: width/(this.props.numSteps-1)})
  }

  getThumbComputedPosition(key){
    if (this.state.thumbPositions[key]){
      return this.state.thumbPositions[key].x._value
    }
  }

  getThumbStyle(key){
    if(this.finishedLayoutSetup && this.state.thumbPositions.length == this.props.thumbs.length){
      return [styles.thumbOuter,
              {height: this.props.thumbSize,
              width: this.props.thumbSize,
              borderRadius: this.props.thumbSize/2, left: this.getThumbComputedPosition(key)},
              this.state.activeThumb === key && { /* TODO: Add granted style effect */ }
             ]
    }

    return({
      height: this.props.thumbSize,
      width: this.props.thumbSize,
      borderRadius: this.props.thumbSize/2,
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

    thisPosition.x = this.state.sliderWidth * this.props.thumbs[key].initialPosition
    thumbPosition = new Animated.ValueXY(thisPosition)

    this.thumbPrevPositions[key] = thisPosition
    thumbPositions[key] = thumbPosition
    this.setState({thumbPositions})

    if(this.state.thumbPositions.length === this.props.thumbs.length){
      this.finishedLayoutSetup = true;
    }
  }

  setLayerPosition = (key) => key === this.state.activeThumb && { zIndex: 1 }

  _renderThumbs(){
    const thumbViews = this.props.thumbs.map((key, index) => {
      return(
        <Animated.View {...this.thumbPanResponders[index].panHandlers} onLayout={this._saveThumbPositions(index)} style={[styles.thumbContainer, this.setLayerPosition(index)]} key={index}>
          {this.finishedLayoutSetup &&
            <View style={this.getThumbStyle(index)}>
              <View style={[styles.thumbInner,
                       {height: this.props.thumbSize-this.props.thumbBorderRadiusWidth,
                        width: this.props.thumbSize- this.props.thumbBorderRadiusWidth,
                        backgroundColor: this.props.thumbColor,
                        borderRadius: (this.props.thumbSize-this.props.thumbBorderRadiusWidth)/2,}]} />
            </View>
          }
        </Animated.View>
      );
    })
    return thumbViews;
  }

  render() {
    return(
      <View style={{flex:1, marginLeft:this.props.sliderLeftRightMargin, marginRight: this.props.sliderLeftRightMargin, justifyContent: 'center'}}>
        <View onLayout={this._setSliderWidth}
                 style={[styles.sliderContainer,
                        {backgroundColor: this.props.sliderColor,
                         height: this.props.sliderHeight,
                         borderRadius: this.props.sliderHeight/2}
                       ]}
        />
          {this.state.sliderWidth && this._renderThumbs()}
      </View>
    );
  }
}


var styles = StyleSheet.create({
  sliderContainer: {
  },
  thumbContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbOuter: {
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbInner: {
  }
})
