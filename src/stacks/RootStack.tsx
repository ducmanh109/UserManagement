import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constant/route';
import { observer } from 'mobx-react';
import MainTab from './MainTab';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={ROUTES.MAIN_TAB}
        component={MainTab}
      />
    </Stack.Navigator>
  );
};

export default observer(RootStack);
