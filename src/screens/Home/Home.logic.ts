import { useCallback, useState } from 'react';
import axios from 'axios';
import { GET_NEWS_ENDPOINT } from 'api/endpoint/news.endpoint';
import sessionStore from 'data/session/SessionStore';

const useLogicHome = () => {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(GET_NEWS_ENDPOINT);

      if (!response) {
        return;
      }

      setData(response.data);
    } catch (error) {
      console.log('error>>>>>', error);
    }
  }, []);

  const onLogout = useCallback(async () => {
    try {
      await sessionStore.onLogout();
    } catch (error) {
      console.log('Logout Fail With Error', error);
    }
  }, []);

  return {
    data,
    getData,
    onLogout,
  };
};

export default useLogicHome;
