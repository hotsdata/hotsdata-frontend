import axios from 'axios';

import Auth from '../lib/Auth';

export const REGISTER_IN_PROGRESS = 'REGISTER_IN_PROGRESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function createInProgress(bool) {
  return {
    type: REGISTER_IN_PROGRESS,
    isLoading: bool
  }
}

export function creationFailed(response) {
  return {
    type: REGISTER_FAILED,
    error: response
  }
}

export function createSuccess(response) {
  return {
    type: REGISTER_SUCCESS,
    session: {
      token: response.token,
      user: response.user
    }
  }
}

export function registerUser(user) {
  return (dispatch) => {
    dispatch(createInProgress(true));

    axios.post("http://api.hotsdata.com/register", user)
      .then(response => {
        let responseData = response.data;

        dispatch(createInProgress(false));
        if (responseData.hasOwnProperty('msg')) {
          dispatch(creationFailed(responseData.msg));
        } else {
          dispatch(createSuccess(responseData));
        }

        return Promise.resolve();
      })
      .catch(err => {
        // Handle coding errors
        if (err.hasOwnProperty('response') === false) {
          dispatch(createInProgress(false));
          dispatch(creationFailed('Unknown error'));

          return;
        }

        let responseData = err.response.data;

        dispatch(createInProgress(false));
        dispatch(creationFailed(responseData.msg));
      });
  }
}
