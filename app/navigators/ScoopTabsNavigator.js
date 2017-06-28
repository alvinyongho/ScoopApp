import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import {StyleSheet, Image} from 'react-native'

import HomeWithNavigationState from './HomeNavigator';
import MyProfileWithNavigationState from './MyProfileNavigator';
import MessengerWithNavigationState from './MessengerNavigator';

import images from '@assets/images';


class HomeTabNavigator extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={images.tabBar_homeIcon}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <HomeWithNavigationState />
    );
  }
}

class MessageTabNavigator extends React.Component {
  componentDidMount(){
    this.props.navigation.setParams({hideTabBar: false})
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    // if(navigation.state.params != undefined){
    //   navigation.setParams({hideTabBar: false})
    // }

    return ({
    tabBarLabel: 'Message',
    tabBarVisible: navigation.state.params != undefined? !navigation.state.params.hideTabBar : true,
    tabBarIcon: ({tintColor}) => (
      <Image
        source={images.tabBar_inboxIcon}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  })}

  render() {
    return (
      <MessengerWithNavigationState />
    );
  }
}

class MyProfileTabNavigator extends React.Component {
  componentDidMount(){
    this.props.navigation.setParams({hideTabBar: false})
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return ({
    tabBarLabel: 'Profile',
    tabBarVisible: navigation.state.params != undefined? !navigation.state.params.hideTabBar : true,
    tabBarIcon: ({tintColor}) => (
      <Image
        source={images.tabBar_profileIcon}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  })}
  render() {
    return (
      <MyProfileWithNavigationState />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export const ScoopTabsNavigator = TabNavigator({
  Home: { screen: HomeTabNavigator, },
  Message: { screen: MessageTabNavigator, },
  MyProfile: { screen: MyProfileTabNavigator, },
}, {
  tabBarOptions: {
    activeTintColor: '#54C9EC',
    inactiveTintColor: 'gray',
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
});


// Pass in the addNavigationHelpers function with the dispatch
// which calls the action to change the tab state
const ScoopTabsWithNavigationState = ({dispatch, tabNav}) => (
  <ScoopTabsNavigator navigation =
    {addNavigationHelpers({dispatch, state: tabNav})} />
)

// Specifies which props needs to be passed into
// the TabNavigationState component above
ScoopTabsWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tabNav: PropTypes.object.isRequired,
};

// map the tabNav state to prop for handling which tab we are on
const mapStateToProps = state => ({
  tabNav: state.tabNav,
})

export default connect(mapStateToProps)(ScoopTabsWithNavigationState);
