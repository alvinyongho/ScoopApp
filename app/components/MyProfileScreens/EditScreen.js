import React, {Component} from 'react';
import {
  View, Text
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Button from 'react-native-button';
import images from '@assets/images';

// import Home from '../../containers/Home';

import { bindActionCreators } from 'redux';



export class EditScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Scoop',
    headerRight: <Button onPress={() => navigation.navigate('Filter')}>
                         <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Filters</Text>
                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render() {
    return(
      <View><Text>Test</Text></View>
    )
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  filter: () => dispatch(NavigationActions.navigate({ routeName: 'Edit' })),
});


export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);
