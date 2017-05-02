import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
// import { HomeNavStack } from './HomeNavStack';
import { MyProfileNavStack } from './MyProfileNavStack';
import { MessageNavStack } from './MessageNavStack';


import HomeWithNavigationState from '../navigators/HomeNavigator';
import MyProfileWithNavigationState from '../navigators/MyProfileNavigator';
import {MyProfileNavigator} from '../navigators/MyProfileNavigator';


// import EditScreen from '../components/MyProfileScreens/EditScreen';

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
  static navigationOptions = {
    tabBarLabel: 'Message',
  };

  render() {
    return (
      <MessageNavStack />
    );
  }
}


class MyProfileTabNavigator extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
  };

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

export const TabStack = TabNavigator({
  Home: {
    screen: HomeTabNavigator,
  },
  Message: {
    screen: MessageTabNavigator,
  },
  MyProfile: {
    screen: MyProfileTabNavigator,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
});
