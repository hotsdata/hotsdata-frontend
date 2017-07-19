import axios from 'axios';
import _ from 'lodash';

import Auth from '../lib/Auth';

export const REGISTER_IN_PROGRESS = 'REGISTER_IN_PROGRESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const UPDATE_USER_IN_PROGRESS = 'UPDATE_USER_IN_PROGRESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

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


export function updateUserInProgress(bool) {
  return { type: UPDATE_USER_IN_PROGRESS, isLoading: bool }
}

export function userUpdateSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user: user
  }
}

export function userUpdateFailure(data) {
  return {
    type: UPDATE_USER_FAILURE,
    data: data
  }
}

export function updateUser(user) {
  const endpoint = "http://api.hotsdata.com/user";

  return (dispatch) => {
    dispatch(updateUserInProgress(true));

    axios.put(endpoint, user , {
        headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
      .then(response => {
        let responseData = response.data;

        dispatch(updateUserInProgress(false));
        if(responseData.result == true) {
          dispatch(userUpdateSuccess(responseData.user));
        } else {
          dispatch(updateUserFailed(responseData));
        }
      })
  }
}

export function changePassword(user, newPassword) {
  // let data = _.merge(user, {password: newPassword});
  let data = { password: newPassword };
  const endpoint = "http://api.hotsdata.com/user";
  let promise = axios.put(endpoint, data , {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
  });
  return {
    type: UPDATE_PASSWORD,
    payload: promise
  }
}
