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
      schoolName: this.props.schoolName
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


  componentWillReceiveProps(nextProps){

    console.log("component received next props in profile basic info")
    console.log(nextProps)
    if(nextProps.schoolName != this.state.schoolName){
      this.setState({schoolName: nextProps.schoolName})
    }

  }

  computeRelationshipStatus = (statusId) =>{
    switch(statusId) {
      case "0":
          return "Ask me!"
      case "1":
          return "Single"
      case "2":
          return "In a Relationship"
      case "3":
          return "Married"
      default:
          return "TODO"
    }
  }

  schoolNameLabel = (schoolName) =>{
    // console.log("returning schoolName Label")
    return (<Text style={styles.subheader}>{schoolName}</Text>)
  }

  computeSchoolName = (schoolName) =>{
    console.log("computing school name")
    console.log(schoolName)
    switch(schoolName){
      case "Do not share":
        return null
      default:
        return this.schoolNameLabel(schoolName)
    }
  }

  render(){
    return(
      <View style={styles.wrapper}>
        <View style={{flex:.8}}>
          <Text style={styles.mainheader}>{this.props.name}</Text>
          <Text style={styles.subheader}>{this.props.distance}</Text>

          {this.computeSchoolName(this.state.schoolName)}
          <Text style={styles.subheader}>
          {this.computeRelationshipStatus(this.props.relationshipStatus)}

          </Text>
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
