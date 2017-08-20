import axios from 'axios';

export const PLAYER_SEARCH_IN_PROGRESS = 'PLAYER_SEARCH_IN_PROGRESS';
export const PLAYER_SEARCH_SUCCESS = 'PLAYER_SEARCH_SUCCESS';
export const PLAYER_SEARCH_FAILURE = 'PLAYER_SEARCH_FAILURE';
export const PLAYER_SEARCH_CLEAR_RESULTS = 'PLAYER_SEARCH_CLEAR_RESULTS';

export function playerSearchInProgress(bool) {
  return {
    type: PLAYER_SEARCH_IN_PROGRESS,
    isLoading: bool
  }
}

export function playerSearchSuccess(data) {
  return {
    type: PLAYER_SEARCH_SUCCESS,
    results: data
  }
}

export function playerSearchFailure(error) {
  return {
    type: PLAYER_SEARCH_FAILURE,
    error: error
  }
}

export function playerSearchClearResults() {
  return {
    type: PLAYER_SEARCH_CLEAR_RESULTS
  }
}

export function searchPlayers(searchString) {
  return (dispatch) => {
    dispatch(playerSearchInProgress(true));

    let endpoint = `http://localhost:8080/player/search/${searchString.toLowerCase()}`;

    axios.get(endpoint)
      .then(response => {
        let responseData = response.data;
        let players = _.sortBy(responseData, ['name']);

        dispatch(playerSearchInProgress(false));
        dispatch(playerSearchSuccess(players));

        return Promise.resolve();
      })
      .catch(err => {
        dispatch(playerSearchInProgress(false));
        dispatch(playerSearchFailure(err))
      })
  }
}
