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

import {ComingSoonRow,EditableConnectedApps} from '../Profile/ProfileTableRow/ProfileDetailConnectedApps'

import LookingForSection from '../Profile/ProfileTableRow/LookingForSection'


import images from '@assets/images';





export class EditProfileContainer extends React.Component {
  constructor(props){
    super(props)

  }

  componentWillMount(){
    // Gets the user information and populates the viewingProfileDetail state.
    // This call also gets activated in View Profile so that call may be removed inside ViewProfileRow
    // at a later time.

    this.props.getMyProfileInfo()
    this.props.retrieveEduExperience()



  }

  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    const {
      myProfile
    } = this.props;

    return (
      <View>
        <SectionTitle title="PERSONAL DETAILS" />

        <ProfileBasicInfo
          relationshipStatus={myProfile.scoopApiStore.relationship}
          distance={'0m away'} schoolName={myProfile.scoopApiStore.schoolName}
          name={myProfile.scoopApiStore.firstName} disabledLike={true}
        />

        <ProfileDetailAccordian userProfile={myProfile} />

        <LookingForSection
          disabled={false}
          lookingForType={myProfile.scoopApiStore.lookingForType}
          lookingForGender={myProfile.scoopApiStore.lookingForGender}
          changeScrollState={this.props.changeScrollState}
        />

        <SectionTitle title={'CONNECTED APPS'}/>
        <View style={{paddingLeft: 20, backgroundColor:'white'}}>
          <EditableConnectedApps
            showSlider={true}
            isEnabled={true}
            serviceImages={[images.facebook_noColor, images.facebook_withColor]}
            rowItemName={'Facebook'}
          />
          <View style={{height:1, backgroundColor:'gray'}}/>
          <EditableConnectedApps
            showSlider={false}
            serviceImages={[images.fitbit_noColor, images.fitbit_withColor]}
            rowItemName={'FitBit'}
          />
          <View style={{height:1, backgroundColor:'gray'}}/>
          <EditableConnectedApps
            showSlider={false}
            serviceImages={[images.pinterest_noColor, images.pinterest_withColor]}
            rowItemName={'Pinterest'}
          />
          <View style={{height:1, backgroundColor:'gray'}}/>
          <EditableConnectedApps
            showSlider={false}
            serviceImages={[images.spotify_noColor, images.spotify_withColor]}
            rowItemName={'Spotify'}
          />
          <View style={{height:1, backgroundColor:'gray'}}/>
          <ComingSoonRow />
        </View>


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
