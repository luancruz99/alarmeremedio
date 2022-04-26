import React, { useState } from 'react';
import {
   TouchableOpacity,
   StyleSheet,
   Text,
   Switch,
   View,
   Image
} from 'react-native';

//components
import Days from './Days';


const ListAlarms = () => {
   const [isEnabled, setIsEnabled] = useState(false);

   const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
   }

   return (
      <TouchableOpacity style={style.mainContainer}>
         <View style={style.rowDirection}>
            <Text style={style.alarmText}>19:00</Text>
            <Image style={style.networkImage} source={require('../assets/images/users.png')} />
         </View>
         <Text style={style.alarmLabel}>Remédio X</Text>
         <Days />

         <Switch
            trackColor={{ false: '#c0c0c0', true: '#81b0ff' }}
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
      backgroundColor: '#5b7cba',
      maxWidth: '87%',
      minWidth: '87%',
      height: 130,
      borderRadius: 20,
      paddingHorizontal: 25,
      paddingVertical: 10,
   },
   alarmText: {
      fontSize: 40,
      fontFamily: 'Nunito-SemiBold',
      color: '#000',
   },
   alarmLabel: {
      fontSize: 18,
      fontFamily: 'Nunito-SemiBold',
      color: '#000',
   },
   switch: {
      bottom: '52%',
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

export default ListAlarms;