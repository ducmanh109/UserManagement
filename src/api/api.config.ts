import axios from 'axios';
import {SERVERS} from './api.servers';

const axiosDefault = axios.defaults;

const initAPIConfig = () => {
  axiosDefault.baseURL = SERVERS.DEVELOPMENT;
  axiosDefault.headers.common['Content-Type'] = 'application/json';
  axiosDefault.headers.common.Accept = 'application/json';
};

const setHeaderToken = (token: string) => {
  axiosDefault.headers.common.Authorization = token;
};

export const SETUP_API = {
  initAPIConfig,
  setHeaderToken,
};
