import React, { createContext, useContext, useReducer } from 'react';

import UserReducer from '../reducers/UserReducer';
import AlarmReducer from '../reducers/AlarmReducer';

const initialState = {
   userData: UserReducer(),
   alarmData: AlarmReducer(),
};

const MainReducer = (state, action) => ({
   userData: UserReducer(state.userData, action),
   alarmData: AlarmReducer(state.alarmData, action),
});

export const StateContext = createContext(initialState);

export const StateProvider = ({ children }) => {
   const [state, dispatch] = useReducer(MainReducer, initialState);
   
   return(
      <StateContext.Provider value={[state, dispatch]}>
         {children}
      </StateContext.Provider>
   );
};

export const useStateValue = () => useContext(StateContext);