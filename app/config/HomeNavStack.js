import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from 'react-native-button';

// Containers
import Home from '../containers/Home';
import Filter from '../containers/Filter';

// Logo
import images from '@assets/images';


class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Scoop',
    headerRight: <Button onPress={() => navigation.navigate('Filters')}>
                         <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Filters</Text>
                </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });
  constructor(props) {
    super (props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <Home/>
    )
  }
}


export class FiltersScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ScoopLogoHere',
    headerLeft: <Button onPress={() => navigation.goBack()}
                           style={{fontSize: 20, color: 'white', fontFamily:'Avenir-Light'}}
                         >
                         <Text style={{marginLeft: 20,
                           fontFamily:'Avenir-Light',
                           fontSize: 18, color:'white'}}>
                           Cancel
                         </Text>
                </Button>,
    headerRight: <Button onPress={() => navigation.goBack()}
                           style={{fontSize: 20, color: 'white', fontFamily:'Avenir-Light'}}
                         >
                         <Text style={{marginRight: 20,
                           fontFamily:'Avenir-Light',
                           fontSize: 18, color:'white'}}>
                           Save
                         </Text>
                </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color:'white', alignSelf: 'center'},
  });

  constructor(props) {
    super (props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Filter />
      </View>
    )
  }
}

export const HomeNavStack = StackNavigator({
  Main: { screen: MainScreen },
  Filters: {screen: FiltersScreen},
});
