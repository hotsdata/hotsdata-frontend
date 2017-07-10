import axios from 'axios';

export const ADD_PLAYER_COMPARE_IN_PROGRESS = 'ADD_PLAYER_COMPARE_IN_PROGRESS';
export const ADD_PLAYER_COMPARE_SUCCESS = 'ADD_PLAYER_COMPARE_SUCCESS';
export const ADD_PLAYER_COMPARE_FAILURE = 'ADD_PLAYER_COMPARE_FAILURE';

export function addPlayerCompareInProgress(playerId, bool) {
  return {
    type: ADD_PLAYER_COMPARE_IN_PROGRESS,
    playerId: playerId,
    isLoading: true
  }
}

export function addPlayerCompareFailed(response) {
  return {
    type: ADD_PLAYER_COMPARE_FAILURE,
    error: response
  }
}

export function addPlayerCompareSuccess(response) {
  return {
    type: ADD_PLAYER_COMPARE_SUCCESS,
    player: response[0]
  }
}

export function addPlayerCompare(playerId) {
  return (dispatch) => {
    dispatch(addPlayerCompareInProgress(playerId, true));
    let endpoint = `http://api.hotsdata.com/player/heroes/${playerId}`

    axios.get(endpoint, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
      .then(response => {
        let responseData = response.data;

        dispatch(addPlayerCompareInProgress(playerId, false));
        if (responseData.hasOwnProperty('msg')) {
          dispatch(addPlayerCompareFailed(responseData.msg));
        } else {
          dispatch(addPlayerCompareSuccess(responseData));
        }

        return Promise.resolve();
      })
      .catch(err => {
        // Handle coding errors
        if (err.hasOwnProperty('response') === false) {
          dispatch(addPlayerCompareInProgress(playerId, false));
          dispatch(addPlayerCompareFailed('Unknown error'));

          return;
        }

        let responseData = err.response.data;

        dispatch(addPlayerCompareInProgress(playerId, false));
        dispatch(addPlayerCompareFailed(responseData.msg));
      });
  }
}
