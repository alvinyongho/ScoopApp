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
import EditProfileContainer from './EditProfileContainer'


import ImportPhotoContainer from './ImportPhotoContainer'


export class EditProfileScrollView extends React.Component {
  constructor(props){
    super(props)
    this.acc = 0
    this.prevImages = this.props.myProfileImages
    this.state = {
      isScrollEnabled: true,
      profileImages: this.props.myProfileImages,
      scrollToEnd: false

    }
  }

  changeScrollState = (isEnabled) => {
    this.setState({isScrollEnabled: isEnabled})
  }

  componentWillMount(){

  }

  componentDidMount(){
    // Gets the user information and populates the viewingProfileDetail state.
    // This call also gets activated in View Profile so that call may be removed inside ViewProfileRow
    // at a later time.
  }

  componentWillReceiveProps(nextProps){
    console.log("Receiving next props in edit profile scrollview")
    console.log(nextProps)
    // this.nextProps.getScoopUserImages()


    // this.setState({myProfileImages: nextProps.myProfileImages})
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.myProfileImages !== this.state.profileImages){
      this.setState({profileImages:this.props.myProfileImages})
    }
  }


  scrollToBottom = () => {
    this.refs.scrollView.scrollToEnd()
  }

  handleInitialImportPress = () =>{
    console.log("handle initial import press")

    initialSlot = {
      elementKey:0,
      order:0,
    }
    this.props.GoToImportPicture(initialSlot)

  }


  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    return (
      <ScrollView ref="scrollView" bounces={false} scrollEnabled={this.state.isScrollEnabled}>

        {this.state.profileImages.length > 0 ?
          <PhotoAlbumsContainer changeScrollState={this.changeScrollState}/>
          :
          <ImportPhotoContainer handlePress={this.handleInitialImportPress} />
        }


        <RowDivider />
        <ViewProfileRow />

        <EditProfileContainer scrollToBottom={this.scrollToBottom} changeScrollState={this.changeScrollState}/>

      </ScrollView>
    )
  }

}

function mapStateToProps(state){
  return {
    myProfileImages: state.myProfileImages,
    albumImageState: state.albumImageState,
    myProfileDetails: state.viewingProfileDetail,
    scoopUserId: state.scoopUserProfile.scoopId

  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScrollView);
