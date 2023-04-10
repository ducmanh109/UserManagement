import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from 'constant/route';
import Home from 'screens/Home/Home';
import ListUser from 'screens/ListUser/ListUser';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from 'theme/colors';

const Tab = createBottomTabNavigator();

function renderHomeIcon(_props: {
  focused: boolean;
  color: string;
  size: number;
}) {
  return (
    <FontAwesome
      name="home"
      size={30}
      color={_props.focused ? Colors.blue : Colors.black}
    />
  );
}

function renderListUserIcon(_props: {
  focused: boolean;
  color: string;
  size: number;
}) {
  return (
    <FontAwesome
      name="user"
      size={30}
      color={_props.focused ? Colors.blue : Colors.black}
    />
  );
}

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: renderHomeIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={ROUTES.LIST_USER}
        component={ListUser}
        options={{
          tabBarIcon: renderListUserIcon,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
