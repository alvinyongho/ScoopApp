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
