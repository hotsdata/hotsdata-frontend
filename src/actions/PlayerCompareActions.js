import axios from 'axios';

import { transformAllPlayerHerosData } from '../lib/PlayerHeroDataTransformer';

export const ADD_PLAYER_COMPARE_IN_PROGRESS = 'ADD_PLAYER_COMPARE_IN_PROGRESS';
export const ADD_PLAYER_COMPARE_SUCCESS = 'ADD_PLAYER_COMPARE_SUCCESS';
export const ADD_PLAYER_COMPARE_FAILURE = 'ADD_PLAYER_COMPARE_FAILURE';

export function addPlayerCompareInProgress(playerId, bool) {
  return {
    type: ADD_PLAYER_COMPARE_IN_PROGRESS,
    playerId: playerId,
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

export function addPlayerCompare(playerId) {
  return (dispatch) => {
    dispatch(addPlayerCompareInProgress(playerId, true));
    let fields = "takedowns,solokill,deaths,timespentdead,herodamage,siegedamage,healing,selfhealing,damagetaken,experiencecontribution,match_won,match_lost"
    let endpoint = `http://api.hotsdata.com/player/heroes/${playerId}?metric=${fields}`

    axios.get(endpoint, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
      .then(response => {
        let responseData = response.data;

        dispatch(addPlayerCompareInProgress(playerId, false));
        if (responseData.hasOwnProperty('msg')) {
          dispatch(addPlayerCompareFailed(responseData.msg));
        } else {
          let heroData = transformAllPlayerHerosData(responseData[0]);
          console.log(heroData);
          dispatch(addPlayerCompareSuccess(heroData));
        }

        return Promise.resolve();
      })
      .catch(err => {
        console.log('err', err);
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
