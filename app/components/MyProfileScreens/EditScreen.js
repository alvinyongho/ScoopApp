import React, {Component} from 'react';
import {
  View, Text
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button';
import images from '@assets/images';

import EditProfileScrollView from '../PersonalProfile/EditProfileScrollView'


export class EditScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Scoop',
    // TODO: Add Settings page
    headerRight: <Button onPress={() => navigation.navigate('Settings')}>
                         <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Settings</Text>
                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render() {
    return(
      <EditProfileScrollView />
    )
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);
