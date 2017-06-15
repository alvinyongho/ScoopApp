import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import FeedScreen from '../components/HomeScreens/FeedScreen'
import FilterScreen from '../components/HomeScreens/FilterScreen'
import ProfileScreen from '../components/HomeScreens/ProfileScreen'
import ChatDetailScreen from '../components/Messenger/ChatDetailScreen'

export const HomeNavigator = StackNavigator({
  Feed:       { screen: FeedScreen },
  Filter:     { screen: FilterScreen },
  Profile:    { screen: ProfileScreen },
  SendMessageFromFeed: { screen: ChatDetailScreen },
});

const HomeWithNavigationState = ({dispatch, homeNav}) => (
  <HomeNavigator navigation={addNavigationHelpers({ dispatch, state: homeNav })} />
);

HomeWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  homeNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  homeNav: state.homeNav,
});

export default connect(mapStateToProps)(HomeWithNavigationState);
