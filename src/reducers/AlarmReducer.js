const initialState = {
   alarm: {},
}

export default (state = initialState, action = {}) => {
   switch (action.type) {
      case 'setAlarm':
         return { ...state, alarm: action.payload.alarm };
         break;

   }

   return state;
};