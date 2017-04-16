import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView, Navigator, TouchableHighlight
} from 'react-native';




class FeedList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return(
      <View style={{paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}


var PERSONS = [
  {name: 'Justin Warmkessel', description: 'Tech lead'},
  {name: 'Bob', description: 'Placeholder description'},
  {name: 'Susan', description: 'Foo Bar'}
]



export default class SharedEntry extends Component {
  constructor(props) {
    super (props);

    this.state = {};
  }
  render() {
    const routes = [
    {title: 'First Scene', index: 0},
    {title: 'Second Scene', index: 1},
    ];

    return(

      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          <TouchableHighlight onPress={() => {
            if (route.index === 0) {
              navigator.push(routes[1]);
            } else {
              navigator.pop();
            }
          }}>
          <Text>Hello {route.title}!</Text>
          </TouchableHighlight>
        }

        navigationBar={
          <Navigator.NavigationBar
           routeMapper={{
             LeftButton: (route, navigator, index, navState) =>
              { return (<Text>Cancel</Text>); },
             RightButton: (route, navigator, index, navState) =>
               { return (<Text>Done</Text>); },
             Title: (route, navigator, index, navState) =>
               { return (<Text style={{fontSize:24}}>Scoop</Text>);
               },
           }}
           style={{backgroundColor: 'gray'}}
          />
        }

        style={{padding: 100}}
      />
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
  }
});
