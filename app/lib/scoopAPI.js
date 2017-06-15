const BASEURL = 'https://scoopdatingapp.com/api/'
const CLIENT_SECRET = 'scoo'

export async function performTaskWithParams(task, params){
  try{
    let response = await fetch(BASEURL,{
      method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'},
      body: `task=${task}&${params}`
    })
    let responseJson = await response.json()
    return responseJson.results
  } catch(error){
    console.log('error')
  }
}

function filterSettingsParamString(filterSettings){
  const filterStrArr = Object.keys(filterSettings).map((key, index) => {
    return `${key}=${filterSettings[key]}`
  })
  return filterStrArr.join('&')
}

export function getUserIdAndToken(facebookId){
  return performTaskWithParams('loginRegister', `z=${CLIENT_SECRET}&facebookId=${facebookId}`)
}



//
export function performLoginRegisterUsingFields(facebookId, accessToken, fields){

  console.log("PERFORMING LOGIN_REGISTER")

  console.log(accessToken)
  console.log(fields)

  let gender = 1
  if(fields.gender === "male" || fields.gender === "1"){
    gender = 1
  } else {
    gender = 2
  }

  additionalFields = [ `aboutMe=${fields.aboutMe}`,
    `birthday=${fields.birthday}`,
    `education=${fields.education}`,
    `firstName=${fields.firstName}`,
    `gender=${fields.gender}`,
    `lastName=${fields.lastName}`,
    `picURL=${fields.picURL}`,
    `work=${fields.work}`
  ].join('&')

  return performTaskWithParams('loginRegister', `z=${CLIENT_SECRET}&facebookId=${facebookId}&${additionalFields}`)



}



export function performSaveMyProfileImages(userId, userToken, imageArray){
  const changesToSaveParam = 'changesToSave%5Bimages%5D%5B%5D='
  textImageFieldParamsArray = imageArray.map((image, index)=>{
    return changesToSaveParam+(encodeURIComponent(image))
  })

  paramString = textImageFieldParamsArray.join('&')
  return performTaskWithParams('saveProfile', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}&${paramString}`)
}


export function performSaveFilterSettings(userId, userToken, filterSettings){
  let paramString = filterSettingsParamString({
                      filterAgeMax:         filterSettings.filterAgeMax,
                      filterAgeMin:         filterSettings.filterAgeMin,
                      filterHeightMax:      filterSettings.filterHeightMax,
                      filterHeightMin:      filterSettings.filterHeightMin,
                      filterInterestedIn:   filterSettings.filterInterestedIn,
                      filterLookingForMax:  filterSettings.filterLookingForMax,
                      filterLookingForMin:  filterSettings.filterLookingForMin,
                      filterSearchRadius:   filterSettings.filterSearchRadius
                    })
  return performTaskWithParams('saveFilterSettings', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}&${paramString}`)
}

export function performLoadFeedWithNoGeo(userId, userToken){
  return performTaskWithParams('loadFeed', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}`)
}

export function performLoadFeedTask(userId, userToken, lon, lat){
  return performTaskWithParams('loadFeed', `lat=${lat}&lon=${lon}&userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}`)
}

export function performLoadProfileTask(targetId, userId){
  return performTaskWithParams('loadProfile', `targetId=${targetId}&z=${CLIENT_SECRET}&userId=${userId}`)
}

export function performFetchUnreadCountTask(userId, userToken){
  return performTaskWithParams('fetchUnreadCount', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}`)
}

export function performLoadMessageListTask(userId, userToken){
  return performTaskWithParams('loadMessageList', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}`)
}

export function performLoadMessageThreadTask(userId, userToken, targetId){
  return performTaskWithParams('loadMessageThread', `targetId=${targetId}&userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}`)
}


export function performSendMessageTask(userId, userToken, targetId, message, notifyFrom){
  return performTaskWithParams('sendMessage', `targetId=${targetId}&userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}&message=${message}&notifyFrom=${notifyFrom}`)
}


export function performSetProfileHiddenTask(userId, userToken, isHidden){
  return performTaskWithParams('setProfileHidden', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}&isHidden=${isHidden}`)
}


export function performHideMessagesTask(userId, userToken, userIds){
  const changesToSaveParam = 'userIds%5B%5D='
  textImageFieldParamsArray = userIds.map((userId, index)=>{
    return changesToSaveParam+(encodeURIComponent(userId))
  })

  paramString = textImageFieldParamsArray.join('&')
  return performTaskWithParams('hideMessages', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}&${paramString}`)
}


export function setInitialUserProfileSetting(){
  // changesToSave%5Brelationship%5D=0&task=saveProfile&userId=1387&userToken=549btocg46&z=scoo


}
