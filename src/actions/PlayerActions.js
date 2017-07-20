import axios from 'axios';
import _ from 'lodash';

import Auth from '../lib/Auth';

export const FETCH_PLAYER_HERO_STATS_IN_PROGRESS = 'FETCH_PLAYER_HERO_STATS_IN_PROGRESS';
export const FETCH_PLAYER_HERO_STATS_SUCCESS = 'FETCH_PLAYER_HERO_STATS_SUCCESS';
export const FETCH_PLAYER_HERO_STATS_FAILURE = 'FETCH_PLAYER_HERO_STATS_FAILURE';

export function fetchPlayerHeroStatsInProgress(bool) {
  return {
    type: FETCH_PLAYER_HERO_STATS_IN_PROGRESS,
    isLoading: bool
  }
}

export function fetchPlayerHeroStatsSuccess(data) {
  return {
    type: FETCH_PLAYER_HERO_STATS_SUCCESS,
    heroStats: data[0]
  }
}

export function fetchPlayerHeroStatsFailure(errorMsg) {
  return {
    type: FETCH_PLAYER_HERO_STATS_FAILURE,
    error: errorMsg
  }
}

export function fetchPlayerHeroStats() {
  return (dispatch) => {
    dispatch(fetchPlayerHeroStatsInProgress(true));

    axios.get("http://api.hotsdata.com/player/heroes/6755?start_data=2014-1-1", {
      headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
      .then(response => {
        let responseData = response.data

        dispatch(fetchPlayerHeroStatsInProgress(false));
        if(responseData.hasOwnProperty('msg')) {
          dispatch(fetchPlayerHeroStatsFailure(responseData.msg));
        } else {
          dispatch(fetchPlayerHeroStatsSuccess(responseData));
        }

        return Promise.resolve();
      })
      .catch(err => {
        if (err.hasOwnProperty('response') === false) {
          dispatch(fetchPlayerHeroStatsInProgress(false));
          dispatch(fetchPlayerHeroStatsFailure('Unknown error'));

          return;
        }

        let responseData = err.response.data;

        dispatch(fetchPlayerHeroStatsInProgress(false));
        dispatch(fetchPlayerHeroStatsFailure(responseData.msg));
      });
    }
}
