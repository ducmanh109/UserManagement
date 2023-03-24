import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SETUP_API } from './src/api/api.config';
import RootStack from './src/stacks/RootStack';
import { observer } from 'mobx-react';

const App = () => {
  useEffect(() => {
    SETUP_API.initAPIConfig();
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default observer(App);
