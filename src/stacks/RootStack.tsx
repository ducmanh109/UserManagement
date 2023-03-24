import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constant/route';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import { observer } from 'mobx-react';
import sessionStore from '../data/session/SessionStore';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      {sessionStore.session_status !== 'AUTHORIZED' ? (
        <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      ) : (
        <Stack.Screen name={ROUTES.HOME} component={Home} />
      )}
    </Stack.Navigator>
  );
};

export default observer(RootStack);
