import * as FeedlistActions from './feedlist';
import * as LoginActions from './auth';
import * as FilterActions from './filter';
import * as MessengerActions from './messenger';

export const ActionCreators = Object.assign({},
  LoginActions,
  FeedlistActions,
  FilterActions,
  MessengerActions
);
