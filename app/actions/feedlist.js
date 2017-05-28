import * as types from './types'



async function performLoadFeedTask(userId, userToken){
  try{


    let response = await fetch('https://scoopdatingapp.com/api/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',

      },
      body:
        `task=loadFeed&userId=${userId}&userToken=${userToken}&z=scoo`
    })
    let responseJson = await response.json()

    // console.log(responseJson.results.users)
    return responseJson.results


  } catch(error) {
    console.log(error);
  }
}



// Make async call to the web service to get the list of matches that
// fit in the criterias defined by match attributes
export function fetchMatches(match_attributes){
  return(dispatch, getState) => {

    let retrievedFeedResult = performLoadFeedTask(579, 'bdvvqtctgs').then((results) => {
        const response = results.users.map((user, index) => {
          console.log(user)
          return {
            id: user.userId,
            name: user.name,
            image: user.picURL,
            jobTitle: user.jobTitle
          }
        })
        dispatch(setFoundMatches( { matches_found: response } ));
    });
  }
}

// Set found matches takes in a payload of fetched matches (args) => args.matches_found
// input: matches found
// output: state with the type
export function setFoundMatches( { matches_found } ){
  return {
    type: types.SET_FOUND_MATCHES,
    matches_found
  }
}

export function addMatch() {
  return {
    type: types.ADD_MATCH,
  }
}
