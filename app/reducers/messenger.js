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
  threadTargetId: 0,
  userIdsMarkedForDeletion: []
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
  [types.ADD_MESSAGE_TO_THREAD](state, action){
    return update(state, {
      threadContent: {$push: [action.message]}
    })
  },
  [types.SET_MESSAGE_TARGET_ID](state, action){
    return update(state, {
      threadTargetId: {$set: action.targetId}
    })
  },
  [types.MARK_USER_IDS_FOR_DELETION](state, action){
    return update(state, {
      userIdsMarkedForDeletion: {$set: action.userIds}
    })
  },
  [types.RESET_USER_IDS_FOR_DELETION](state, action){
    return update(state, {
      userIdsMarkedForDeletion: {$set: []}
    })
  },
  [types.MESSAGE_LIST_REFRESHING](state, action){
    return update(state, {
      messengerRefreshing: {$set: action.isRefreshing}
    })
  }

});
