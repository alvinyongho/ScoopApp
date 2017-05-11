import { NavigationActions } from 'react-navigation';
import { MyProfileNavigator } from '../navigators/MyProfileNavigator';

const initialNavState = MyProfileNavigator.router.getStateForAction(
  MyProfileNavigator.router.getActionForPathAndParams('Edit'));

export function myProfileNav(state = initialNavState, action){
  switch (action.type) {
    default:
      return MyProfileNavigator.router.getStateForAction(action, state);
  }
}
