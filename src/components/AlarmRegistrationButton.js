import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStateValue } from "../contexts/StateContext";

import {
   TouchableOpacity,
   StyleSheet,
   Modal,
   Pressable,
   View,
   Text,
} from 'react-native';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AlarmRegistrationButton = () => {
   const navigation = useNavigation();
   const [context, dispatch] = useStateValue();

   const [modalVisible, setModalVisible] = useState(false);


   const handleRegisterButton = () => {
      if (context.userData.user.type === 'user') {
         navigation.navigate('AlarmRegistration');
      }

      if (context.userData.user.type === 'doctor') {
         setModalVisible(!modalVisible);
      }
   };

   const handleFirstOption = () => {
      setModalVisible(!modalVisible);
      navigation.navigate('AlarmRegistration');
   }

   const handleSecondOption = () => {
      setModalVisible(!modalVisible);
      navigation.navigate('DrugRegistration');
   }

   return (
      <>
         <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               Alert.alert("Modal has been closed.");
               setModalVisible(!modalVisible);
            }}
         >
            <View style={style.centeredView}>
               <View style={style.modalView}>
                  <TouchableOpacity style={style.option} onPress={() => handleFirstOption()}>
                     <Text style={style.modalText}>Cadastrar Alarme</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={style.secondOption} onPress={() => handleSecondOption()}>
                     <Text style={style.modalText}>Cadastrar Remédio</Text>
                  </TouchableOpacity>

                  <Pressable
                     style={[style.button, style.buttonClose]}
                     onPress={() => setModalVisible(!modalVisible)}
                  >
                     <Text style={style.textStyle}>Voltar</Text>
                  </Pressable>
               </View>
            </View>
         </Modal>

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
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
   },
   button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
   },
   buttonClose: {
      backgroundColor: "#5b7cba",
   },
   textStyle: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center"
   },
   modalText: {
      marginBottom: 15,
      fontSize: 20,
      textAlign: "center",
      color: '#555'
   },
   option: {
      borderBottomWidth: 0.55
   },
   secondOption: {
      marginTop: 10,
   },

});

export default AlarmRegistrationButton;