import * as types from './types'
import { performFetchUnreadCountTask, performLoadMessageListTask, performLoadMessageThreadTask } from '../lib/scoopAPI'
import { NavigationActions } from 'react-navigation';


export function getUnreadCount(){
  return(dispatch, getState) => {
    // Getting unread count
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken

    performFetchUnreadCountTask(scoopUserId, scoopUserToken).then((result)=>{
      // result
      dispatch(setUnreadCount(result.unreadCount))
    })


  }
}


export function getMessageList(){
  return(dispatch, getState) => {
    console.log("Getting message list")
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken

    performLoadMessageListTask(scoopUserId, scoopUserToken).then((result)=>{
      console.log(result)
      dispatch(setMessageList(result.messages))
    })

  }
}


export function getMessageThread(){
  return(dispatch, getState) => {
    console.log("Getting thread contents")
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken


  }
}


export function goToChatDetail(){
  return(dispatch, getState)=> {
    dispatch(NavigationActions.navigate({ routeName: 'ChatDetail' }))
  }
}

export function setMessageTarget(targetId){
  return(dispatch, getState)=> {
    dispatch(setMessageTargetId(targetId))
  }
}


export function setMessageTargetId(targetId){
  return {
    type: types.SET_MESSAGE_TARGET_ID,
    targetId
  }
}

export function setUnreadCount(unreadCount){
  return {
    type: types.SET_UNREAD_COUNT,
    unreadCount
  }
}

export function setMessageList(messages){
  return {
    type: types.SET_MESSAGE_LIST,
    messages
  }
}

export function setMessageThreadContent(messages){
  return {
    type: types.SET_THREAD_CONTENT,
    messages
  }
}





export function editChats(){
  //dispatching edit chats
  return(dispatch) => {
    dispatch(enableDeleteMode())
  }
}

export function cancelEditChats(){
  return(dispatch) => {
    dispatch(disableDeleteMode())
  }
}


function disableDeleteMode(){
  return {
    type: types.EDIT_CHATS,
    editMessagesToggled: false
  }
}

function enableDeleteMode(){
  return {
    type: types.EDIT_CHATS,
    editMessagesToggled: true
  }
}
