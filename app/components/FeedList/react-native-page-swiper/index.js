'use strict';

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  View,
} from 'react-native';

import Dots from './dots';

export default class Swiper extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    index: React.PropTypes.number,
    threshold: React.PropTypes.number,
    pager: React.PropTypes.bool,
    onPageChange: React.PropTypes.func,
    activeDotColor: React.PropTypes.string,
  };

  static defaultProps = {
    index: 0,
    pager: true,
    threshold: 100,
    onPageChange: () => {},
    activeDotColor: '#54C9EC',
    onShortPress: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      scrollValue: new Animated.Value(props.index),
      viewWidth: Dimensions.get('window').width,
    };

    this.onReleaseOpenAlbum = false;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.lockToPage){
      this.goToPage(1)
      this.props.handleRemoval()
    }
  }

  componentWillMount() {
    const release = (e, gestureState) => {
      const relativeGestureDistance = gestureState.dx / this.state.viewWidth;
      const { vx } = gestureState;

      let newIndex = this.state.index;

      if (relativeGestureDistance < -0.75 || (relativeGestureDistance < 0 && vx <= -0.75)) {
        newIndex = newIndex + 1;
      } else if (relativeGestureDistance > 0.75 || (relativeGestureDistance > 0 && vx >= 0.75)) {
        newIndex = newIndex - 1;
      }

      this.goToPage(newIndex);
      this.props.onDragRelease();

      if(this.onReleaseOpenAlbum){
        this.props.onShortPress()
      }
      this.onReleaseOpenAlbum= false

    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
      this.onReleaseOpenAlbum = true;
      return false},
      // onShouldBlockNativeResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (e, gestureState) => {
        const { threshold } = this.props;


        // Claim responder if it's a horizontal pan
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          return true;
        }

        // and only if it exceeds the threshold
        if (threshold - Math.abs(gestureState.dx) > 0) {
          return false;
        }

      },

      onPanResponderGrant: (e, gestureState) => {
        this.props.onDragStart();
      },

      // Touch is released, scroll to the one that you're closest to
      onPanResponderRelease: release,
      onPanResponderTerminate: release,

      // Dragging, move the view with the touch
      onPanResponderMove: (e, gestureState) => {
        // console.log('we movin')
        this.onReleaseOpenAlbum = false;

        let dx = gestureState.dx;
        let offsetX = -dx / this.state.viewWidth + this.state.index;

        this.state.scrollValue.setValue(offsetX);
      }
    });
  }

  goToPage(pageNumber) {
    // Don't scroll outside the bounds of the screens
    pageNumber = Math.max(0, Math.min(pageNumber, this.props.children.length - 1));
    this.setState({
      index: pageNumber
    });

    if(this.props.lockToPage){
      Animated.timing(this.state.scrollValue,{
        toValue: pageNumber,
        duration: 100,
      }).start();
    } else {
      Animated.spring(this.state.scrollValue, { toValue: pageNumber, friction: this.props.springFriction, tension: this.props.springTension }).start();
    }

    this.props.onPageChange(pageNumber);
  }

  handleLayout(event) {
    const { width } = event.nativeEvent.layout;

    if (width) {
      this.setState({ viewWidth: width });
    }
  }

  render() {
    const scenes = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { style: [child.props.style, { flex: 1 }] });
    });

    const translateX = this.state.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, -this.state.viewWidth]
    });

    const sceneContainerStyle = {
      width: this.state.viewWidth * this.props.children.length,
      flex: 1,
      flexDirection: 'row',
    };

    return (
      <View onLayout={ this.handleLayout.bind(this) } style={ { flex: 1, overflow: 'hidden' } }>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={ [sceneContainerStyle, { transform: [{ translateX }] }] }
        >
          { scenes }
        </Animated.View>

        { this.props.pager &&
          <Dots
            active={ this.state.index }
            activeColor={ this.props.activeDotColor }
            style={ { position: 'absolute', bottom: 8, width: this.state.viewWidth } }
            total={ this.props.children.length }
          /> }
      </View>
    );
  }
}