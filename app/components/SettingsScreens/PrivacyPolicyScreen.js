import React, {Component} from 'react';
import {
  View, Text
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button';
import images from '@assets/images';

import PrivacyPolicyWebView from '../Settings/PrivacyPolicyWebView'
import Icon from 'react-native-vector-icons/EvilIcons';
import NavBarLogo from '../NavigationBar/NavBarLogo'


export class PrivacyPolicyScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <NavBarLogo />,
    // TODO: Add Settings page
    headerLeft: <Button onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={50} color="white" />

                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render() {
    return(
        <PrivacyPolicyWebView />
    )
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyScreen);
