import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constant/route';
import { observer } from 'mobx-react';
import MainTab from './MainTab';
import UserDetail from 'screens/UserDetail/UserDetail';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.MAIN_TAB} component={MainTab} />
      <Stack.Screen name={ROUTES.USER_DETAIL} component={UserDetail} />
    </Stack.Navigator>
  );
};

export default observer(RootStack);
