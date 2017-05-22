import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const editMessages = createReducer(false, {
  [types.EDIT_CHATS](state, action){
    return action.editMessagesToggled;
  }
});
