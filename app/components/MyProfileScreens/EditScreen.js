import React, {Component} from 'react';
import {
  View, Text, Image
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import {ActionCreators} from '../../actions'

import Button from 'react-native-button';
import images from '@assets/images';

import EditProfileScrollView from '../../containers/EditProfile/EditProfileScrollView'
import NavBarLogo from '../NavigationBar/NavBarLogo'


export class EditScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: (
      <NavBarLogo />
    ),
    // TODO: Add Settings page
    headerRight: <Button onPress={() => navigation.navigate('Settings')}>
                         <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Settings</Text>
                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  componentDidMount(){
  }

  render() {
    return(
      <EditProfileScrollView />
    )
  }
}


const mapStateToProps = state => ({

});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);
