import React from 'react';
import { StateProvider } from './contexts/StateContext';
import { NavigationContainer } from '@react-navigation/native';

import MainTab from './stacks/MainTab';

const App = () => {
  return (
    <StateProvider>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;