import React, {Component} from 'react';

import {
  View,
  Text,
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableHighlight,
  Image,
} from 'react-native'

import images from '@assets/images';

paddingAmount = 30
cardHeight = 255


export default class SwipeView extends Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0}
    this.animatedValue.addListener((value) => this._value = value);

    this.dragDisabled = false

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // Don’t use the capture phase, you will rarely ever use it much like the web. Stick to the function calls without capture.
      // The deepest element gets focus if set to false.
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        })

        this.animatedValue.setValue({ x: 0, y: 0})

      },
      onPanResponderMove: (e, gestureState) => {

        if(Math.abs(this._value.x)>10 && !this.dragDisabled){
          this.props.onDragStart()
          this.dragDisabled = true
        }

        Animated.event([
          null, { dx: this.animatedValue.x, dy: 0}
        ])(e, gestureState)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (e, gestureState) => {
        this.props.onDragRelease()
        this.dragDisabled = false

        this.animatedValue.flattenOffset();
        // console.log(this._value)
        if(this._value.x < -170){
          console.log( "swiped right")

          this.props.handleRemoval()

        } else if(this._value.x > 170) {
          console.log( "swiped left")
          this.props.handleRemoval()

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
        <View style={{position: 'absolute', padding: 50, height: cardHeight-paddingAmount,
          width: Dimensions.get('window').width}}>
          <Image style={{position: 'absolute', left: 15, top: 60}} source={images.interested} />
          <Image style={{position: 'absolute', right: 15, top: 73}} source={images.notInterested} />
        </View>

        <Animated.View {...this._panResponder.panHandlers} style={[styles.draggableCard, animatedStyle]}>
          <TouchableHighlight onPress={()=>this.props.onPressProfile()}>
            <View style={{height: cardHeight-paddingAmount, width: Dimensions.get('window').width-paddingAmount*2, backgroundColor: 'gray'}}>
              {this.props.renderImage}
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 5,
    marginBottom: 7,
  },

  draggableCard: {
    width: Dimensions.get('window').width-30,
    borderRadius: 5,
    height: cardHeight,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }

})
