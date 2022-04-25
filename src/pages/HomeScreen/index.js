import React from 'react';

import {
   SafeAreaView,
   View,
   Text,
} from 'react-native';

import { style } from './style'; 

import ListAlarms from '../../components/ListAlarms';
import TimePicker from '../../components/TimePicker';

const HomeScreen = () => {
   
   return (
      <SafeAreaView style={style.mainContainer}>
         <View style={style.heading}>
            <Text style={style.nextAlarmText}>Próximo Alarme</Text>
            <Text style={style.nextAlarmTime}>19:00</Text>
            <Text style={style.nextAlarmLabel}>Remédio X</Text>
         </View>

         <View style={style.listAlarmsArea}>
            <ListAlarms/>
         </View>

         <TimePicker/>
      </SafeAreaView>
   );
}

export default HomeScreen;