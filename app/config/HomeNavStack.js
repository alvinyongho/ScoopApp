import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ScoopLogoHere',
    headerRight: <Button title="Filters"
                       onPress={() => navigation.navigate('Filters')}
                 />,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color:'white'}
  });
  constructor(props) {
    super (props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text> MainScreen Here </Text>
      </View>
    )
  }
}


export class FiltersScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ScoopLogoHere',
    headerLeft: <Button title="Cancel"
                        onPress={() => navigation.goBack()}
                />,
    headerRight: <Button title="Save"
                        onPress={() => navigation.goBack()}
                />,
  });
  constructor(props) {
    super (props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text> Filters Here </Text>
      </View>
    )
  }
}



export const HomeNavStack = StackNavigator({
  Main: { screen: MainScreen },
  Filters: {screen: FiltersScreen},
});
