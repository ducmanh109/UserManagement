import { AxiosResponse } from 'axios';
import { action, flow, makeObservable, observable } from 'mobx';
import { SETUP_API } from '../../api/api.config';
import { onLoginAPI } from '../../api/session/session.api';
import {
  LOGIN_REQUEST_TYPE,
  SESSION_STATUS,
} from '../../api/session/session.type';
import { USER_TYPE } from '../../api/user/user.type';

class SessionStore {
  accessToken: string | null = null;
  session_status: string = SESSION_STATUS.AUTHORIZED;

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      session_status: observable,

      setAccessToken: action,
      setSessionStatus: action,

      onLogin: flow,
      onLogout: flow,
    });
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  setSessionStatus(status: string) {
    this.session_status = status;
  }

  *onLogin(data: LOGIN_REQUEST_TYPE) {
    try {
      const loginResponse: AxiosResponse<USER_TYPE> = yield onLoginAPI(data);

      if (!loginResponse.data) {
        return;
      }

      this.setAccessToken(loginResponse?.data?.accessToken);
      this.setSessionStatus('AUTHORIZED');

      SETUP_API.setHeaderToken(loginResponse?.data?.accessToken);
    } catch (error) {
      console.log('Login Fail With Error -->', error);
    }
  }

  *onLogout() {
    this.setAccessToken(null);
    this.setSessionStatus(SESSION_STATUS.UNAUTHORIZED);
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
