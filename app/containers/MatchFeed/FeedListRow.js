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

const CELL_SIZE = 270
const TRANSITION_LENGTH = 800

export default class FeedListRow extends Component{

  constructor(props){
    super(props)
    this.state = {
      _rowHeight: new Animated.Value(CELL_SIZE),
      _rowOpacity : new Animated.Value(0), // TODO,
      removing: false,
      lockToPage: false,
      pageNum: null,
      finishedRemoving: false
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.removing == true){
      this.onRemove(()=>{
        if(this.pageNum !== null && !this.state.finishedRemoving){
          setTimeout(() => {
            this.props.likeDislikeUser(this.state.pageNum, this.props.match.id)
          }, 1000);
        }
      })
      this.setState({removing: false,lockToPage: false})
    }
  }


  onRemove(callback){
    Animated.timing(this.state._rowHeight,{
      toValue: 0,
      duration: TRANSITION_LENGTH
    }).start(callback);
  }

  resetHeight(){
    Animated.timing(this.state._rowHeight,{
      toValue: CELL_SIZE,
      duration: 0
    }).start()
  }


  handleRemoval = () => {
    console.log("Handling removal")
    this.setState({removing: true})
  }

  render(){
    return(
      <View>

      <Swiper
        threshold={500}
        onDragRelease={() => this.props.changeScrollState(true)}
        onDragStart={() => this.props.changeScrollState(false)}
        lockToPage={this.state.lockToPage}
        handleRemoval={this.handleRemoval}
        onPageChange={(pageNum) =>{

          // console.log(pageNum)
          if(pageNum===0 || pageNum===2 )this.setState({pageNum: pageNum, lockToPage: true})
          // this.props.likeDislikeUser(pageNum, this.props.match.id)
        }
          // this.setState({removing: true})
        //  this.props.likeDislikeUser(pageNum, this.props.match.id)
        }
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

      </Swiper>
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
