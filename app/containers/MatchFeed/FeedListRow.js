import React, {Component} from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  RefreshControl,
  StyleSheet,
  Button,
  Animated
} from 'react-native';

import Swiper from '../../components/FeedList/react-native-page-swiper';
import images from '@assets/images';

import SwipeView from '../../components/FeedList/SwipeView';


const CELL_SIZE = 255+7
const TRANSITION_LENGTH = 400
const ROW_OPACITY = 1

export default class FeedListRow extends Component{

  constructor(props){
    super(props)
    this.state = {
      _rowHeight: new Animated.Value(CELL_SIZE),
      _rowOpacity: new Animated.Value(1),
      removing: false,
      lockToPage: false,
      pageNum: null,
      likeDislike: null,
      finishedRemoving: false
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.removing == true){
      this.onRemove(()=>{
        console.log("HANDLE REMOVAL")
        // if(this.pageNum !== null && !this.state.finishedRemoving){
        //   setTimeout(() => {
        this.props.likeDislikeUser(this.state.likeDislike, this.props.match.id)
          // }, 1000);
        // }
      })
      this.setState({removing: false,lockToPage: false})
    }
  }


  onRemove(callback){

    Animated.sequence([
      Animated.timing(this.state._rowOpacity,{
          toValue: 0,
          duration: TRANSITION_LENGTH
      }),
      Animated.timing(this.state._rowHeight,{
        toValue: 0,
        duration: TRANSITION_LENGTH
      }),


    ]).start(callback);




    console.log(this.state._rowOpacity)

  }

  resetHeight(){
    Animated.timing(this.state._rowHeight,{
      toValue: CELL_SIZE,
      duration: 0
    }).start()
    //
    // Animated.timing(this.state._rowOpacity,{
    //   toValue: 1,
    //   duration: TRANSITION_LENGTH
    // })

  }


  handleRemoval = () => {
    // console.log("Handling removal")
    this.setState({removing: true})
  }

  render(){
    return(
      <View>
        <SwipeView
          feedListScrollViewDisabled={this.props.feedListScrollViewDisabled}
          setScrollEnabled={this.props.setScrollEnabled}

          onDragRelease={() => this.props.changeScrollState(true)}
          onDragStart={() => this.props.changeScrollState(false)}
          onPressProfile={() => this.props._onPressProfile(this.props.match.id)}
          renderImage={this.props._renderImage(this.props.match)}
          onSwipeRight={() => {
            this.setState({likeDislikeUser: 0})}}
          onSwipeLeft={() => {
            this.setState({likeDislikeUser: 2})}}
          handleRemoval={this.handleRemoval}
          cellSize={this.state._rowHeight}
          rowOpacity={this.state._rowOpacity}
        />



{/*
        <Swiper
          threshold={500}
          onDragRelease={() => this.props.changeScrollState(true)}
          onDragStart={() => this.props.changeScrollState(false)}
          lockToPage={this.state.lockToPage}
          handleRemoval={this.handleRemoval}
          onPageChange={(pageNum) =>{
            if(pageNum===0 || pageNum===2 )this.setState({pageNum: pageNum, lockToPage: true})
          }}
          style={styles.wrapper} index={1} pager={false}>

          <Animated.View style={[styles.interestedSlide, {height:this.state._rowHeight}]}>
            <Image style={{right:20}} source={images.interested} />
          </Animated.View>

          <Animated.View style={[styles.profileSlide, {height:this.state._rowHeight}]}>
            <View style={{flex:1, marginTop: 7, marginBottom: 7, marginLeft:14, marginRight:14, backgroundColor: 'white', borderRadius: 5}}>
              <TouchableHighlight onPress={() => this.props._onPressProfile(this.props.match.id)} style={{flex:1, margin: 15, justifyContent:'flex-end'}}>
                {this.props._renderImage(this.props.match)}
              </TouchableHighlight>
            </View>
          </Animated.View>

          <Animated.View style={[styles.notInterestedSlide, {height:this.state._rowHeight}]}>
            <Image style={{left:20}} source={images.notInterested} />
          </Animated.View>

        </Swiper>  */}


      </View>
    )
  }

}




var styles = StyleSheet.create({
  wrapper: {
  },
  interestedSlide: {
    // height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: '#9DD6EB',
  },
  profileSlide: {
    // height: CELL_SIZE,
    flex:1
  },
  notInterestedSlide: {
    // height: CELL_SIZE,

    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '100',
  },


})
