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

export function performLoadFeedTask(userId, userToken){
  return performTaskWithParams('loadFeed', `userId=${userId}&userToken=${userToken}&z=${CLIENT_SECRET}`)
}

export function performLoadProfileTask(targetId){
  return performTaskWithParams('loadProfile', `targetId=${targetId}&z=${CLIENT_SECRET}`)

}
