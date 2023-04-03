import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constant/route';
import Home from '../screens/Home/Home';
import { observer } from 'mobx-react';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
    </Stack.Navigator>
  );
};

export default observer(RootStack);
