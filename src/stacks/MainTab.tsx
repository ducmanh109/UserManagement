import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from 'constant/route';
import Home from 'screens/Home/Home';
import ListUser from 'screens/ListUser/ListUser';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from 'theme/colors';
import ListNotiUserToday from 'screens/ListNotiUserToday/ListNotiUserToday';
import ListNotiUserCollectMoneyToday from 'screens/ListNotiUserCollectMoneyToday/ListNotiUserCollectMoneyToday';

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

function renderListNotiListIcon(_props: {
  focused: boolean;
  color: string;
  size: number;
}) {
  return (
    <FontAwesome
      name="wrench"
      size={30}
      color={_props.focused ? Colors.blue : Colors.black}
    />
  );
}

function renderListNotiUserCollectMoneyTodayIcon(_props: {
  focused: boolean;
  color: string;
  size: number;
}) {
  return (
    <FontAwesome
      name="money"
      size={30}
      color={_props.focused ? Colors.blue : Colors.black}
    />
  );
}

const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.LIST_USER}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={ROUTES.LIST_USER}
        component={ListUser}
        options={{
          tabBarIcon: renderListUserIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: renderHomeIcon,
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name={ROUTES.NOTI_DATE}
        component={ListNotiUserToday}
        options={{
          tabBarIcon: renderListNotiListIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={ROUTES.NOTI_MONEY_TODAY}
        component={ListNotiUserCollectMoneyToday}
        options={{
          tabBarIcon: renderListNotiUserCollectMoneyTodayIcon,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
