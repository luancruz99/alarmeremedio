import React, { useState, useEffect, useRef } from 'react';


import {
   SafeAreaView,
   TouchableOpacity,
   View,
   Text,
   TextInput,
   ScrollView,
   ActivityIndicator,
   Image,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';

import database from '@react-native-firebase/database';

import MaskInput, { Masks } from 'react-native-mask-input';
import SimpleToast from 'react-native-simple-toast';
import api from '../../services/api';

import { style } from './style';



const UserScreen = () => {
   const navigation = useNavigation();
   const [context, dispatch] = useStateValue();

   const ref_birthdayInput = useRef();
   const ref_phoneNumberInput = useRef();
   const ref_cpfInput = useRef();
   const ref_emailInput = useRef();
   const ref_passwordInput = useRef();

   const [name, setName] = useState(context.userData.user.name);
   const [email, setEmail] = useState(context.userData.user.email);
   const [password, setPassword] = useState(context.userData.user.password);
   const [birthday, setBirthday] = useState(context.userData.user.birthday);
   const [phoneNumber, setPhoneNumber] = useState(context.userData.user.phoneNumber);
   const [cpf, setCpf] = useState(context.userData.user.cpf);


   const [loading, setLoading] = useState(false);

   const handleSaveButton = async () => {
      if (loading) {
         SimpleToast.show('Salvando perfil...');
         return;
      }

      setLoading(true);

      let databaseRef = database().ref(`/bd/users/${context.userData.user.token}`);

      await databaseRef.update({
         name,
         birthday,
         cpf,
         phoneNumber,
         email,
         password,
      })

      setLoading(false);
      SimpleToast.show('Perfil atualizado!');
   };

   const handleExitButton = async () => {
      await api.logout();
      dispatch({ type: 'removeUser' })
      navigation.reset({
         index: 1,
         routes: [{ name: 'LoginScreen' }],
      });
   };

   return (
      <SafeAreaView style={style.mainContainer}>

         {loading && <ActivityIndicator style={style.loadingIndicator} color="#5b7cba" size="large" />}

         <Text style={style.registrationText}>Editar Perfil</Text>

         <ScrollView style={style.registrationArea}>
            <View style={style.alignItens}>

               <TouchableOpacity style={style.imagePickerButton}>
                  <Image
                     style={style.imagePicker}
                     source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }}
                  />
               </TouchableOpacity>

               <TextInput
                  value={name}
                  placeholder='Digite seu nome'
                  onChangeText={(t) => setName(t)}
                  style={style.registrationInput}
                  returnKeyType={'next'}
                  onSubmitEditing={() => ref_birthdayInput.current.focus()}
                  blurOnSubmit={false}
               />

               <View style={style.halfTextInputArea}>
                  <MaskInput
                     value={birthday}
                     onChangeText={setBirthday}
                     mask={Masks.DATE_DDMMYYYY}
                     placeholder='Data de nascimento'
                     style={style.halfTextInput}
                     keyboardType='numeric'
                     ref={ref_birthdayInput}
                     returnKeyType={'next'}
                     onSubmitEditing={() => ref_cpfInput.current.focus()}
                     blurOnSubmit={false}
                  />

                  <MaskInput
                     value={cpf}
                     onChangeText={setCpf}
                     mask={Masks.BRL_CPF}
                     placeholder='CPF'
                     style={style.halfTextInput}
                     keyboardType='numeric'
                     ref={ref_cpfInput}
                     returnKeyType={'next'}
                     onSubmitEditing={() => ref_phoneNumberInput.current.focus()}
                     blurOnSubmit={false}
                  />
               </View>


               <MaskInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  mask={Masks.BRL_PHONE}
                  placeholder='Contato'
                  style={style.registrationInput}
                  keyboardType='numeric'
                  ref={ref_phoneNumberInput}
                  returnKeyType={'next'}
                  onSubmitEditing={() => ref_emailInput.current.focus()}
                  blurOnSubmit={false}
               />

               <TextInput
                  placeholder='Digite seu email'
                  value={email}
                  onChangeText={(t) => setEmail(t)}
                  style={style.registrationInput}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  ref={ref_emailInput}
                  returnKeyType={'next'}
                  onSubmitEditing={() => ref_passwordInput.current.focus()}
                  blurOnSubmit={false}
               />

               <TextInput
                  placeholder='Senha'
                  value={password}
                  onChangeText={(t) => setPassword(t)}
                  style={style.registrationInput}
                  secureTextEntry={true}
                  ref={ref_passwordInput}
               />

            </View>
         </ScrollView>

         <TouchableOpacity style={style.registrationButton} onPress={() => handleSaveButton()}>
            <Text style={style.registrationButtonText}>Salvar</Text>
         </TouchableOpacity>

         <TouchableOpacity style={style.exitButton} onPress={() => handleExitButton()}>
            <Text style={style.registrationButtonText}>Sair</Text>
         </TouchableOpacity>


      </SafeAreaView>
   );
}

export default UserScreen;
