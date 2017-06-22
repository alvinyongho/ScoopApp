import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

import {
  View,
  Text,
  ListView,
  Image,
  RefreshControl,
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
      userIdsMarkedForDeletion: [],
      isScrollEnabled: true,
      refreshing: false

    };
  }

  changeScrollState = (isEnabled) => {
    this.setState({
      isScrollEnabled: isEnabled
    })
  }

  componentWillMount(){
    this.props.getMessageList()

  }

  componentDidMount(){
    // console.log(this.props.messageList)

  }


  componentWillReceiveProps(nextProps){
    if (nextProps.messageList !== [] && nextProps.messageList !== undefined){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});



      console.log("WHAT IS THE RESULT OF DELETING???")
      console.log(ds.cloneWithRows (
        nextProps.messageList.map((item, index)=>{
          return item
        })
      ))



      this.setState(
        {dataSource:ds.cloneWithRows (
        nextProps.messageList.map((item, index)=>{
          return item
        })
      )})
    }
    if (nextProps.messengerRefreshing === true){
      this.setState({refreshing: false})
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

  _onRefresh(){
    this.setState({ refreshing: true });
    this.props.refreshMessengerList();
    // this.setState({ refreshing: false });
  }


  render(){
    return (
      <ListView
        refreshControl={
          <RefreshControl 
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />
        }
        scrollEnabled={this.state.isScrollEnabled}
        enableEmptySections={true}
        removeClippedSubviews={false} // current workaround about list view not showing up bug
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          return <MessageListRowItem  
                                      cellToggledForDeletion={()=>this.addUserIdForDeletion(rowData)}
                                      cellCanceledForDeletion={()=>this.removeUserIdForDeletion(rowData)}
                                      pictureSize={50} rowData={rowData} 
                                      changeScrollState={this.changeScrollState}/>}}
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
    messenger: state.messenger,
    messengerRefreshing: state.messenger.messengerRefreshing
  }
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
