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




class SwipeView extends Component{

  constructor(props){
    super(props)
    this.horizontalSwipeGestureBegan = false;
    this.isScrolling = true
  }

  setOpacity(element, opacityValue){
    if(element ==="not_interestedOpacity"){
      // console.log('setitng not interested opacity')
      this._notInterestedOpacity.setNativeProps({style: {opacity: opacityValue}});
    }

    if(element === "interestedOpacity"){
      this._interestedOpacity.setNativeProps({style: {opacity: opacityValue}});
    }
  }

  componentWillMount(){
    this.animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0}
    this.animatedValue.addListener((value) => this._value = value);
    this.inDragMode = false


    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // Don’t use the capture phase, you will rarely ever use it much like the web. Stick to the function calls without capture.
      // The deepest element gets focus if set to false.
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
          const { dx } = gestureState;
          // console.log('should it set pan responder')
		      return Math.abs(dx) > this.props.directionalDistanceChangeThreshold;
      },
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        })

        this.animatedValue.setValue({ x: 0, y: 0})
      },
      onPanResponderMove: (e, gestureState) => {
        // if(!this.isScrolling){
        this.props.setScrollEnabled(false);

        console.log('moving')
        const { dx, dy } = gestureState;
    		const absDx = Math.abs(dx);
    		const absDy = Math.abs(dy);
        if (absDx > this.props.directionalDistanceChangeThreshold || absDy > this.props.directionalDistanceChangeThreshold) {

          // if(absDx && this.isScrolling){
          //   this.props.setScrollEnabled(false);
          //   this.isScrolling = false;
          //   console.log('we need some way to prevent')
          // }


          if (absDy > absDx && !this.horizontalSwipeGestureBegan) {
				    // user is moving vertically, do nothing, listView will handle
            console.log('user moving vertically do nothing')
    				return;
    			}

          // user is moving horizontally
    			if (this.isScrolling) {
            console.log('is scrolling should disable scrolling in listview parent')
    				// disable scrolling on the listView parent
    				this.isScrolling = false;
    				this.props.setScrollEnabled(false);
    			}

          if (!this.horizontalSwipeGestureBegan) {
    				this.horizontalSwipeGestureBegan = true;
    				// this.props.swipeGestureBegan && this.props.swipeGestureBegan();
    			}


          if(gestureState.dx< -5){
            this.setOpacity('not_interestedOpacity', 1)
            this.setOpacity('interestedOpacity', 0)
          }

          if(gestureState.dx > 5){
            this.setOpacity('interestedOpacity', 1)
            this.setOpacity('not_interestedOpacity', 0)
          }

          Animated.event([
            null, { dx: this.animatedValue.x, dy: 0}
          ])(e, gestureState)


        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => {
        return false
      },
      onPanResponderRelease: (e, gestureState) => {

        if (!this.isScrolling) {
    			this.isScrolling = true;
    			this.props.setScrollEnabled(true);
    		}


        this.animatedValue.flattenOffset();
        if(this._value.x < -180){
          this.props.handleRemoval()
          this.props.onSwipeLeft()
        } else if(this._value.x > 180) {
          this.props.handleRemoval()
          this.props.onSwipeRight()
        }
        Animated.timing(this.animatedValue,
          {toValue:{x:0,y:0},
          duration: 10
        }
        ).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled

        if (!this.isScrolling) {
    			this.isScrolling = true;
    			this.props.setScrollEnabled(true);
    		}


        this.animatedValue.flattenOffset();
        if(this._value.x < -180){
          this.props.handleRemoval()
          this.props.onSwipeLeft()
        } else if(this._value.x > 180) {
          this.props.handleRemoval()
          this.props.onSwipeRight()
        }
        Animated.timing(this.animatedValue,
          {toValue:{x:0,y:0},
          duration: 10
        }
        ).start();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return false;
      },
    });
  }


  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    if(nextProps.feedListScrollViewDisabled !== this.isScrolling){
      // console.log('setting this diabled')
      this.isScrolling = nextProps.feedListScrollViewDisabled
      // if(this.isScrolling){
      //   // console.log('is scrolling')
      // } else {
      //   // console.log('not scrolling')
      // }

    }
  }

  render(){
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    }

    return(
      <Animated.View style={[{height: this.props.cellSize},{opacity: this.props.rowOpacity}]}>
        <View style={[styles.container]}>
          <View style={{position: 'absolute', padding: 50, height: cardHeight-paddingAmount,
            width: Dimensions.get('window').width}}>
            <Image  ref={component => this._interestedOpacity = component}
              style={{position: 'absolute', left: 15, top: 60, opacity: 0}} source={images.interested} />
            <Image  ref={component => this._notInterestedOpacity = component}
              style={{position: 'absolute', right: 15, top: 73, opacity: 0}} source={images.notInterested} />
          </View>
          <Animated.View {...this._panResponder.panHandlers} style={[styles.draggableCard, animatedStyle ]}>
            <TouchableHighlight onPress={()=>this.props.onPressProfile()}>
              <View style={{height: cardHeight-paddingAmount, width: Dimensions.get('window').width-paddingAmount*2, backgroundColor: 'gray'}}>
                {this.props.renderImage}
              </View>
            </TouchableHighlight>
          </Animated.View>
        </View>
      </Animated.View>

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

SwipeView.defaultProps = {
  directionalDistanceChangeThreshold: 2,
}

export default SwipeView
