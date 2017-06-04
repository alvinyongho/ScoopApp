import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import {StyleSheet} from 'react-native'

import HomeWithNavigationState from './HomeNavigator';
import MyProfileWithNavigationState from './MyProfileNavigator';
import MessengerWithNavigationState from './MessengerNavigator';


class HomeTabNavigator extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
  };
  render() {
    return (
      <HomeWithNavigationState />
    );
  }
}

class MessageTabNavigator extends React.Component {
  componentWillMount(){
    this.props.navigation.setParams({hideTabBar: false})
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    // if(navigation.state.params != undefined){
    //   navigation.setParams({hideTabBar: false})
    // }

    return ({
    tabBarLabel: 'Message',
    tabBarVisible: navigation.state.params != undefined? !navigation.state.params.hideTabBar : true
  })}

  render() {
    return (
      <MessengerWithNavigationState />
    );
  }
}

class MyProfileTabNavigator extends React.Component {
  componentWillMount(){
    this.props.navigation.setParams({hideTabBar: false})
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return ({
    tabBarLabel: 'Profile',
    tabBarVisible: navigation.state.params != undefined? !navigation.state.params.hideTabBar : true
  })}
  render() {
    return (
      <MyProfileWithNavigationState />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export const ScoopTabsNavigator = TabNavigator({
  Home: { screen: HomeTabNavigator, },
  Message: { screen: MessageTabNavigator, },
  MyProfile: { screen: MyProfileTabNavigator, },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  lazy: true,
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
