import axios from 'axios';

export const FETCH_FRIENDS_IN_PROGRESS = 'FETCH_FRIENDS_IN_PROGRESS';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE';

function fetchFriendsInProgress(bool) {
  return {
    type: FETCH_FRIENDS_IN_PROGRESS,
    isLoading: bool
  }
}

function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends: friends
  }
}

function fetchFriendsFailure(error) {
  return {
    type: FETCH_FRIENDS_FAILURE,
    error: error
  }
}

export function fetchFriends() {
  return (dispatch) => {
    dispatch(fetchFriendsInProgress(true));

    let endpoint = `${process.env.API_HOST}/player/teammates`;

    axios.get(endpoint, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
      .then(response => {
        let responseData = response.data;

        dispatch(fetchFriendsInProgress(false));
        if (responseData.hasOwnProperty('msg')) {
          dispatch(fetchFriendsFailure(responseData.msg));
        } else {
          dispatch(fetchFriendsSuccess(responseData));
        }

        return Promise.resolve();
      })
      .catch(err => {
        // Handle coding errors
        if (err.hasOwnProperty('response') === false) {
          dispatch(fetchFriendsInProgress(false));
          dispatch(fetchFriendsFailure('Unknown error'));

          return;
        }

        let responseData = err.response.data;

        dispatch(fetchFriendsInProgress(false));
        dispatch(fetchFriendsFailure(responseData.msg));
      })
  }
}
