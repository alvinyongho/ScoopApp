import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { HomeNavStack } from './HomeNavStack';
import { ProfileNavStack } from './ProfileNavStack';
import { MessageNavStack } from './MessageNavStack';

class HomeTabNavigator extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarPosition: 'bottom',
  };

  render() {
    return (
      <HomeNavStack />
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


class ProfileTabNavigator extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
  };

  render() {
    return (
      <ProfileNavStack />
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
  Profile: {
    screen: ProfileTabNavigator,
  },


}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
