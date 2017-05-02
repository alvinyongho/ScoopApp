import { NavigationActions } from 'react-navigation';

import { MyProfileNavigator } from '../navigators/MyProfileNavigator';

// Start with one route, which is the homefeed. Start with more routess if we
// want to include an onboarding screen.
const initialNavState = MyProfileNavigator.router.getStateForAction(
  MyProfileNavigator.router.getActionForPathAndParams('Edit'));


// const firstAction = MyProfileNavigator.router.getActionForPathAndParams('Edit');
// const tempNavState = MyProfileNavigator.router.getStateForAction(firstAction);
// const initialNavState = MyProfileNavigator.router.getStateForAction(firstAction, tempNavState);


// Set to true when we want to enable the tutorial overlay
// const onBoardingState = { tutorialEnabled: true };

export function myProfileNav(state = initialNavState, action){
  switch (action.type) {
    default:
      return MyProfileNavigator.router.getStateForAction(action, state);
  }
}

//// Probably no tutorial here? But maybe someday...
// export function homeTutorial(state = onBoardingState, action){
//   switch (action.type) {
//     case 'EnableTutorial':
//       return { ...state, tutorialEnabled: true };
//     case 'DisableTutorial':
//       return { ...state, tutorialEnabled: false };
//     default:
//       return state;
//   }
// }
