'use strict';

import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Platform
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { NavigationActions } from 'react-navigation';


import EditPhotoAlbum from './EditPhotoAlbum'
import PanningRectExample from './PanningRectExample'
// import PhotoAlbum from './PhotoAlbum'

import RowDivider from '../Profile/ProfileTableRow/RowDivider'
import ProfileSlider from '../Profile/ProfileTableRow/ProfileSlider'
import ProfileDetailAccordian from '../Profile/ProfileTableRow/ProfileDetailAccordian'
import BasicRow from '../Profile/ProfileTableRow/BasicRow'
import ViewProfileRow from '../Profile/ProfileTableRow/ViewProfileRow'
import SectionTitle from '../Profile/ProfileTableRow/SectionTitle'
import ProfileBasicInfo from '../Profile/ProfileBasicInfo'
import ConnectedAppsRow from '../Profile/ProfileTableRow/ConnectedAppsRow'



export class EditProfileContainer extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount(){
    // Gets the user information and populates the viewingProfileDetail state.
    // This call also gets activated in View Profile so that call may be removed inside ViewProfileRow
    // at a later time.
    console.log("COMPONENT DID MOUNT")
    console.log("@@@@@@@@@")
    this.props.getMyProfileInfo()

  }

  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    const {
      myProfile
    } = this.props;

    return (
      <View>
        <SectionTitle title="PERSONAL DETAILS" />
        <ProfileBasicInfo relationshipStatus={myProfile.relationship} distance={'0m away'} schoolName={myProfile.schoolName} name={myProfile.firstName} disabledLike={true} />


        <ProfileDetailAccordian />



        <SectionTitle title="LOOKING FOR" />
        <ProfileSlider lookingForValues={{relationshipType: [0], genderType: [1]}} changeScrollState={this.changeScrollState} />

        <SectionTitle title={'CONNECTED APPS'}/>

        <SectionTitle title={'ABOUT ME'}/>
        <View style={{backgroundColor: 'white'}}>
        </View>

        <View style={{height: 50, backgroundColor: '#E6E6E6'}}>
        </View>

      </View>
    )
  }

}

function mapStateToProps(state){
  return {
    myProfile: state.myProfile
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);
