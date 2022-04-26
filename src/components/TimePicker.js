import React, { useState } from "react";

import {
   TouchableOpacity,
   StyleSheet,
   Text
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TimePicker = () => {
   const [time, setTime] = useState(new Date());
   const [show, setShow] = useState(false);

   const showDateTimePicker = () => {
      setShow(true);
   };
   
   const handleTimePicker = (event, selectedDate) => {
      setShow(false);
      setTime(selectedDate);
   }

   return (
      <>
         <TouchableOpacity style={style.newAlarm} onPress={()=>showDateTimePicker()}>
            <FontAwesomeIcon icon={faPlus} size={35} color={'#5b7cba'}/>
         </TouchableOpacity>

         <Text>{moment(time).format('hh:mm')}</Text>
         {show && (
            <DateTimePicker
               value={time}
               mode="time"
               is24Hour={true}
               onChange={handleTimePicker}
            />
         )}

      </>
   );
};

const style = StyleSheet.create({
   newAlarm: {
      position: "absolute",
      bottom: '5%',
      right: '7%',
      backgroundColor: '#fff',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',

   },
   newAlarmText: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#000',
   }
});

export default TimePicker;