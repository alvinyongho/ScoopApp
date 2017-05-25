import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

import {
  View,
  Text,
  ListView,
  Image,
} from 'react-native';

import AllChatsListRow from './AllChatsListRow';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';


export default class Messenger extends React.Component {
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      editMode: false,
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }

  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <AllChatsListRow pictureSize={50} rowData={rowData} />}
      />
    )
  }
}
