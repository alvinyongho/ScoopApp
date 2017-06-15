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
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      userIdsMarkedForDeletion: []

    };
  }

  componentWillMount(){
    this.props.getMessageList()

  }

  componentDidMount(){
    // console.log(this.props.messageList)

  }
  

  componentWillReceiveProps(nextProps){

    console.log("@@@@COMPONENT WILL RECEIVE PROPS IN THE MESSENGER COMPONENT")
    console.log("@@@@COMPONENT WILL RECEIVE PROPS IN THE MESSENGER COMPONENT")
    console.log("@@@@COMPONENT WILL RECEIVE PROPS IN THE MESSENGER COMPONENT")
    console.log("@@@@COMPONENT WILL RECEIVE PROPS IN THE MESSENGER COMPONENT")
    console.log("@@@@COMPONENT WILL RECEIVE PROPS IN THE MESSENGER COMPONENT")



    if (nextProps.messageList !== [] && nextProps.messageList !== undefined){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      this.setState(
        {dataSource:ds.cloneWithRows (
        nextProps.messageList.map((item, index)=>{
          return item
        })
      )})
    }
  }

  addUserIdForDeletion = (rowData) => {
    // handle add user id for deletion
    targetId = rowData.targetId
    userIdsMarkedForDeletion = this.state.userIdsMarkedForDeletion
    userIdsMarkedForDeletion.push(targetId)
    this.setState({userIdsMarkedForDeletion})

    this.props.setIdsMarkedForDeletion(userIdsMarkedForDeletion)

    // console.log(userIdsMarkedForDeletion)
  }
  removeUserIdForDeletion = (rowData) =>{
    // handle remove user id for deletion
    targetId = rowData.targetId
    userIdsMarkedForDeletion = this.state.userIdsMarkedForDeletion
    index = userIdsMarkedForDeletion.indexOf(targetId)
    if(index > -1){
      userIdsMarkedForDeletion.splice(index,1)
      this.setState({userIdsMarkedForDeletion})
    }

    this.props.setIdsMarkedForDeletion(userIdsMarkedForDeletion)


    // console.log(userIdsMarkedForDeletion)
  }

  render(){
    return (
      <ListView
        enableEmptySections={true}
        removeClippedSubviews={false} // current workaround about list view not showing up bug
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          return <MessageListRowItem  cellToggledForDeletion={()=>this.addUserIdForDeletion(rowData)}
                                      cellCanceledForDeletion={()=>this.removeUserIdForDeletion(rowData)}
                                      pictureSize={50} rowData={rowData} />}}
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
    messageList: state.messenger.messageList,
  }
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
