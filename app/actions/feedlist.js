import * as types from './types'


// Make async call to the web service to get the list of matches that
// fit in the criterias defined by match attributes
export function fetchMatches(match_attributes){
  return(dispatch, getState) => {
    console.log(getState());

    // Placeholder response object
    let response = ([{'name': 'Han Solo', 'description': 'Star Wars'},
                     {'name': 'Forrest Gump', 'description': 'Tom Hanks'},
                     {'name': 'James Bond', 'description': 'Secret Service Agent'}
                   ]);

    // then
    dispatch(setFoundMatches( { matches_found: response } ));

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
