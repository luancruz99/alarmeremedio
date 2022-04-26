import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
   mainContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#dfe3f1'
   },
   heading: {
      padding: 20,
      alignItems: 'center'
   },
   nextAlarmText: {
      fontSize: 18,
      fontFamily: 'Nunito-Regular',
      color: '#000',
   },
   nextAlarmTime: {
      fontSize: 50,
      fontFamily: 'Nunito-SemiBold',
      color: '#000',
   },
   nextAlarmLabel: {
      fontSize: 20,
      fontFamily: 'Nunito-SemiBold',
      color: '#000',
   },
   listAlarmsArea: {
      marginTop: 15,
   },
})

export { style };