import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Button from 'react-native-button';
import images from '@assets/images';
// import Filter from '../../containers/Filter';

import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';   // Retrieves all the action creators
import NavBarLogo from '../NavigationBar/NavBarLogo'

import HistoryCollection from '../History/HistoryCollection'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavBarLogo />,
    headerLeft: <Button onPress={() => navigation.goBack()}
                           style={{fontSize: 20, color: 'white', fontFamily:'Avenir-Light'}}>
                         <Text style={{marginLeft: 20,
                           fontFamily:'Avenir-Light',
                           fontSize: 18, color:'white'}}>
                           Back
                         </Text>
                </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color:'white', alignSelf: 'center'},
    gesturesEnabled: false
  });

  constructor(props) {
    super (props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <HistoryCollection />
      </View>
    )
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapDispatchToProps)(HistoryScreen);