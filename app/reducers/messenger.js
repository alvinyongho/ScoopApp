import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';


export const editMessages = createReducer(false, {
  [types.EDIT_CHATS](state, action){
    return action.editMessagesToggled;
  }
});


initialMessengerState = {
  messageList: [],
  unreadCount: 0,
  threadContent: [],
  threadTargetId: 0
}

export const messenger = createReducer(initialMessengerState,{
  [types.SET_UNREAD_COUNT](state, action){
    return update(state, {
      unreadCount: {$set: action.unreadCount}
    })
  },
  [types.SET_MESSAGE_LIST](state, action){
    return update(state, {
      messageList: {$set: action.messages}
    })
  },
  [types.SET_THREAD_CONTENT](state, action){
    return update(state, {
      threadContent: {$set: action.messages}
    })
  },
  [types.SET_MESSAGE_TARGET_ID](state, action){
    return update(state, {
      threadTargetId: {$set: action.targetId}
    })
  },

});
