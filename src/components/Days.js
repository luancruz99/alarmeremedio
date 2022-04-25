import React from 'react';
import {
   View,
   Text,
   StyleSheet
} from 'react-native';

const Days = () => {
   return (
      <View style={style.daysContainer}>
         <View style={style.daysView}>
            <Text style={style.daysText}>S</Text>
         </View>
         <View style={style.daysView}>
            <Text style={style.daysText}>T</Text>
         </View>
         <View style={style.daysView}>
            <Text style={style.daysText}>Q</Text>
         </View>
         <View style={style.daysView}>
            <Text style={style.daysText}>Q</Text>
         </View>
         <View style={style.daysView}>
            <Text style={style.daysText}>S</Text>
         </View>
         <View style={style.daysView}>
            <Text style={style.daysText}>S</Text>
         </View>
         <View style={style.daysView}>
            <Text style={style.daysText}>D</Text>
         </View>
      </View>

   );
}

const style = StyleSheet.create({
   daysContainer:{
      flexDirection: 'row',
      marginTop: 5,
   },   
   daysView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      width: 20,
      borderRadius: 10,
      backgroundColor: '#fff',
      marginHorizontal: 2,
   },
   daysText: {
      fontSize: 12,
      color: '#000',
   }
})

export default Days;