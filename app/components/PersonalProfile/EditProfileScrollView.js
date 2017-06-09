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
import PhotoAlbum from './PhotoAlbum'

import RowDivider from '../Profile/ProfileTableRow/RowDivider'
import ProfileSlider from '../Profile/ProfileTableRow/ProfileSlider'
import ProfileDetailAccordian from '../Profile/ProfileTableRow/ProfileDetailAccordian'
import BasicRow from '../Profile/ProfileTableRow/BasicRow'
import ViewProfileRow from '../Profile/ProfileTableRow/ViewProfileRow'
import SectionTitle from '../Profile/ProfileTableRow/SectionTitle'
import ProfileBasicInfo from '../Profile/ProfileBasicInfo'
import ConnectedAppsRow from '../Profile/ProfileTableRow/ConnectedAppsRow'


import PhotoAlbumsContainer from './ProfileAlbumsContainer'


export class EditProfileScrollView extends React.Component {
  constructor(props){
    super(props)
    this.acc = 0
    this.prevImages = this.props.myProfileImages
    this.state = {
      isScrollEnabled: true,
      profileImages: this.props.myProfileImages,

    }
  }

  changeScrollState = (isEnabled) => {
    this.setState({isScrollEnabled: isEnabled})
  }

  componentDidMount(){
    // Gets the user information and populates the viewingProfileDetail state.
    // This call also gets activated in View Profile so that call may be removed inside ViewProfileRow
    // at a later time.
    // this.props.fetchUser(this.props.scoopUserId)

  }



  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    return (


      <ScrollView bounces={false} scrollEnabled={this.state.isScrollEnabled}>

        <PhotoAlbumsContainer changeScrollState={this.changeScrollState}/>

        <RowDivider />
        <ViewProfileRow />

        <SectionTitle title="PERSONAL DETAILS" />
        <ProfileBasicInfo  disabledLike={true} />



        <ProfileDetailAccordian />

        <SectionTitle title="LOOKING FOR" />
        <ProfileSlider lookingForValues={{relationshipType: [0], genderType: [1]}} changeScrollState={this.changeScrollState} />

        <SectionTitle title={'CONNECTED APPS'}/>


        <SectionTitle title={'ABOUT ME'}/>
        <View style={{backgroundColor: 'white'}}>
        </View>


        <View style={{height: 50, backgroundColor: '#E6E6E6'}}>
        </View>


      </ScrollView>
    )
  }

}

function mapStateToProps(state){
  return {
    myProfileImages: state.myProfileImages,
    albumImageState: state.albumImageState,
    // myProfileDetails: state.viewingProfileDetail,
    scoopUserId: state.scoopUserProfile.scoopId


  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScrollView);
