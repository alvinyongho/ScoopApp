import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import EditScreen from '../components/MyProfileScreens/EditScreen'
import ProfileScreen from '../components/HomeScreens/ProfileScreen'


export const MyProfileNavigator = StackNavigator({
  Edit: { screen: EditScreen },
  PreviewProfile: { screen: ProfileScreen }
});


const MyProfileWithNavigationState = ({dispatch, myProfileNav}) => (
  <MyProfileNavigator navigation={addNavigationHelpers({ dispatch, state: myProfileNav })} />

);

MyProfileWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  myProfileNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  myProfileNav: state.myProfileNav,
});

export default connect(mapStateToProps)(MyProfileWithNavigationState);
