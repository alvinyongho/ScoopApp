import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ActionSheet from 'react-native-actionsheet'
import Button from 'react-native-button';

import images from '@assets/images';
import ChatDetail from '../../containers/Messenger/ChatDetail';





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


const CANCEL_INDEX = 2
const DESTRUCTIVE_INDEX = 2
const options = [ 'Report', 'Ignore', 'Cancel' ]

class AdditionalItemsButton extends Component{
  constructor(props){
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
    this.state = {
      selected: ''
    }

  }

  showActionSheet() {
    this.ActionSheet.show()
  }

  handlePress(i) {
    this.setState({
      selected: i
    })
  }

  render(){
    return(
      <Button style={{flex:1}} onPress={this.showActionSheet}>
        <View style={{height: 30, justifyContent: 'center'}}>

            <View style={{marginRight: 10, flexDirection: 'row', justifyContent: 'center'}}>
                 <View style={{backgroundColor:'white', height: 6, width: 6, borderRadius: 6/2}}/>
                 <View style={{backgroundColor:'white', height: 6, width: 6, borderRadius: 6/2, marginLeft: 4}}/>
                 <View style={{backgroundColor:'white', height: 6, width: 6, borderRadius: 6/2, marginLeft: 4}}/>
            </View>
         </View>

         <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
       </Button>
    );
  }
}


class ChatDetailScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: 'Scoop',
    headerLeft: <Button onPress={() => navigation.goBack()}>
                         <Text style={{marginLeft: 15, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Back</Text>
                 </Button>,

    headerRight: <AdditionalItemsButton />,

    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  componentWillMount(){
    const setParamsAction = NavigationActions.setParams({
      params: { hideTabBar: true },
      key: "Message",
    });
    this.props.navigation.dispatch(setParamsAction);
  }

  componentWillUnmount(){
    const setParamsAction = NavigationActions.setParams({
      params: { hideTabBar: false },
      key: "Message",
    });
    this.props.navigation.dispatch(setParamsAction);
  }

  render() {
    return(
      <ChatDetail />
    )
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(ChatDetailScreen);
