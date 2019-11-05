import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewPost from "../screens/newPost";
import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import Main from '../screens/Main';
import SignUp from '../screens/SignUp';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
    initialRouteName: LoadingScreen
});

const HomeStack = createStackNavigator(
  {
      LoadingScreen: LoadingScreen,
      LoginScreen: LoginScreen,
      Home: HomeScreen,
      NewPost: NewPost,
      Main: Main,
      SignUp: SignUp,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

export default HomeStack;
