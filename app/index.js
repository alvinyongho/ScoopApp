import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
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
    return(
      <View style={styles.container}>
        <FeedList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
