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

import AllChatsListRow from '../../components/Messenger/AllChatsListRow';
import EditButton from './EditButton';


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
    // headerRight: <Button onPress={() => navigation.navigate('Filter')}>
    //                      <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Filters</Text>
    //              </Button>,


    headerLeft: <EditButton />,

    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <AllChatsListRow editMessagesStatus={this.props.editMessages} rowData={rowData} />}
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
