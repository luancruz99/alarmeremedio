import React, { useState, useEffect } from 'react';
import {
   TouchableOpacity,
   StyleSheet,
   Text,
   Switch,
   View,
   Image,
   FlatList,
} from 'react-native';

import PushNotification, { Importance } from 'react-native-push-notification';
import { useStateValue } from '../contexts/StateContext';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import moment from 'moment';



const AlarmList = () => {
   const navigation = useNavigation();
   const [context, dispatch] = useStateValue();

   const [alarms, setAlarms] = useState([]);

   const toggleSwitch = async (t, item) => {
      let databaseRef = database().ref(`/bd/alarms/${item.token}`);

      await databaseRef.update({
         status: t,
      })

   }

   const handleAlarm = (item) => {

      dispatch({ type: 'setAlarm', payload: { alarm: item } });
      navigation.navigate('AlarmEdit');

   }



   useEffect(() => {
      database()
         .ref('/bd/alarms')
         .on('value', (snapshot) => {
            let object = [];
            snapshot.forEach((childItem) => {
               object.push(childItem.val());
            });

            let myAlarms = []

            for (let i = 0; i < object.length; i++) {
               if (object[i].owner == context.userData.user.token || object[i].shared == context.userData.user.token) {
                  myAlarms.push(object[i]);
               }
            }
            if (myAlarms) {
               myAlarms.length > 1 && myAlarms.sort((a, b) => (a.time > b.time) ? 1 : (b.time > a.time) ? -1 : 0)
               setAlarms(myAlarms);
            }
         });



   }, [])



   return (


      <FlatList
         data={alarms}
         style={{ maxHeight: '86%', marginBottom: 20, }}
         renderItem={({ item }) => {
            return (
               <View>
                  <TouchableOpacity style={style.mainContainer} onPress={() => handleAlarm(item)}>
                     <View style={style.rowDirection}>
                        <Text style={style.alarmText}> {item.time}</Text>
                        {item.shared !== '' && <Image style={style.networkImage} source={require('../assets/images/users.png')} />}
                     </View>
                     <Text style={style.alarmLabel}>{item.title}</Text>

                     <View style={style.daysContainer}>
                        <View style={item.days.monday.enabled ? style.selectedDaysView : style.daysView}>
                           <Text style={item.days.monday.enabled ? style.selectedDaysText : style.daysText}>S</Text>
                        </View>
                        <View style={item.days.tuesday.enabled ? style.selectedDaysView : style.daysView}>
                           <Text style={item.days.tuesday.enabled ? style.selectedDaysText : style.daysText}>T</Text>
                        </View>
                        <View style={item.days.wednesday.enabled ? style.selectedDaysView : style.daysView}>
                           <Text style={item.days.wednesday.enabled ? style.selectedDaysText : style.daysText}>Q</Text>
                        </View>
                        <View style={item.days.thursday.enabled ? style.selectedDaysView : style.daysView}>
                           <Text style={item.days.thursday.enabled ? style.selectedDaysText : style.daysText}>Q</Text>
                        </View>
                        <View style={item.days.friday.enabled ? style.selectedDaysView : style.daysView}>
                           <Text style={item.days.friday.enabled ? style.selectedDaysText : style.daysText}>S</Text>
                        </View>
                        <View style={item.days.saturday.enabled ? style.selectedDaysView : style.daysView}>
                           <Text style={item.days.saturday.enabled ? style.selectedDaysText : style.daysText}>S</Text>
                        </View>
                        <View style={item.days.sunday.enabled ? style.selectedDaysView : style.daysView}>
                           <Text style={item.days.sunday.enabled ? style.selectedDaysText : style.daysText}>D</Text>
                        </View>
                     </View>

                     <Switch
                        trackColor={{ false: '#c0c0c0', true: '#81b0ff' }}
                        thumbColor={'#f4f3f4'}
                        onValueChange={(t) => toggleSwitch(t, item)}
                        value={item.status}
                        style={style.switch}
                     />
                  </TouchableOpacity>
               </View>
            );
         }}
      />


   );
}

const style = StyleSheet.create({
   mainContainer: {
      backgroundColor: '#5b7cba',
      maxWidth: '92%',
      minWidth: '92%',
      height: 140,
      borderRadius: 20,
      paddingHorizontal: 25,
      paddingVertical: 10,
      marginBottom: 10,
      alignSelf: 'center'
   },
   alarmText: {
      fontSize: 40,
      fontWeight: '500',
      color: '#000',
   },
   alarmLabel: {
      fontSize: 18,
      fontWeight: '500',
      color: '#000',
   },
   switch: {
      bottom: '46%',
      left: '85%',
      width: 40,
      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
   },
   rowDirection: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   networkImage: {
      marginLeft: 10,
      width: 28,
      height: 28,
   },
   daysContainer: {
      flexDirection: 'row',
      marginTop: 5,
   },
   daysView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      width: 20,
      borderRadius: 10,
      backgroundColor: '#e3e3e3',
      marginHorizontal: 2,
   },
   daysText: {
      fontSize: 12,
      color: '#000',
   },
   selectedDaysView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      width: 20,
      borderRadius: 10,
      backgroundColor: '#000',
      marginHorizontal: 2,
   },
   selectedDaysText: {
      fontSize: 12,
      color: '#fff',
   },


})

export default AlarmList;