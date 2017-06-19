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
    case 'Edit':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Edit' }), state);
    case 'AlbumContents':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'AlbumContents'}), state);
    case 'RESET_MY_PROFILE_NAV':
    {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Edit'})
        ]
      })
      return MyProfileNavigator.router.getStateForAction(resetAction, state);

    }


    default:
      if (action.type === 'Navigation/NAVIGATE') {
              const { routes, index } = state;
              const { routeName, params } = action;
              currentTab = routes
              const lastScene = currentTab[currentTab.length - 1];

              // Check for duplication
              if (lastScene.routeName === routeName && (lastScene.params == params)) {
                  return state;
              }
          }


      return MyProfileNavigator.router.getStateForAction(action, state);
  }
}
