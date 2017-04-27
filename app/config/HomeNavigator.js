import React from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super (props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text> Test </Text>
      </View>
    )
  }
}

export const HomeNavigator = StackNavigator({
  Home: { screen: HomeScreen },
});
