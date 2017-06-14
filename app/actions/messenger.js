import * as types from './types'
import { performFetchUnreadCountTask, performLoadMessageListTask, performLoadMessageThreadTask, performSendMessageTask} from '../lib/scoopAPI'
import { NavigationActions } from 'react-navigation';


export function getUnreadCount(){
  return(dispatch, getState) => {
    // Getting unread count
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken

    performFetchUnreadCountTask(scoopUserId, scoopUserToken).then((result)=>{
      dispatch(setUnreadCount(result.unreadCount))
    })


  }
}


export function getMessageList(){
  return(dispatch, getState) => {
    //Getting message list
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken

    performLoadMessageListTask(scoopUserId, scoopUserToken).then((result)=>{
      dispatch(setMessageList(result.messages))
    })
  }
}

export function getMessageThread(){
  return(dispatch, getState) => {
    //Getting thread contents
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken
    let targetId = getState().messenger.threadTargetId
    performLoadMessageThreadTask(scoopUserId, scoopUserToken, targetId).then((result)=>{
      dispatch(setMessageThreadContent(result.messages))
    })
  }
}

export function resetThreadContent(){
  return(dispatch) =>{
    dispatch(setMessageThreadContent([]))
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


export function resetMessengerTab(){
  return(dispatch) => {
    dispatch(resetMessengerRouteStack())
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

export function resetMessengerRouteStack(){
  console.log("RESET MESSENGER ROUTE STACK")
  return{
    type: types.RESET_MESSENGER_ROUTE_STACK
  }
}




// Send message
export function sendMessage(messageContent){
  return(dispatch, getState) => {
    // console.log("Sending a message")
    // console.log(messageContent)
    userId = getState().scoopUserProfile.scoopId
    userToken = getState().scoopUserProfile.scoopToken
    targetId = getState().messenger.threadTargetId
    message = messageContent
    notifyFrom = getState().myProfile.scoopApiStore.firstName

    messageFormat = {
      message: messageContent,
      senderId: userId,
      // sentDate: "2017-06-13 22:15:09"
    }
    dispatch(addMessageToThread(messageFormat))

    performSendMessageTask(userId, userToken, targetId, message, notifyFrom).then((result)=>{
      if(result === undefined){
        console.log("you got banned lol")
        // dispatch(addMessageToThread(messageFormat))
        return // a dispatch to user_blocked_alert
      }
      if(result.status === "99"){
        // TODO: error handle set profile to public
        console.log("need to set profile to public")
        // dispatch(addMessageToThread(messageFormat))
        return // a dispatch to user_currently_private_alert
      }
      else {
        // update the messages


      }

    })


  }
}



export function hideMessages(userIdsArr){
  return(dispatch, getState) => {
    //TODO:
    console.log("hide messages")

    // performHideMessagesTask(userId, userToken, userIdsArr).then((result)=>{
    //
    //    dispatch setMessageList
    // })
  }
}


export function addMessageToThread(message){
  console.log("adding message to thread")
  return{
    type: types.ADD_MESSAGE_TO_THREAD,
    message
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
