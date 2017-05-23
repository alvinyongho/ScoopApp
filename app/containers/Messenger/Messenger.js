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


class Messenger extends React.Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      editMode: false,
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };

  }

  toggleEditMode = () => {
    console.log('toggling edit mode')
  }


  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Scoop',
    headerLeft: <EditButton />,
    headerRight: <DeleteButton />,

    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <AllChatsListRow pictureSize={60} rowData={rowData} />}
      />
    )
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state){
  return {
    editMessages: state.editMessages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
