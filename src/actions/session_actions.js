import axios from 'axios';

import Auth from '../lib/Auth';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export function loginSuccess() {
  console.log('success');
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials) {
  let promise = axios.post("http://api.hotsdata.com/login", credentials);

  return {
    type: SESSION_LOGIN,
    payload: promise
  }
}

export function logoutUser() {
  Auth.deauthenticateUser();
  return {
    type: SESSION_LOGOUT,
    payload: null
  }
}
