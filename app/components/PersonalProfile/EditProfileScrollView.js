'use strict';

import React, {Component} from 'react'


import {
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';

import EditPhotoAlbum from './EditPhotoAlbum'
import PanningRectExample from './PanningRectExample'
import PhotoAlbum from './PhotoAlbum'

import RowDivider from '../Profile/ProfileTableRow/RowDivider'
import ProfileSlider from '../Profile/ProfileTableRow/ProfileSlider'
import BasicRow from '../Profile/ProfileTableRow/BasicRow'
import ViewProfileRow from '../Profile/ProfileTableRow/ViewProfileRow'
import SectionTitle from '../Profile/ProfileTableRow/SectionTitle'
import ProfileBasicInfo from '../Profile/ProfileBasicInfo'

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


  // TODO: item order needs to be saved to database corresponding to authenticated user
  render(){
    return (


      <ScrollView scrollEnabled={this.state.isScrollEnabled} style={{backgroundColor: 'white'}}>
        {/* <EditPhotoAlbum /> */}

        <View style={{height: 480, backgroundColor: 'white'}}>
        <PhotoAlbum changeScrollState={this.changeScrollState}
                            onFinishedDrag={(itemOrder)=>console.log(itemOrder)}
                            onShortPress={(key)=>console.log("handleShortPress for key: " + key)}
        />
        </View>

        <RowDivider />

        <ViewProfileRow />
        <SectionTitle title="PERSONAL DETAILS" />
        <ProfileBasicInfo />

        <RowDivider />
        <BasicRow rowItemName={'School Name'} rowItemValue={'University of California, San...'}/>
        <RowDivider />
        <BasicRow rowItemName={'Job Title'} />
        <RowDivider />
        <BasicRow rowItemName={'Height'} rowItemValue={'Ask Me!'}/>
        <RowDivider />
        <BasicRow rowItemName={'Offspring'} rowItemValue={'Ask Me!'}/>
        <RowDivider />
        <BasicRow rowItemName={'Body Type'} rowItemValue={'Ask Me!'}/>


        <SectionTitle title="LOOKING FOR" />
        <ProfileSlider changeScrollState={this.changeScrollState} />


      </ScrollView>
    )
  }

}
