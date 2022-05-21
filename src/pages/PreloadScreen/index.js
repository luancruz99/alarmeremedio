import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';

import {
   SafeAreaView,
   ActivityIndicator,
} from 'react-native';

import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';
import api from '../../services/api';

import { style } from './style';

const PrealoadScreen = () => {
   const navigation = useNavigation();
   const [context, dispatch] = useStateValue();

   useEffect(() => {
      const checkLogin = async () => {
         let token = await api.getToken();
         if (token) {
            database()
               .ref('/bd/users')
               .orderByChild('token')
               .equalTo(token)
               .once('value')
               .then(snapshot => {
                  if (snapshot.val() == null) {
                     alert('Token invalido!');
                     dispatch({ type: 'setToken', payload: { token: '' } });
                     navigation.reset({
                        index: 1,
                        routes: [{ name: 'LoginScreen' }]
                     });
                  } else {
                     let userData = Object.values(snapshot.val())[0];
                     dispatch({ type: 'setUser', payload: { user: userData } });
                     navigation.reset({
                        index: 1,
                        routes: [{ name: 'MainTab' }]
                     });
                  }

               });
         } else {
            navigation.reset({
               index: 1,
               routes: [{ name: 'LoginScreen' }]
            });
         }
      }

      checkLogin();
      createChannels();

   }, []);

   const createChannels = () => {
      PushNotification.createChannel({
         channelId: 'main-channel',
         channelName: 'Main Channel'
      })
   }

   return (
      <SafeAreaView style={style.container}>
         <ActivityIndicator color="#dabe7b" size="large" />
      </SafeAreaView>
   );
};

export default PrealoadScreen;