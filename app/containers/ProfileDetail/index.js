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

        </ScrollView>
      </View>
    );
  }
}


var styles = StyleSheet.create({

});
