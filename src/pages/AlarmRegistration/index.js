import React, { useState } from 'react';
import {
   SafeAreaView,
   TouchableOpacity,
   View,
   Text,
   TextInput,
   ScrollView,
   ActivityIndicator,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import database from '@react-native-firebase/database';

import { Picker } from '@react-native-picker/picker';
import SimpleToast from 'react-native-simple-toast';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import moment from 'moment';
import 'moment/locale/pt-br';

import { style } from './style';

const AlarmRegistration = () => {
   const navigation = useNavigation();

   const [date, setDate] = useState(new Date());
   const [title, setTitle] = useState('');
   const [doctor, setDoctor] = useState('');
   const [description, setDescription] = useState('');
   const [drug, setDrug] = useState('');
   const [monday, setMonday] = useState(false);
   const [tuesday, setTuesday] = useState(false);
   const [wednesday, setWednesday] = useState(false);
   const [thursday, setThursday] = useState(false);
   const [friday, setFriday] = useState(false);
   const [saturday, setSaturday] = useState(false);
   const [sunday, setSunday] = useState(false);
   
   const [loading, setLoading] = useState(false);

   const handleRegistrationButton = async () => {
      if (loading){
         SimpleToast.show('Cadastro em andamento!');
         return;
      }

      setLoading(true);

      let token = uuid.v4();
      let databaseRef = database().ref(`/bd/alarms/${token}`);
      let time = moment(date).format('LT');

      await databaseRef.set({
         time,
         title,
         doctor,
         description,
         drug,
         monday,
         tuesday,
         wednesday,
         thursday,
         friday,
         saturday,
         sunday,
      }) 
      
      setLoading(false);
      navigation.goBack();
   };

   return (
      <SafeAreaView style={style.mainContainer}>
         <Text style={style.registrationText}>Cadastrar Alarme</Text>

         <ScrollView style={style.registrationArea}>
            <View style={style.alignItens}>
               <View style={style.pickerArea}>
                  <DatePicker
                     date={date}
                     onDateChange={setDate}
                     mode='time'

                  />
               </View>


               <View style={style.daysContainer}>
                  <TouchableOpacity style={monday ? style.selectedDaysView : style.daysView} onPress={() => setMonday(!monday)}>
                     <Text style={monday ? style.selectedDaysText : style.daysText}>S</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={tuesday ? style.selectedDaysView : style.daysView} onPress={() => setTuesday(!tuesday)}>
                     <Text style={tuesday ? style.selectedDaysText : style.daysText}>T</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={wednesday ? style.selectedDaysView : style.daysView} onPress={() => setWednesday(!wednesday)}>
                     <Text style={wednesday ? style.selectedDaysText : style.daysText}>Q</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={thursday ? style.selectedDaysView : style.daysView} onPress={() => setThursday(!thursday)}>
                     <Text style={thursday ? style.selectedDaysText : style.daysText}>Q</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={friday ? style.selectedDaysView : style.daysView} onPress={() => setFriday(!friday)}>
                     <Text style={friday ? style.selectedDaysText : style.daysText}>S</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={saturday ? style.selectedDaysView : style.daysView} onPress={() => setSaturday(!saturday)}>
                     <Text style={saturday ? style.selectedDaysText : style.daysText}>S</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={sunday ? style.selectedDaysView : style.daysView} onPress={() => setSunday(!sunday)}>
                     <Text style={sunday ? style.selectedDaysText : style.daysText}>D</Text>
                  </TouchableOpacity>
               </View>


               <TextInput
                  style={style.registrationInput}
                  value={title}
                  onChangeText={(t) => setTitle(t)}
                  placeholder='Título'
               />
               <TextInput
                  style={style.registrationInput}
                  value={doctor}
                  onChangeText={(t) => setDoctor(t)}
                  placeholder='Médico Responsável'
               />
               <View style={style.pickerView}>
                  <Picker
                     selectedValue={drug}
                     onValueChange={(t) => setDrug(t)}
                     style={style.registrationPicker}
                  >
                     <Picker.Item label='Medicamento' value='' enabled={false} style={style.pickerItem} />
                     <Picker.Item label='Remédio 1' value='1' style={style.enabledPickerItem} />
                     <Picker.Item label='Remédio 2' value='2' style={style.enabledPickerItem} />
                  </Picker>
               </View>
               <TextInput
                  style={style.descriptionInput}
                  value={description}
                  onChangeText={(t) => setDescription(t)}
                  placeholder='Observações'
                  multiline={true}
               />
            </View>
         </ScrollView>

         <TouchableOpacity style={style.registrationButton} onPress={()=>handleRegistrationButton()}>
            <Text style={style.registrationButtonText}>Cadastrar</Text>
         </TouchableOpacity>
      </SafeAreaView>
   );
};

export default AlarmRegistration;