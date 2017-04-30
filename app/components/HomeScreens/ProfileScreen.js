import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Button from 'react-native-button';
import images from '@assets/images';
import ProfileDetail from '../../containers/ProfileDetail';

import { bindActionCreators } from 'redux';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ScoopLogoHere',
    headerLeft: <Button onPress={() => navigation.goBack()}
                           style={{fontSize: 20, color: 'white', fontFamily:'Avenir-Light'}}>
                         <Text style={{marginLeft: 20,
                           fontFamily:'Avenir-Light',
                           fontSize: 18, color:'white'}}>
                           Back
                         </Text>
                </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color:'white', alignSelf: 'center'},
  });

  constructor(props) {
    super (props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <ProfileDetail />
      </View>
    )
  }
}


const mapDispatchToProps = dispatch => ({
});

export default connect(mapDispatchToProps)(ProfileScreen);
