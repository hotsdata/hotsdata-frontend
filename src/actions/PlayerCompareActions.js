import axios from 'axios';

import { transformAllPlayerHerosData } from '../lib/PlayerHeroDataTransformer';

export const ADD_PLAYER_COMPARE_IN_PROGRESS = 'ADD_PLAYER_COMPARE_IN_PROGRESS';
export const ADD_PLAYER_COMPARE_SUCCESS = 'ADD_PLAYER_COMPARE_SUCCESS';
export const ADD_PLAYER_COMPARE_FAILURE = 'ADD_PLAYER_COMPARE_FAILURE';
export const REMOVE_PLAYER_COMPARE = 'REMOVE_PLAYER_COMPARE';

export function addPlayerCompareInProgress(toonhandle, bool) {
  return {
    type: ADD_PLAYER_COMPARE_IN_PROGRESS,
    toonhandle: toonhandle,
    isLoading: bool
  }
}

export function addPlayerCompareFailed(response) {
  return {
    type: ADD_PLAYER_COMPARE_FAILURE,
    error: response
  }
}

export function addPlayerCompareSuccess(heroData) {
  return {
    type: ADD_PLAYER_COMPARE_SUCCESS,
    player: heroData
  }
}

export function addPlayerCompare(player) {
  return (dispatch) => {
    dispatch(addPlayerCompareInProgress(player.toonhandle, true));
    let endpoint = `${process.env.API_HOST}/player/heroes/?toonhandle=${player.toonhandle}`

    axios.get(endpoint, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
      .then(response => {
        let responseData = response.data;

        dispatch(addPlayerCompareInProgress(player.toonhandle, false));
        if (responseData.hasOwnProperty('msg')) {
          dispatch(addPlayerCompareFailed(responseData.msg));
        } else if (responseData.length == 0) {
          dispatch(addPlayerCompareFailed('No Data'));
        } else {
          let heroData = transformAllPlayerHerosData(player, responseData[0]);
          dispatch(addPlayerCompareSuccess(heroData));
        }

        return Promise.resolve();
      })
      .catch(err => {
        // Handle coding errors
        if (err.hasOwnProperty('response') === false) {
          dispatch(addPlayerCompareInProgress(player.toonhandle, false));
          dispatch(addPlayerCompareFailed('Unknown error'));

          return;
        }

        let responseData = err.response.data;

        dispatch(addPlayerCompareInProgress(player.toonshandle, false));
        dispatch(addPlayerCompareFailed(responseData.msg));
      });
  }
}

export function removePlayerCompare(toonhandle) {
  return {
    type: REMOVE_PLAYER_COMPARE,
    toonhandle: toonhandle
  }
}
