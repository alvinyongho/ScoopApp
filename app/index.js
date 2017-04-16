import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView, Navigator, TouchableHighlight
} from 'react-native';


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;
var Login = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
});


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

      <Login />
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
