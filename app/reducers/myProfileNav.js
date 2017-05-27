import { NavigationActions } from 'react-navigation';
import { MyProfileNavigator } from '../navigators/MyProfileNavigator';

const initialNavState = MyProfileNavigator.router.getStateForAction(
  MyProfileNavigator.router.getActionForPathAndParams('Edit'));

export function myProfileNav(state = initialNavState, action){
  switch (action.type) {
    case 'PreviewProfile':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'PreviewProfile' }), state);
    case 'Settings':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Settings' }), state);
    case 'SettingsNotifications':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SettingsNotifications' }), state);
    case 'SettingsPrivacy':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SettingsPrivacy' }), state);
    case 'SettingsDeleteAccount':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SettingsDeleteAccount' }), state);
    case 'SettingsPrivacyPolicy':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SettingsPrivacyPolicy' }), state);
    case 'SettingsTOS':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SettingsTOS' }), state);
    case 'ImportPicture':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ImportPicture' }), state);

    case 'AlbumContents':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'AlbumContents'}), state);

    default:
      return MyProfileNavigator.router.getStateForAction(action, state);
  }
}
