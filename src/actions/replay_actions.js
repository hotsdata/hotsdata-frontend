import axios from 'axios';

import Auth from '../lib/Auth';

export const FETCH_REPLAYS = 'FETCH_REPLAYS';
export const FETCH_CURRENT_REPLAY_STATS = 'FETCH_CURRENT_REPLAY_STATS';

export function fetchReplays() {
  let endpoint = `http://api.hotsdata.com/list`;
  let promise = axios.get(endpoint, {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }});

  return {
    type: FETCH_REPLAYS,
    payload: promise
  }
}

export function fetchCurrentReplay(replayId) {
  let url = `http://54.202.193.48/replays/${replayId}`
  let promise = axios.get(url)

  return {
    type: FETCH_CURRENT_REPLAY_STATS,
    payload: promise
  }
}
