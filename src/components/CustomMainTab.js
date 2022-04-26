import React, { useState, useEffect } from "react";
import { useStateValue } from '../contexts/StateContext';

import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   Keyboard
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';


const CustomMainTab = ({ state, descriptors, navigation }) => {
   const [keyboardOpen, setKeyboardOpen] = useState(undefined);

   useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => { setKeyboardOpen(true); });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => { setKeyboardOpen(false); });

      return () => {
         showSubscription.remove();
         hideSubscription.remove();
      };

   }, []);

   return (
      <View style={styles.container}>
         {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            let label = route.name;
            if (options.tabBarLabel != undefined) {
               label = options.tabBarLabel;
            } else if (options.title != undefined) {
               label = options.title;
            }

            const isFocused = state.index === index;

            const handleTabPress = () => {
               navigation.navigate(route.name)
            }

            let iconName = null;

            switch (route.name) {
               case 'HomeScreen':
                  iconName = faClock;
                  break;
               case 'UserScreen':
                  iconName = faUser;
                  break;
               case 'SettingsScreen':
                  iconName = faGear;
                  break;
            }


            if (keyboardOpen) {
               return (null);

            } else {
               return (
                  <TouchableOpacity key={index} activeOpacity={1} underlayColor='transparent' style={styles.tab} onPress={handleTabPress}>
                     <FontAwesomeIcon icon={iconName} size={isFocused ? 43 : 38} color={isFocused ? '#5b7cba' : '#dfe3f1'} />
                     <Text style={isFocused ? styles.labelFocused : styles.label}>{label}</Text>
                  </TouchableOpacity>
               );
            };
         })}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      backgroundColor: '#fff',

   },
   tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      borderTopWidth: 0.2,
      borderColor: '#cccccc90'

   },
   label: {
      fontSize: 13,
      color: '#dfe3f1'
   },
   labelFocused: {
      fontSize: 13,
      color: '#5b7cba'
   },
   icon: {
      width: 40,
      height: 40,

   },
   homeTab: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
      width: 80,
      marginTop: -12,
      borderRadius: 50,
      backgroundColor: '#dabe7b'
   },
   homeLabel: {
      fontSize: 13,
      color: '#fff'
   },
});

export default CustomMainTab;