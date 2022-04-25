import React, { useState } from "react";

import {
   TouchableOpacity,
   Alert,
   StyleSheet,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TimePicker = () => {
   const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
   const [date, setDate] = useState(new Date());

   const showDateTimePicker = () => {
      setIsDateTimePickerVisible(true);
   };

   const hideDateTimePicker = () => {
      setIsDateTimePickerVisible(false);
   };

   const handleDatePicker = (event, selectedDate) => {
      const currentTime = Date.now();
      const selected = selectedDate;
      if (selected < currentTime) {
         Alert.alert('Please choose future time');
         hideDateTimePicker();
         return false;
      }
      setDate(selected);
      hideDateTimePicker();
   }

   return (
      <>
         <TouchableOpacity style={style.newAlarm} onPress={() => showDateTimePicker()}>
            <FontAwesomeIcon icon={faPlus} size={35}/>
         </TouchableOpacity>

         {isDateTimePickerVisible && (
            <DateTimePicker
               value={date}
               mode="datetime"
               is24Hour={true}
               onChange={handleDatePicker}
            />
         )}

      </>
   );
};

const style = StyleSheet.create({
   newAlarm: {
      position: "absolute",
      bottom: '12%',
      right: '5%',
      backgroundColor: '#c3c3c3',
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