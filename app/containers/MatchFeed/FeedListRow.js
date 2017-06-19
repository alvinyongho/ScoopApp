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
} from 'react-native';

import Swiper from '../../components/Profile/react-native-page-swiper';
import images from '@assets/images';

export default class FeedListRow extends Component{


  render(){
    return(
      <Swiper
        onDragRelease={() => this.props.changeScrollState(true)}
        onDragStart={() => this.props.changeScrollState(false)}
        onPageChange={(pageNum) => this.props.likeDislikeUser(pageNum, match.id)}
        style={styles.wrapper} index={1} pager={false}>

        <View style={styles.interestedSlide}>
          <Image style={{right:20}} source={images.interested} />
        </View>

        <View style={styles.profileSlide}>
          <View style={{flex:1, marginTop: 7, marginBottom: 7, marginLeft:14, marginRight:14, backgroundColor: 'white', borderRadius: 5}}>
            <TouchableHighlight onPress={() => this.props._onPressProfile(match.id)} style={{flex:1, margin: 15, justifyContent:'flex-end'}}>
              {this.props._renderImage(this.props.match)}
            </TouchableHighlight>
          </View>
        </View>

        <View
          onDragRelease={() => this.props.changeScrollState(true)}
          onDragStart={() => this.props.changeScrollState(false)}
          onPageChange={(pageNum) => this.props.likeDislikeUser(pageNum, match.id)}
          style={styles.notInterestedSlide}>
          <Image style={{left:20}} source={images.notInterested} />
        </View>

      </Swiper>
    )
  }

}


const CELL_SIZE = 270


var styles = StyleSheet.create({
  wrapper: {
  },
  interestedSlide: {
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: '#9DD6EB',
  },
  profileSlide: {
    height: CELL_SIZE,
    flex:1
  },
  notInterestedSlide: {
    height: CELL_SIZE,

    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '100',
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    position: 'absolute',
    bottom: 27,
    left: 10,
  },
  profileDescription: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    position: 'absolute',
    bottom: 10,
    left: 10,
  }

})
