import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Button from 'react-native-button';
import images from '@assets/images';

import ChatDetail from '../../containers/Messenger/ChatDetail';

import { bindActionCreators } from 'redux';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


class ChatDetailScreen extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Scoop',
    headerLeft: <Button onPress={() => navigation.goBack()}>
                         <Text style={{marginLeft: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Back</Text>
                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render() {
    return(
      <ChatDetail />
    )
  }
}

// TODO: Remove this reference:
// <View>
//   <Button onPress={() => this.props.filter()}>
//     <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Filters</Text>
//   </Button>
// </View>


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  // filter: () => dispatch(NavigationActions.navigate({ routeName: 'Filter' })),
});


export default connect(mapStateToProps, mapDispatchToProps)(ChatDetailScreen);
