import React, { Component } from 'react';
import {
  View,
  Image,
  Navigator,
  Button,
  Text
} from 'react-native';


import { TabNavigator } from 'react-navigation';

import FeedList from '../FeedList/index.js'




export const ScoopTabsNavigator = TabNavigator({
  Home: {
    screen: FeedList,
  },

}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
