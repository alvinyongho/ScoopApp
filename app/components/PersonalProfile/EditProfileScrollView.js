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


export class EditProfileScrollView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isScrollEnabled: true
    }
  }

  changeScrollState = (isEnabled) => {
    this.setState({isScrollEnabled: isEnabled})
  }

  // Goto Import picture should take argument
  renderPhotoAlbum = () => {
    if(Platform.OS === 'ios'){
      return (
        <View style={{height: 480, backgroundColor: 'white'}}>
        <PhotoAlbum
            changeScrollState={this.changeScrollState}
            onFinishedDrag={(itemOrder)=>console.log(itemOrder)}
            onShortPress={(key)=>this.props.GoToImportPicture(key)}
        />
        </View>
      );
    } else {
      // Handle Android case
      return(
        <View style={{height: 550, backgroundColor: '#EEEEEE'}} >
        <PhotoAlbum changeScrollState={this.changeScrollState}
                            onFinishedDrag={(itemOrder)=>console.log(itemOrder)}
                            onShortPress={(key)=>this.props.GoToImportPicture(key)}
        />
        </View>
      );
    }

  }


  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    return (


      <ScrollView bounces={false} scrollEnabled={this.state.isScrollEnabled}>
        {/* <EditPhotoAlbum /> */}


        {this.renderPhotoAlbum()}

        <RowDivider />


        <ViewProfileRow />


        <SectionTitle title="PERSONAL DETAILS" />
        <ProfileBasicInfo />

        <ProfileDetailAccordian />

        <SectionTitle title="LOOKING FOR" />






        <ProfileSlider lookingForValues={{relationshipType: [0], genderType: [1]}} changeScrollState={this.changeScrollState} />







        <SectionTitle title={'CONNECTED APPS'}/>
        <ConnectedAppsRow changeScrollState={this.changeScrollState} />


        <SectionTitle title={'ABOUT ME'}/>
        <View style={{height: 100, backgroundColor: 'white'}}>
        </View>

        <View style={{height: 50, backgroundColor: '#E6E6E6'}}>
        </View>


      </ScrollView>
    )
  }

}

function mapStateToProps(state){
  return {
  }
}


const mapDispatchToProps = dispatch => ({
  GoToImportPicture: (key) => dispatch(NavigationActions.navigate({ routeName:'ImportPicture' })),
});


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScrollView);
