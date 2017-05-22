import * as types from './types'


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
