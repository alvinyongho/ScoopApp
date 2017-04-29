import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'ScoopLogoHere',
  };
  constructor(props) {
    super (props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text> Profile MainScreen here </Text>
      </View>
    )
  }
}

export const MyProfileNavStack = StackNavigator({
  Main: { screen: MainScreen },
});
