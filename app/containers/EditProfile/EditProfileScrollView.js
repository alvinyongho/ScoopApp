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

import RowDivider from '../../components/Profile/ProfileTableRow/RowDivider'
import ViewProfileRow from '../../components/Profile/ProfileTableRow/ViewProfileRow'

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


  convertItemOrderToImageArray(itemOrder){
    return itemOrder.map((item, index)=>{
      return item
    })
  }


  componentWillReceiveProps(nextProps){
    // This handles the initial case where the first image is added and there weren't any album images
    // prior. Otherwise the profile images will keep changing when the child prop gets re-mounted
    // which should be resolved at some later time.

    if(nextProps.myProfileImages !== this.state.profileImages && this.state.profileImages.length === 0){
      this.props.postProfileImages(this.convertItemOrderToImageArray((nextProps.myAlbumPicturesOrder)))
    }

  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.myProfileImages !== this.state.profileImages){
      this.setState({profileImages:this.props.myProfileImages})
    }
  }


  scrollToBottom = () => {
    // This is called from a callback in the child component for KeyboardInput
    // which is used to enter information in the about me section.
    this.refs.scrollView.scrollToEnd()
  }


  handleInitialImportPress = () =>{
    let initialSlot = {
      elementKey:0,
      order:0,
    }
    this.props.GoToImportPicture(initialSlot)
  }


  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    return (
      <ScrollView ref="scrollView" scrollEnabled={this.state.isScrollEnabled}>
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
    scoopUserId: state.scoopUserProfile.scoopId,
    myAlbumPicturesOrder: state.myAlbumPicturesOrder

  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScrollView);
