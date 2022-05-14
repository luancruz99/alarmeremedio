import React from 'react';
import { StateProvider } from './contexts/StateContext';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './stacks/AuthStack';

const App = () => {
  return (
    <StateProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;