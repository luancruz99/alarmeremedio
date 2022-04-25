import React, { useState } from 'react';
import {
   TouchableOpacity,
   StyleSheet,
   Text,
   Switch,
} from 'react-native';

//components
import Days from './Days';


const ListAlarms = () =>{
   const [isEnabled, setIsEnabled]= useState(false);

   const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
   }

   return(
      <TouchableOpacity style={style.mainContainer}>
         <Text style={style.alarmText}>19:00</Text>
         <Text style={style.alarmLabel}>Remédio X</Text>
         <Days/>

         <Switch
            trackColor={{false:'#767577', true: '#81b0ff'}}
            thumbColor={'#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={style.switch}
         />
      </TouchableOpacity>
   );
}

const style = StyleSheet.create({
   mainContainer: {
      backgroundColor: '#c3c3c3',
      maxWidth: '87%',
      minWidth: '87%',
      height: 130,
      borderRadius: 20,
      paddingHorizontal: 25,
      paddingVertical: 10,
   },
   alarmText:{
      fontSize: 40,
      color: '#000',
   },
   alarmLabel:{
      fontSize: 18,
      color: '#000',
   },
   switch:{
      bottom: '52%',
      left: '85%',
      width: 40,
      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
   },

})

export default ListAlarms;