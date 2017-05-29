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

export function performSaveFilterSettings(userId, userToken, filterSettings){
  return performTaskWithParams('saveFilterSettings', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}&filterAgeMax=99&filterAgeMin=18&filterHeightMax=96&filterHeightMin=36&filterInterestedIn=3&filterLookingForMax=5&filterLookingForMin=1&filterSearchRadius=200`)
}

export function performLoadFeedWithNoGeo(userId, userToken){
  return performTaskWithParams('loadFeed', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}`)
}

export function performLoadFeedTask(userId, userToken, lon, lat){
  return performTaskWithParams('loadFeed', `lat=${lat}&lon=${lon}&userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}`)
}

export function performLoadProfileTask(targetId){
  return performTaskWithParams('loadProfile', `targetId=${targetId}&z=${CLIENT_SECRET}`)

}
