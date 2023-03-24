import { AxiosResponse } from 'axios';
import { action, flow, makeObservable, observable } from 'mobx';
import { SETUP_API } from '../../api/api.config';
import { onLoginAPI } from '../../api/session/session.api';
import { LOGIN_REQUEST_TYPE } from '../../api/session/session.type';
import { USER_TYPE } from '../../api/user/user.type';

class SessionStore {
  accessToken: string = '';
  session_status: string = 'AUTHORIZED';

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      session_status: observable,

      setSessionStatus: action,

      onLogin: flow,
    });
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

      this.accessToken = loginResponse?.data?.accessToken;
      this.setSessionStatus('AUTHORIZED');

      SETUP_API.setHeaderToken(loginResponse?.data?.accessToken);
    } catch (error) {
      console.log('Login Fail With Error -->', error);
    }
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
