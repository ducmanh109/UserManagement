import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from 'constant/route';
import Home from 'screens/Home/Home';
import ListUser from 'screens/ListUser/ListUser';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={ROUTES.HOME} component={Home} />
      <Tab.Screen name={ROUTES.LIST_USER} component={ListUser} />
    </Tab.Navigator>
  );
};

export default MainTab;
