import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
   TouchableOpacity,
   StyleSheet,
} from 'react-native';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AlarmRegistrationButton = () => {
   const navigation = useNavigation();


   const handleRegisterButton = () => {
      navigation.navigate('AlarmRegistration');
   };

   return (
      <>
         <TouchableOpacity style={style.newAlarm} onPress={() => handleRegisterButton()}>
            <FontAwesomeIcon icon={faPlus} size={35} color={'#5b7cba'} />
         </TouchableOpacity>
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
});

export default AlarmRegistrationButton;