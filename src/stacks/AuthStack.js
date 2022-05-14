import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PrealoadScreen from '../pages/PreloadScreen';
import LoginScreen from '../pages/LoginScreen';
import RegistrationScreen from '../pages/RegistrationScreen'
import MainTab from './MainTab';

const Stack = createStackNavigator();

const AuthStack = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="PreloadScreen" component={PrealoadScreen}/>
         <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
         <Stack.Screen name="LoginScreen" component={LoginScreen}/>
         <Stack.Screen name="MainTab" component={MainTab}/>
      </Stack.Navigator>
   );
};

export default AuthStack;