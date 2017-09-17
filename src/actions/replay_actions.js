import axios from 'axios';

import Auth from '../lib/Auth';

export const FETCH_REPLAYS = 'FETCH_REPLAYS';
export const FETCH_CURRENT_REPLAY_STATS = 'FETCH_CURRENT_REPLAY_STATS';

export function fetchReplays(endpoint = null) {
  if (endpoint == null) { endpoint = `${process.env.API_HOST}/list`; }
  let promise = axios.get(endpoint, {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }});

  return {
    type: FETCH_REPLAYS,
    payload: promise
  }
}

export function fetchCurrentReplay(replayId) {
  let url = `${process.env.API_HOST}/replays/${replayId}`
  let promise = axios.get(url, {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
  });

  return {
    type: FETCH_CURRENT_REPLAY_STATS,
    payload: promise
  }
}
