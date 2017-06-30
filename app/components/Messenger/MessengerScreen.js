import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { NavigationActions } from 'react-navigation';


import {
  View,
  Text,
  ListView,
  Image,
} from 'react-native';

import Messenger from '../../containers/Messenger/Messenger'
import EditButton from '../../containers/Messenger/EditButton';
import DeleteButton from '../../containers/Messenger/DeleteButton';
import NavBarLogo from '../NavigationBar/NavBarLogo'


class MessengerScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <NavBarLogo />,
    headerLeft: <EditButton />,
    headerRight: <DeleteButton />,

    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render(){
    return(
      <Messenger />
    );
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state){
  return {
    editMessages: state.editMessages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);
