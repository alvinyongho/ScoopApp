import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import ProfileAlbum from '../../components/Profile/ProfileAlbum'
import ProfileBasicInfo from '../../components/Profile/ProfileBasicInfo'
import SendMessageButton from '../../components/Profile/SendMessageButton'


import BasicRow from '../../components/Profile/ProfileTableRow/BasicRow'
import SectionTitle from '../../components/Profile/ProfileTableRow/SectionTitle'
import ProfileSlider from '../../components/Profile/ProfileTableRow/ProfileSlider'


export default class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView>
          <ProfileAlbum />
          <ProfileBasicInfo />
          <SendMessageButton />

          <View style={{paddingTop: 10, backgroundColor: 'white'}}>
            <BasicRow hasDivider={true}  rowItemName={'Height'} rowItemValue={<Text>5&#39; 6&#34;</Text>}/>
            <BasicRow hasDivider={true}  rowItemName={'Job Title'}/>
            <BasicRow hasDivider={true}  rowItemName={'Height'} rowItemValue={<Text>Ask me!</Text>}/>
            <BasicRow hasDivider={true}  rowItemName={'Offspring'} rowItemValue={<Text>Ask me!</Text>}/>
            <BasicRow hasDivider={false} rowItemName={'Body Type'} rowItemValue={<Text>Ask me!</Text>}/>
          </View>

          <SectionTitle title={'LOOKING FOR'}/>
          <ProfileSlider />




        </ScrollView>
      </View>
    );
  }
}


var styles = StyleSheet.create({

});
