import { NavigationActions } from 'react-navigation';
import { HomeNavigator } from '../navigators/HomeNavigator';



// Start with one route, which is the homefeed. Start with more routess if we
// want to include an onboarding screen.
const initialNavState = HomeNavigator.router.getStateForAction(
  HomeNavigator.router.getActionForPathAndParams('Feed'));

// Set to true when we want to enable the tutorial overlay
const onBoardingState = { tutorialEnabled: true };

export function homeNav(state = initialNavState, action){
  switch (action.type) {
    case NavigationActions.BACK:
      return HomeNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'Profile':
      return HomeNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Profile' }), state);
    case 'Filter':
      return HomeNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Filter' }), state);
    case 'Feed':
      return HomeNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Feed' }), state);
    case 'SendMessageFromFeed':
      return HomeNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SendMessageFromFeed' }), state);
    case 'RESET_FEED_ROUTE_STACK':
    {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Feed'})
        ]
      })
      return HomeNavigator.router.getStateForAction(resetAction, state);

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

      return HomeNavigator.router.getStateForAction(action, state);
  }
}

export function homeTutorial(state = onBoardingState, action){
  switch (action.type) {
    case 'EnableTutorial':
      return { ...state, tutorialEnabled: true };
    case 'DisableTutorial':
      return { ...state, tutorialEnabled: false };
    default:
      return state;
  }
}
