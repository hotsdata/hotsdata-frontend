import axios from 'axios';

export const REGISTER_USER = 'REGISTER_USER';

export function registerUser(user) {
  let promise = axios.post("http://api.hotsdata.com/register", user);

  return {
    type: REGISTER_USER,
    payload: promise
  }
}
