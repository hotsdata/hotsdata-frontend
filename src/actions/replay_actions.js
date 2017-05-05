import axios from 'axios';

export const FETCH_REPLAYS = 'FETCH_REPLAYS';
export const FETCH_CURRENT_REPLAY_STATS = 'FETCH_CURRENT_REPLAY_STATS';

export function fetchReplays() {
  let accountId = localStorage.getItem('accountId')
  accountId = (accountId ? accountId : "1-Hero-1-775282")
  let endpoint = `http://54.202.193.48/list/${accountId}`;
  let promise = axios.get(endpoint);

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
