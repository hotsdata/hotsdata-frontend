import axios from 'axios';

export const PLAYER_SEARCH_IN_PROGRESS = 'PLAYER_SEARCH_IN_PROGRESS';
export const PLAYER_SEARCH_SUCCESS = 'PLAYER_SEARCH_SUCCESS';
export const PLAYER_SEARCH_FAILURE = 'PLAYER_SEARCH_FAILURE';

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

export function searchPlayers(searchString) {
  return (dispatch) => {
    dispatch(playerSearchInProgress(true));

    let endpoint = `http://localhost:8080/player/search/${searchString}`;

    axios.get(endpoint)
      .then(response => {
        let responseData = response.data;

        dispatch(playerSearchInProgress(false));
        dispatch(playerSearchSuccess(responseData));

        return Promise.resolve();
      })
      .catch(err => {
        dispatch(playerSearchInProgress(false));
        dispatch(playerSearchFailure(err))
      })
  }
}
