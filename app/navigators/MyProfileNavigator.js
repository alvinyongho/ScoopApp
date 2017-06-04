import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import EditScreen from '../components/MyProfileScreens/EditScreen'
import ImportAlbumScreen from '../components/MyProfileScreens/ImportAlbumScreen'
import ImportFromGalleryScreen from '../components/MyProfileScreens/ImportFromGalleryScreen'
import PicturePreviewScreen from '../components/MyProfileScreens/PicturePreviewScreen'

import ProfileScreen from '../components/HomeScreens/ProfileScreen'
import SettingsScreen from '../components/SettingsScreens/SettingsScreen'
import NotificationsScreen from '../components/SettingsScreens/NotificationsScreen'
import PrivacyScreen from '../components/SettingsScreens/PrivacyScreen'
import DeleteAccountScreen from '../components/SettingsScreens/DeleteAccountScreen'
import PrivacyPolicyScreen from '../components/SettingsScreens/PrivacyPolicyScreen'
import TOSScreen from '../components/SettingsScreens/TOSScreen'



export const MyProfileNavigator = StackNavigator({
  Edit:                  { screen: EditScreen },
  ImportPicture:         { screen: ImportAlbumScreen },
  AlbumContents:         { screen: ImportFromGalleryScreen },
  PicturePreview:        { screen: PicturePreviewScreen },

  PreviewProfile:        { screen: ProfileScreen },

  Settings:              { screen: SettingsScreen },
  SettingsNotifications: { screen: NotificationsScreen },
  SettingsPrivacy:       { screen: PrivacyScreen },
  SettingsDeleteAccount: { screen: DeleteAccountScreen },
  SettingsPrivacyPolicy: { screen: PrivacyPolicyScreen },
  SettingsTOS:           { screen: TOSScreen },

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
