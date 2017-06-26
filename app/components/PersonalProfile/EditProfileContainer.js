'use strict';

import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Platform,
  TextInput,
  Animated,
  Keyboard
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





// KEYBOARD_HEIGHT:
export class InputKeyboard extends Component{

  constructor(props){
    super(props)
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
      this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)

  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide = (event) => {
    // alert('Keyboard shown')
    this.keyboardHeight.setValue(0)
    this.props.setKeyboardHeight(0)
    //
    // Animated.timing(this.keyboardHeight,{
    //   toValue: 0,
    //   duration: event.duration,
    // }).start();

  }

  _keyboardDidShow = (event) => {
    // alert('Keyboard hidden')

    this.keyboardHeight.setValue(event.endCoordinates.height)
    this.props.setKeyboardHeight(event.endCoordinates.height)

    //
    // Animated.timing(this.keyboardHeight,{
    //   toValue: event.endCoordinates.height,
    //   duration: event.duration,
    // }).start();
  };

  handleSend = () => {
    Keyboard.dismiss()
  }

  render(){
    return(
        <TextInput onFocus={()=>this.props.scrollToBottom()} placeholder={'Type message'} multiline={true}
          style={{height:100}} />


    )
  }
}


export class EditProfileContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      relationship: "",
      schoolName: "",
      firstName: "",
      jobTitle: "",
      lookingForType: "",
      lookingForGender: "",
    };
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillMount(){
    // Gets the user information and populates the viewingProfileDetail state.
    // This call also gets activated in View Profile so that call may be removed inside ViewProfileRow
    // at a later time.


    //
    // this.props.getMyProfileInfo()
    // this.props.retrieveEduExperience()

  }


  componentWillReceiveProps(nextProps){

    const apiRelationship = nextProps.myProfile.scoopApiStore.relationship
    const apiSchoolName = nextProps.myProfile.scoopApiStore.schoolName
    const apiFirstName = nextProps.myProfile.scoopApiStore.firstName
    const apiLookingForType = nextProps.myProfile.scoopApiStore.lookingForType
    const apiLookingForGender = nextProps.myProfile.scoopApiStore.lookingForGender


    if(apiRelationship !== this.state.relationship){
      this.setState({relationship:nextProps.myProfile.scoopApiStore.relationship})
    }

    if(nextProps.myProfile.pendingChanges.schoolName){
      this.setState({schoolName: nextProps.myProfile.pendingChanges.schoolName})
    } else {
      if(apiSchoolName !== this.state.schoolName)
        this.setState({schoolName:nextProps.myProfile.scoopApiStore.schoolName})
    }

    if(apiFirstName !== this.state.firstName){
      this.setState({firstName:nextProps.myProfile.scoopApiStore.firstName})
    }

    if(nextProps.myProfile.pendingChanges.lookingForType){
      this.setState({lookingForType: nextProps.myProfile.pendingChanges.lookingForType})
    } else {
      if(apiLookingForType != this.state.lookingForType){
        this.setState({lookingForType:nextProps.myProfile.scoopApiStore.lookingForType})
      }
    }


    if(nextProps.myProfile.pendingChanges.lookingForGender){
      this.setState({lookingForGender: nextProps.myProfile.pendingChanges.lookingForGender})
    } else {
      if(apiLookingForGender != this.state.lookingForGender){
        this.setState({lookingForGender:nextProps.myProfile.scoopApiStore.lookingForGender})
      }
    }

    //
    // if(this.props.myProfile.pendingChanges.education !== nextProps.myProfile.pendingChanges.education ){
    //   console.log("updating school name")
    //   this.setState({schoolName:nextProps.myProfile.pendingChanges.education})
    // }
    //

    // if(this.props.tabNav.index !== nextProps.tabNav.index){
    //   if (this.props.tabNav.index === 2){
    //     console.log("permit save")
    //     // TODO:
    //     // save pending profile changes
    //     nextProps.saveChangesToAPI()
    //     // reset pending profile changes after save
    //   }
    // }
    // if(this.props.myProfileNav.index === 0 && nextProps.myProfileNav.index > 0){
    //   nextProps.saveChangesToAPI()
    // }

  }

  setKeyboardHeight = (keyboardHeight) => {
    console.log('setting keyboard height to '+ keyboardHeight)
    this.keyboardHeight.setValue(keyboardHeight)
  }

  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    const {
      myProfile,       // NEED TO SET IT after state of properties set.
      // tabNav,
    } = this.props;   // maybe redefine as accordian properties

    return (
      <Animated.View style={{marginBottom: 275}}>
        <SectionTitle title="PERSONAL DETAILS" />

        <ProfileBasicInfo
          distance={'0m away'}
          relationshipStatus={this.state.relationship}
          schoolName={this.state.schoolName}
          name={this.state.firstName}
          disabledLike={true}
        />

        <ProfileDetailAccordian userProfile={myProfile} saveChangesToAPI={this.props.saveChangesToAPI} saveSetting={this.props.setProfileSettingToSave}/>

        {(this.state.lookingForType !== "" && this.state.lookingForGender!="") &&
        <LookingForSection
          disabled={false}
          lookingForType={this.state.lookingForType}
          lookingForGender={this.state.lookingForGender}
          changeScrollState={this.props.changeScrollState}
          updatedSection={(sectionTitle, sectionValue, numSteps)=>{
            // handle title update: ${sectionTitle} and value: ${sectionValue} and numSteps ${numSteps}
            let changesToSaveStepValue = sectionValue*(numSteps-1) + 1
            let setting = {}
            let title = sectionTitle
            setting[title] = changesToSaveStepValue
            console.log(this.props)
            this.props.setProfileSettingToSave(setting)
            this.props.saveChangesToAPI()
          }}
        />
        }

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
        <View style={{backgroundColor: 'white', padding: 10}}>


        <InputKeyboard setKeyboardHeight={this.setKeyboardHeight} scrollToBottom={this.props.scrollToBottom}/>

        </View>



      </Animated.View>
    )
  }

}

function mapStateToProps(state){
  return {
    myProfile: state.myProfile,
    tabNav: state.tabNav,
    myProfileNav: state.myProfileNav
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);
