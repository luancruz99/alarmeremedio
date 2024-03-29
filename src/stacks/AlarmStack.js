import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen';
import AlarmRegistration from '../pages/AlarmRegistration';
import DrugRegistration from '../pages/DrugRegistration';
import AlarmEdit from '../pages/AlarmEdit';

const Stack = createStackNavigator();

const AlarmStack = () => {
   return (
      <Stack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName='HomeScreen'
      >
         <Stack.Screen name='HomeScreen' component={HomeScreen} />
         <Stack.Screen name='AlarmRegistration' component={AlarmRegistration} />
         <Stack.Screen name='AlarmEdit' component={AlarmEdit} />
         <Stack.Screen name='DrugRegistration' component={DrugRegistration} />
      </Stack.Navigator>
   );
}

export default AlarmStack;