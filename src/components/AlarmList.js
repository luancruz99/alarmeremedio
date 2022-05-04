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
import database from '@react-native-firebase/database';

//components
import Days from './Days';

const AlarmList = () => {
   const [isEnabled, setIsEnabled] = useState(false);
   const [alarms, setAlarms] = useState([]);

   const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
   }

   useEffect(() => {
      database()
         .ref('/bd/alarms')
         .on('value', (snapshot) => {
            let object = [];
            snapshot.forEach((childItem) => {
               object.push(childItem.val());
            });

            if (object) {
               object.length > 1 && object.sort((a, b) => (a.time > b.time) ? 1 : (b.time > a.time) ? -1 : 0)
               setAlarms(object);
            }
         });




   }, [])

   return (


      <FlatList
         data={alarms}
         style={{maxHeight: '86%', marginBottom: 20,}}
         renderItem={({ item }) => {
            return (
               <View>
                  <TouchableOpacity style={style.mainContainer}>
                     <View style={style.rowDirection}>
                        <Text style={style.alarmText}>{item.time}</Text>
                        <Image style={style.networkImage} source={require('../assets/images/users.png')} />
                     </View>
                     <Text style={style.alarmLabel}>{item.title}</Text>
                     <Days />

                     <Switch
                        trackColor={{ false: '#c0c0c0', true: '#81b0ff' }}
                        thumbColor={'#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
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
   }

})

export default AlarmList;