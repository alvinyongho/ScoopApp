import * as FeedlistActions from './feedlist';
import * as LoginActions from './auth'

export const ActionCreators = Object.assign({},
  LoginActions,
  FeedlistActions,
);
