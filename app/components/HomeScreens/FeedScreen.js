import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Button from 'react-native-button';
import images from '@assets/images';

import Home from '../../containers/Home';

import { bindActionCreators } from 'redux';

import NavBarLogo from '../NavigationBar/NavBarLogo'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


class FeedScreen extends Component{
  static navigationOptions = ({navigation}) => ({
    headerTitle: (
      <NavBarLogo />
    ),
    headerRight: <Button onPress={() => navigation.navigate('Filter')}>
                         <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Filters</Text>
                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render() {
    return(
      <Home />
    )
  }
}

// TODO: Remove this reference:
// <View>
//   <Button onPress={() => this.props.filter()}>
//     <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Filters</Text>
//   </Button>
// </View>


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  filter: () => dispatch(NavigationActions.navigate({ routeName: 'Filter' })),
});


export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
