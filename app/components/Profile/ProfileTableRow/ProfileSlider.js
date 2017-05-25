import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';


THUMB_SIZE = 27
THUMB_RADIUS = 4

class Slider extends Component {

  constructor(props){
    super(props)

    this.finishedLayoutSetup = false;

    this.prevX = null,


    this.state = ({
      thumbPosition: null,
      maxWidth: null,
      stepValue: null
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
        console.log(this.state.thumbPosition)
        this.props.changeScrollState(false);

      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if(!this.props.disabled){

        const {moveX, dx} = gestureState

        thumbPosition = this.state.thumbPosition
        newX = dx+this.prevX
        if (newX < 0) newX = 0
        if (newX > this.state.maxWidth-THUMB_SIZE) newX = this.state.maxWidth-THUMB_SIZE

        thumbPosition.x.setValue(newX)

        console.log(thumbPosition.x._value)
        this.setState({thumbPosition})

        }

      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded

        this.prevX = this.state.thumbPosition.x._value
        this.props.changeScrollState(true);


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

  getPosition = ({nativeEvent}) => {
    if(!this.finishedLayoutSetup){
    console.log('getting the position')


      let thisPosition = {
        x: nativeEvent.layout.x,
        y: nativeEvent.layout.y,
      }

      let thumbPosition = this.state.thumbPosition
      thumbPosition = new Animated.ValueXY(thisPosition)

      if(this.props.initialValue){
        console.log(this.state.maxWidth)
        var step_length = (this.state.maxWidth/2)-THUMB_SIZE/2
        step_length = step_length*(this.props.initialValue)
        thumbPosition.x.setValue(step_length)
      }


      this.setState({thumbPosition})
      this.prevX = thumbPosition.x._value
    }


    this.finishedLayoutSetup = true
  }

  setMaxWidth = (event) => {
    var {x, y, width} = event.nativeEvent.layout
    // console.log(width)

    this.setState({maxWidth: width})
    this.setStepValue(width)
  }

  setStepValue(width){
    const num_steps = 3
    this.setState({stepValue: width/num_steps})
  }



  getThumbStyle() {
    if(this.state.thumbPosition && this.finishedLayoutSetup){
      return {
        height: THUMB_SIZE,
        width: THUMB_SIZE,
        borderRadius: THUMB_SIZE/2,
        backgroundColor: 'white',
        position: 'absolute',
        left: this.state.thumbPosition.x._value,
        top: this.state.thumbPosition.y._value,
      }
    }

    else return {
      height: THUMB_SIZE,
      width: THUMB_SIZE,
      borderRadius: THUMB_SIZE/2,
      backgroundColor: 'white',
    }


  }



  render(){
    return(
      <View onLayout={this.setMaxWidth}
        style={{height: 5, borderRadius:5/2, backgroundColor: 'purple', justifyContent: 'center'}}>
        {this.state.maxWidth &&
        <Animated.View onLayout={this.getPosition} {...this._panResponder.panHandlers} style={[this.getThumbStyle(), {justifyContent: 'center', alignItems: 'center'}]}>
          <View style={{height:THUMB_SIZE-THUMB_RADIUS, width: THUMB_SIZE-THUMB_RADIUS, borderRadius: (THUMB_SIZE-THUMB_RADIUS)/2, backgroundColor:'#54C9EC'}}/>
        </Animated.View>
        }
      </View>
    );
  }
}



export default class ProfileSlider extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (

      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>

        <View style={{margin: 20, marginTop: 30}}>
          <Slider disabled={false} changeScrollState={this.props.changeScrollState} />
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <Text style={[styles.sliderValueText, styles.sliderLeftValueText]}>RELATIONSHIP</Text>
            <Text style={[styles.sliderValueText, styles.sliderRightValueText]}>FRIENDSHIP</Text>
          </View>
        </View>

        <View style={{marginLeft: 20, height:1, backgroundColor:'#E6E6E6'}} />

        <View style={{margin:20, marginTop:30}}>
          <Slider initialValue={0} disabled={true} changeScrollState={this.props.changeScrollState} />
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <Text style={[styles.sliderValueText, styles.sliderLeftValueText]}>MEN</Text>
            <Text style={[styles.sliderValueText, styles.sliderMidValueText]}>BOTH</Text>
            <Text style={[styles.sliderValueText, styles.sliderRightValueText]}>WOMEN</Text>
          </View>
        </View>
      </View>

    );
  }

}


var styles = StyleSheet.create({
  sliderValueText: {
    fontSize: 16, fontFamily: 'Avenir-Light',
    color: '#888888'
  },
  sliderLeftValueText: {
    textAlign: 'left',
    flex: 1
  },
  sliderRightValueText: {
    textAlign: 'right',
    flex: 1
  },
  sliderMidValueText: {
    textAlign: 'center',
    flex: 1
  },

});
