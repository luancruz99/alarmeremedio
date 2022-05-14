import React, { useState, useRef } from 'react';

import {
   View,
   Text,
   TextInput,
   SafeAreaView,
   TouchableOpacity,
} from 'react-native';

import { useStateValue } from '../../contexts/StateContext';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';

import { style } from './style';

const LoginScreen = () => {
   const navigation = useNavigation();
   const [context, dispatch] = useStateValue();

   const ref_passwordInput = useRef();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleRegisterButton = () => {
      navigation.navigate('RegistrationScreen');
   }

   const handleLoginButton = async () => {
      if (email && password){
         database()
         .ref('/bd/users')
         .orderByChild('email')
         .equalTo(email)
         .once('value')
         .then(snapshot => {
            if (snapshot.val() == null){
               SimpleToast.show('Email inválido!');
               return;
            }
            if (Object.values(snapshot.val())[0].password != password) {
               SimpleToast.show('Senha incorreta!');
               return;
            }

            let userData = Object.values(snapshot.val())[0];

            dispatch({type: 'setUser', payload: {user:userData}});
            SimpleToast.show('Login feito com sucesso!');

            navigation.reset({
               index: 1,
               routes: [{ name: 'MainTab'}]
            });
         });
      } else {
         SimpleToast.show("Preencha todos os campos!");
      }
   }

   return (
      <SafeAreaView style={style.container}>
         <KeyboardAwareScrollView>
            <View style={style.content}>
               <Text style={style.appName}>Alarme Remédio</Text>
               <TextInput
                  placeholder='Digite seu email'
                  value={email}
                  onChangeText={(t) => setEmail(t)}
                  style={style.textInput}
                  autoCapitalize='none'
                  keyboardType='email-address'
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

               <View style={style.registrationTextArea}>
                  <Text>Não possui uma conta?</Text>
                  <TouchableOpacity onPress={handleRegisterButton}>
                     <Text style={style.registrationButtonText}> Cadastre-se</Text>
                  </TouchableOpacity>
               </View>

               <TouchableOpacity style={style.loginButtonArea} onPress={handleLoginButton}>
                  <Text style={style.loginButtonText}>Entrar</Text>
               </TouchableOpacity>

            </View>
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
}

export default LoginScreen;