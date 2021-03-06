import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

import LookingForSection from '../../components/Profile/ProfileTableRow/LookingForSection'
import InterestsSection from '../../components/Profile/ProfileTableRow/InterestsSection'
import ProfileDetailConnectedApps from '../../components/Profile/ProfileTableRow/ProfileDetailConnectedApps'

import ProfileAlbum from '../../components/Profile/ProfileAlbum'
import ProfileBasicInfo from '../../components/Profile/ProfileBasicInfo'
import SendMessageButton from '../../components/Profile/SendMessageButton'

import images from '@assets/images';

import RowDivider from '../../components/Profile/ProfileTableRow/RowDivider'
import BasicRow from '../../components/Profile/ProfileTableRow/BasicRow'
import SectionTitle from '../../components/Profile/ProfileTableRow/SectionTitle'
import ProfileSlider from '../../components/Profile/ProfileTableRow/ProfileSlider'

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

FB_EXPIRED_URL = 'https://scontent.xx.fbcdn.net'



export class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrollEnabled: true
    };
  }

  changeScrollState = (isEnabled) => {
    this.setState({isScrollEnabled: isEnabled})
  }

  _getHeight = () => {
    if(this.props.userDetail.heightInches && this.props.userDetail.heightInches !== "0"){
      // console.log(this.props.userDetail.heightInches)
        ft = Math.floor(parseInt(this.props.userDetail.heightInches)/12)
        inches = parseInt(this.props.userDetail.heightInches)-(12*ft)
      return(<Text>{`${ft}'${inches}"`}</Text>)
    } else {
      return(<Text>Ask me!</Text>)
    }
  }

  _getOffSpring = () => {
    switch(this.props.userDetail.offspring){
      case "0":
        return <Text>Ask Me!</Text>
      case "1":
        return <Text>I have kids</Text>
      case "2":
        return <Text>I do not have kids</Text>
      default:
        return <Text>""</Text>
    }
  }

  _getBodyType = () => {
    switch(this.props.userDetail.bodyType){
      case "0":
        return <Text>Do not share</Text>
      case "1":
        return <Text>Slender</Text>
      case "2":
        return <Text>Athletic</Text>
      case "3":
        return <Text>Average</Text>
      case "4":
        return <Text>Full Figured</Text>
      case "5":
        return <Text>More to Love</Text>
      default:
        return <Text>""</Text>
    }
  }

  _getDistanceInMiles = () => {
    return Math.floor(this.props.userDetail.distance)
  }

  sendMessage = () => {
    this.props.setMessageTarget(this.props.userDetail.userId)
    // Navigate to chat details
    this.props.resetMessengerTab()
    this.props.goToChatDetailFromFeed()
  }


  render() {
    if(!this.props.isLoadingUser){
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView scrollEnabled={this.state.isScrollEnabled}>
          {this.props.userDetail.images &&
            <ProfileAlbum {...this.props}
              images={this.props.userDetail.images}
              changeScrollState={this.changeScrollState}
            />
          }

          {this.props.userDetail &&
          <ProfileBasicInfo
                name = {this.props.userDetail.firstName}
                distance = {`${this._getDistanceInMiles()} mi`}
                schoolName = {this.props.userDetail.schoolName}
                relationshipStatus = {this.props.userDetail.relationship}
          />
          }
          <SendMessageButton onPress={()=>this.sendMessage()} name={this.props.userDetail.firstName}/>


          <View style={{paddingTop: 10, paddingLeft: 15, backgroundColor: 'white'}}>
            <BasicRow rowItemName={'Height'} rowItemValue={this._getHeight()}/>
            <RowDivider />
            <BasicRow rowItemName={'Offspring'} rowItemValue={this._getOffSpring()}/>
            <RowDivider />
            <BasicRow rowItemName={'Body Type'} rowItemValue={this._getBodyType()}/>
          </View>

          <LookingForSection disabled={true} lookingForType={this.props.userDetail.lookingForType} lookingForGender={this.props.userDetail.lookingForGender} changeScrollState={()=>{}} />
          <ProfileDetailConnectedApps connectedAppInts={this.props.userDetail.connectedAppInts} />


          {/* TODO:// add type facebook/spotify + MAP + Join the facebook spotify likes together here*/}
          {this.props.userDetail.THEIRfacebookLikes ?
          <InterestsSection profileLikes={this.props.userDetail.THEIRfacebookLikes} />
          :
          <InterestsSection profileLikes={this.props.userDetail.facebookLikes} />
          }

          <SectionTitle title={'ABOUT ME'}/>
          <View style={{padding: 5, backgroundColor: 'white'}}>
            <Text style={{fontFamily:'Avenir-Light'}}>{this.props.userDetail.aboutMe}</Text>
          </View>


          { /* Block User button */ }
          <Button>
          <View style={{marginTop: 20}}>
            <View style={{margin: 15, borderRadius: 5, borderWidth: 1, padding: 8, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 14, fontFamily: 'Avenir-Light'}}>Block or Report this User</Text>
            </View>
          </View>
          </Button>

          <View style={styles.footer} />

        </ScrollView>
      </View>
    );
    }
    return null
  }
}


var styles = StyleSheet.create({
  footer:{
    height: 25, backgroundColor: '#E6E6E6'
  }
});

// maps action creator calls to a dispatch to update the tree
// Bind actions (dispatcher) to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// Match state to props which allows us to access actions
function mapStateToProps(state) {
  return {
    userDetail: state.viewingProfileDetail,
    isLoadingUser: state.isLoadingUser,
    currentLocation: state.currentLocation,
    isAlbumOpen: state.isAlbumOpen,
  }
}

// Connects the state variables to the property variables within the home class
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail)
