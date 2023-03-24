import { useCallback, useState } from 'react';
import sessionStore from '../../data/session/SessionStore';
import { LOGIN_REQUEST_TYPE } from '../../api/session/session.type';

const useLogicLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((text: string) => {
    if (!text) {
      return;
    }

    setPhone(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    if (!text) {
      return;
    }

    setPassword(text);
  }, []);

  const onLogin = useCallback(async () => {
    const loginRequest: LOGIN_REQUEST_TYPE = {
      phone,
      password,
    };

    sessionStore.onLogin(loginRequest);
  }, [password, phone]);

  return {
    onChangeEmail,
    onChangePassword,
    onLogin,
  };
};

export default useLogicLogin;
