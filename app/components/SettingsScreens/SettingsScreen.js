import React, {Component} from 'react';
import {
  View, Text
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button';
import images from '@assets/images';

import SettingsList from '../Settings/SettingsList'



export class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Scoop',
    // TODO: Add Settings page
    headerLeft: <Button onPress={() => navigation.goBack()}>
                         <Text style={{marginLeft: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Back</Text>
                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render() {
    return(
        <SettingsList />
    )
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
