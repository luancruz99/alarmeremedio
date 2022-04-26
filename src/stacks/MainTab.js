import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../pages/HomeScreen';
import SettingsScreen from '../pages/SettingsScreen';
import UserScreen from '../pages/UserScreen';

import CustomMainTab from '../components/CustomMainTab';

const Tab = createBottomTabNavigator();

export default () => {
   return(
      <Tab.Navigator
         screenOptions={{headerShown: false}}
         tabBar={(props) => <CustomMainTab {...props}/>}         
         initialRouteName='HomeScreen'
         backBehavior='none'
      >
         <Tab.Screen name='UserScreen' component={UserScreen} options={{tabBarLabel: 'Usuário'}} />
         <Tab.Screen name='HomeScreen' component={HomeScreen} options={{tabBarLabel: 'Alarmes'}} />
         <Tab.Screen name='SettingsScreen' component={SettingsScreen} options={{tabBarLabel: 'Configurações'}} />
      </Tab.Navigator>
   );
};