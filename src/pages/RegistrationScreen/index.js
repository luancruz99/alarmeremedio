import React, { useState, useRef } from 'react';

import {
   View,
   Text,
   TextInput,
   SafeAreaView,
   TouchableOpacity,
   ActivityIndicator,
} from 'react-native';

import { useStateValue } from '../../contexts/StateContext';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput, { Masks } from 'react-native-mask-input';
import SimpleToast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import * as yup from 'yup';

import { style } from './style';

const RegistrationScreen = () => {
   const navigation = useNavigation();
   const [context, dispatch] = useStateValue();

   const ref_birthdayInput = useRef();
   const ref_phoneNumberInput = useRef();
   const ref_cpfInput = useRef();
   const ref_emailInput = useRef();
   const ref_passwordInput = useRef();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [birthday, setBirthday] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [cpf, setCpf] = useState('');

   const [loading, setLoading] = useState(false)

   const handleRegisterButton = async () => {
      if (loading) {
         SimpleToast.show('Processando o cadastro!');
         return;
      }

      try {
         const schema = yup.object().shape({
            password: yup.string().required('Digite uma senha').min(8, 'A senha precisa ter no mínimo 8 caracteres!').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{8,}$/, 'A senha deve conter pelo menos uma letra e um número'),
            email: yup.string().email('Digite um email válido').required('Digite um email'),
            phoneNumber: yup.string().required('Digite um número de contato').min(15, 'Digite um número válido'),
            cpf: yup.string().required('Digite seu CPF').min(14, 'Digite um CPF válido'),
            birthday: yup.string().required('Digite sua data de nascimento').min(10, 'Digite uma data válida'),
            name: yup.string().required('Digite seu nome').min(8, 'Digite seu nome completo'),
         })

         await schema.validate({ name, birthday, cpf, phoneNumber, email, password })

         setLoading(true);

         let token = uuid.v4();

         let databaseRef = database().ref(`/bd/users/${token}`);

         await databaseRef.set({
            name,
            birthday,
            cpf,
            phoneNumber,
            email,
            password,
            token
         })

         setLoading(false);

         SimpleToast.show('Cadastro concluído!');
         navigation.goBack();

      } catch (error){
         if (error instanceof yup.ValidationError) {
            SimpleToast.show(error.message);
         } else {
            SimpleToast.show(error);
         }

         setLoading(false);
      }

   }

   return (
      <SafeAreaView style={style.container}>
         <KeyboardAwareScrollView>
            <View style={style.content}>
               <Text style={style.pageTitle}>Criar conta</Text>

               <TextInput
                  value={name}
                  placeholder='Digite seu nome'
                  onChangeText={(t) => setName(t)}
                  style={style.textInput}
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
                  style={style.textInput}
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
                  style={style.textInput}
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
                  style={style.textInput}
                  secureTextEntry={true}
                  ref={ref_passwordInput}
               />

               <TouchableOpacity style={style.registerButtonArea} onPress={() => handleRegisterButton()}>
                  <Text style={style.registerButtonText}>Cadastrar</Text>
               </TouchableOpacity>

            </View>
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
}

export default RegistrationScreen;