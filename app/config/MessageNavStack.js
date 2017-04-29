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
        <Text> Message MainScreen Here </Text>
      </View>
    )
  }
}

export const MessageNavStack = StackNavigator({
  Main: { screen: MainScreen },
});
