import axios from 'axios';

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

export function logOutUser() {
  let promise = null; //TODO: Fill in with axios promise to rails logout endpoint
  return {
    type: SESSION_LOGOUT,
    payload: promise
  }
}
