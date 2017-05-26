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

import EditPhotoAlbum from './EditPhotoAlbum'
import PanningRectExample from './PanningRectExample'
import PhotoAlbum from './PhotoAlbum'

import AndroidPhotoAlbum from './Android/AndroidPhotoAlbum'

import RowDivider from '../Profile/ProfileTableRow/RowDivider'
import ProfileSlider from '../Profile/ProfileTableRow/ProfileSlider'

import ProfileDetailAccordian from '../Profile/ProfileTableRow/ProfileDetailAccordian'


import BasicRow from '../Profile/ProfileTableRow/BasicRow'
import ViewProfileRow from '../Profile/ProfileTableRow/ViewProfileRow'
import SectionTitle from '../Profile/ProfileTableRow/SectionTitle'
import ProfileBasicInfo from '../Profile/ProfileBasicInfo'
import ConnectedAppsRow from '../Profile/ProfileTableRow/ConnectedAppsRow'


export default class EditProfileScrollView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isScrollEnabled: true
    }
  }

  changeScrollState = (isEnabled) => {
    this.setState({isScrollEnabled: isEnabled})
  }

  renderPhotoAlbum = () => {
    if(Platform.OS === 'ios'){
      return (
        <View style={{height: 480, backgroundColor: 'white'}}>
        <PhotoAlbum changeScrollState={this.changeScrollState}
                            onFinishedDrag={(itemOrder)=>console.log(itemOrder)}
                            onShortPress={(key)=>console.log("handleShortPress for key: " + key)}
        />
        </View>
      );
    } else {
      // Handle Android case
      return(
        <View style={{height: 550,}}>
        <AndroidPhotoAlbum changeScrollState={this.changeScrollState}
                            onFinishedDrag={(itemOrder)=>console.log(itemOrder)}
                            onShortPress={(key)=>console.log("handleShortPress for key: " + key)}
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
        <ProfileSlider changeScrollState={this.changeScrollState} />

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
