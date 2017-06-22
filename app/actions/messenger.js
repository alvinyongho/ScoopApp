import * as types from './types'
import { performFetchUnreadCountTask,
  performLoadMessageListTask,
  performLoadMessageThreadTask,
  performSendMessageTask,
  performHideMessagesTask} from '../lib/scoopAPI'
import { NavigationActions } from 'react-navigation';


// export function deleteThreadsMarkedForDeletion(){
//   return(dispatch, getState) =>{
//     let scoopUserId = getState().scoopUserProfile.scoopId
//     let scoopUserToken = getState().scoopUserProfile.scoopToken
//     let userIds =
//
//   }
// }

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
  return{
    type: types.RESET_MESSENGER_ROUTE_STACK
  }
}

export function resetUserIdsMarkedForDeletion(){
  return (dispatch) =>{
    dispatch(resetIdsForDeletion())
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

//newfile.js


export function updateMessageListWithSentMessage(message){
  return(dispatch, getState) => {
    console.log("@@@@updating message list with sent message@@@@");
    // console.log(message);
    let targetId = getState().messenger.threadTargetId;
    // console.log(targetId);
    let previousList = getState().messenger.messageList;
    console.log(getState().viewingProfileDetail);
    let targetProfile = getState().viewingProfileDetail;
    console.log(targetProfile);
    console.log(previousList)
    let foundMessageThread = false;
    previousList.map((messageObject, index) => {
      if (targetId === messageObject.targetId){
        previousList[index].message = message;
        // previousList[index].date = "Just Now"; TODO:
        foundMessageThread = true;
      }
    })
    if(!foundMessageThread){
      previousList.push({
        date: new Date(),
        isUnread: 0,
        message: message,
        name: targetProfile.firstName,
        picURL: targetProfile.picURL,
        targetId: targetId,
        threadId: -1,
      })
    }

    dispatch(setMessageList(previousList));
  }
}

export function setIdsMarkedForDeletion(userIds){
  return(dispatch, getState) => {
    console.log("setting ids marked for deletion" + userIds)
    dispatch(markIdsForDeletion(userIds))
  }
}

export function hideMessage(targetId){
  return(dispatch, getState) =>{

    targetIdArr = [targetId]

    userId = getState().scoopUserProfile.scoopId
    userToken = getState().scoopUserProfile.scoopToken

    performHideMessagesTask(userId, userToken, targetIdArr).then((result)=>{
      // console.log("Performed hide messages task")
      // console.log(result)
      // TODO: update the state with remove

    })

  }
}


export function hideMessages(){
  return(dispatch, getState) => {
    userIdsArr = getState().messenger.userIdsMarkedForDeletion
    if(userIdsArr.length === 0 ){
      //"nothing to delete"
      return
    }
    // modify message list
    let messageList = getState().messenger.messageList
    newList = []
    messageList.map((item, index)=>{
      // if id is not found
      if(userIdsArr.indexOf(item.targetId) == -1){
        newList.push(item)
      }
    })
    dispatch(setMessageList(newList))

    userId = getState().scoopUserProfile.scoopId
    userToken = getState().scoopUserProfile.scoopToken

    performHideMessagesTask(userId, userToken, userIdsArr).then((result)=>{
      // console.log("FINISHED HIDING")
      // console.log(result)
      // TODO: Handle finished hiding reuslt
    })
  }
}


export function addMessageToThread(message){
  console.log("adding message to thread")
  return{
    type: types.ADD_MESSAGE_TO_THREAD,
    message
  }
}

export function markIdsForDeletion(userIds){
  return{
    type: types.MARK_USER_IDS_FOR_DELETION,
    userIds
  }
}

export function resetIdsForDeletion(){
  return{
    type: types.RESET_USER_IDS_FOR_DELETION
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
