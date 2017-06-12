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

import MessageListRowItem from './MessageListRowItem';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';


export class Messenger extends React.Component {
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      editMode: false,
      dataSource: ds.cloneWithRows([])

    };
  }

  componentWillMount(){
    this.props.getMessageList()
  }

  componentDidMount(){
    console.log(this.props.messageList)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.setState({dataSource:ds.cloneWithRows (
      this.props.messageList.map((item, index)=>{
        return item
      })
    )})
  }

  componentDidReceiveProps(nextProps){
  }


  render(){
    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <MessageListRowItem pictureSize={50} rowData={rowData} />}
      />
    )
  }
}


// maps action creator calls to a dispatch to update the state
// Bind actions (dispatcher) to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    messageList: state.messenger.messageList
  }
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
