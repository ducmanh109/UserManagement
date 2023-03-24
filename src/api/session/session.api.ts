import axios from 'axios';
import { LOGIN_ENDPOINT } from '../endpoint/login.endpoint';
import { LOGIN_REQUEST_TYPE } from './session.type';

export const onLoginAPI = (data: LOGIN_REQUEST_TYPE) => {
  return axios.post(LOGIN_ENDPOINT, data);
};
