import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SETUP_API } from './src/api/api.config';
import RootStack from './src/stacks/RootStack';
import { observer } from 'mobx-react';
import FlashMessage from 'react-native-flash-message';
import database from '@react-native-firebase/database';
import firebaseConfig from './firebaseConfig';

if (!database().apps.length) {
  database().initializeApp(firebaseConfig);
}

const App = () => {
  useEffect(() => {
    SETUP_API.initAPIConfig();
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
      <FlashMessage />
    </NavigationContainer>
  );
};

export default observer(App);
