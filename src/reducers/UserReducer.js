import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
   user: {},
}

export default (state = initialState, action = {}) => {
   switch (action.type) {
      case 'setUser':
         AsyncStorage.setItem('token', action.payload.user.token);
         return { ...state, user: action.payload.user };
         break;
      case 'removeUser':
         return {...state, user: {}};
         break;
   }

   return state;
};