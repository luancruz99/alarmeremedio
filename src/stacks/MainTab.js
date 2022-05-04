import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AlarmStack from './AlarmStack';
import SettingsScreen from '../pages/SettingsScreen';
import UserScreen from '../pages/UserScreen';

import CustomMainTab from '../components/CustomMainTab';

const Tab = createBottomTabNavigator();

export default () => {
   return(
      <Tab.Navigator
         screenOptions={{headerShown: false}}
         tabBar={(props) => <CustomMainTab {...props}/>}         
         initialRouteName='AlarmStack'
         backBehavior='none'
      >
         <Tab.Screen name='UserScreen' component={UserScreen} options={{tabBarLabel: 'Usuário'}} />
         <Tab.Screen name='AlarmStack' component={AlarmStack} options={{tabBarLabel: 'Alarmes'}} />
         <Tab.Screen name='SettingsScreen' component={SettingsScreen} options={{tabBarLabel: 'Configurações'}} />
      </Tab.Navigator>
   );
};