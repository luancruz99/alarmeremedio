import React from 'react';

import {
   SafeAreaView,
   View,
   Text,
} from 'react-native';

import { style } from './style'; 

import AlarmList from '../../components/AlarmList';
import AlarmRegistrationButton from '../../components/AlarmRegistrationButton';

const HomeScreen = () => {
   
   return (
      <SafeAreaView style={style.mainContainer}>
         <View style={style.heading}>
            <Text style={style.nextAlarmText}>Próximo Alarme</Text>
            <Text style={style.nextAlarmTime}>19:00</Text>
            <Text style={style.nextAlarmLabel}>Remédio X</Text>
         </View>

         <View style={style.listAlarmsArea}>
            <AlarmList/>
         </View>

         <AlarmRegistrationButton/>
      </SafeAreaView>
   );
}

export default HomeScreen;