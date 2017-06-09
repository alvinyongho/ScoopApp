import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
} from 'react-native';
import images from '@assets/images';
import Swiper from './react-native-page-swiper';


export default class ProfileBasicInfo extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      showLikeButton: true,
      buttonStatus: null,
    })
  }

  renderLikeButton(buttonStatus){

    if(!this.state.showLikeButton){
      return <View />
    }

    if(!this.state.buttonStatus){
      return (
        <Image source={images.heart_plus} style={{ width:60, height: 60, borderRadius:30}}/>
      );
    }
    return (
      <Image source={images.heart} style={{ width:60, height: 60, borderRadius:30}}/>
    );

  }


  render(){
    return(
      <View style={styles.wrapper}>
        <View style={{flex:.8}}>
          <Text style={styles.mainheader}>{this.props.name}</Text>
          <Text style={styles.subheader}>{this.props.distance}</Text>
          <Text style={styles.subheader}>{this.props.schoolName}</Text>
          <Text style={styles.subheader}>{this.props.relationshipStatus}</Text>
        </View>


        {!this.props.disabledLike &&
        <View sytle={{flex:.2}}>
          <TouchableHighlight underlayColor={'white'} onPress={()=>{this.setState({buttonStatus:'heart'})
            console.log("TODO")}}>
            {this.renderLikeButton()}
          </TouchableHighlight>
        </View>
        }
      </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor:'white',
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
  mainheader: {
    fontFamily: 'Avenir-Medium',
    fontSize: 23,
    marginLeft: 6
  },
  subheader: {
    fontFamily: 'Avenir-Light',
    fontSize: 18,
    marginLeft: 8,
    color: 'gray'
  }

})
