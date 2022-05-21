import React, { useState, useEffect } from 'react';
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
import { useStateValue } from '../../contexts/StateContext';

import database from '@react-native-firebase/database';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Picker } from '@react-native-picker/picker';
import SimpleToast from 'react-native-simple-toast';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import 'moment/locale/pt-br';

import { style } from './style';

const AlarmEdit = () => {
   const navigation = useNavigation();
   const [context, dispatch] = useStateValue();


   const [date, setDate] = useState(moment(context.alarmData.alarm.formatedDate).toDate());
   const [title, setTitle] = useState('');
   const [doctor, setDoctor] = useState('');
   const [description, setDescription] = useState('');
   const [drug, setDrug] = useState('');
   const [monday, setMonday] = useState({ nextDate: '', enabled: false });
   const [tuesday, setTuesday] = useState({ nextDate: '', enabled: false });
   const [wednesday, setWednesday] = useState({ nextDate: '', enabled: false });
   const [thursday, setThursday] = useState({ nextDate: '', enabled: false });
   const [friday, setFriday] = useState({ nextDate: '', enabled: false });
   const [saturday, setSaturday] = useState({ nextDate: '', enabled: false });
   const [sunday, setSunday] = useState({ nextDate: '', enabled: false });

   const [loading, setLoading] = useState(false);

   useEffect(() => {

      setTitle(context.alarmData.alarm.title);
      setDoctor(context.alarmData.alarm.doctor);
      setDescription(context.alarmData.alarm.description);
      setDrug(context.alarmData.alarm.drug);
      setMonday(context.alarmData.alarm.days.monday);
      setTuesday(context.alarmData.alarm.days.tuesday);
      setWednesday(context.alarmData.alarm.days.wednesday);
      setThursday(context.alarmData.alarm.days.thursday);
      setFriday(context.alarmData.alarm.days.friday);
      setSaturday(context.alarmData.alarm.days.saturday);
      setSunday(context.alarmData.alarm.days.sunday);

      for (let i = 0; i <= 6; i++) {
         let today = new Date();
         today.setDate(today.getDate() + i)

         switch (today.getDay()) {
            case 0:
               setSunday({ ...sunday, nextDate: moment(`${moment(today).format('YYYY-MM-DD')}T${moment(date).format('LT')}:00-03:00`).format() });
               break;
            case 1:
               setMonday({ ...monday, nextDate: moment(`${moment(today).format('YYYY-MM-DD')}T${moment(date).format('LT')}:00-03:00`).format() });
               break;
            case 2:
               setTuesday({ ...tuesday, nextDate: moment(`${moment(today).format('YYYY-MM-DD')}T${moment(date).format('LT')}:00-03:00`).format() });
               break;
            case 3:
               setWednesday({ ...wednesday, nextDate: moment(`${moment(today).format('YYYY-MM-DD')}T${moment(date).format('LT')}:00-03:00`).format() });
               break;
            case 4:
               setThursday({ ...thursday, nextDate: moment(`${moment(today).format('YYYY-MM-DD')}T${moment(date).format('LT')}:00-03:00`).format() });
               break;
            case 5:
               setFriday({ ...friday, nextDate: moment(`${moment(today).format('YYYY-MM-DD')}T${moment(date).format('LT')}:00-03:00`).format() });
               break;
            case 6:
               setSaturday({ ...saturday, nextDate: moment(`${moment(today).format('YYYY-MM-DD')}T${moment(date).format('LT')}:00-03:00`).format() });
               break;
         }
      }
   }, [date]);

   const handleTrashIcon = async () => {
      let databaseRef = database().ref(`/bd/alarms/${context.alarmData.alarm.token}`);

      await databaseRef.remove();
      navigation.goBack();
   }

   const handleSaveButton = async () => {
      if (loading) {
         SimpleToast.show('Realizando alterações...');
         return;
      }

      setLoading(true);

      let databaseRef = database().ref(`/bd/alarms/${context.alarmData.alarm.token}`);
      let time = moment(date).format('LT');
      let formatedDate = moment(date).format();
      let days = { monday, tuesday, wednesday, thursday, friday, saturday, sunday }

      await databaseRef.update({
         formatedDate,
         time,
         title,
         doctor,
         description,
         drug,
         days,
      })

      setLoading(false);
      navigation.goBack();
   };

   return (
      <SafeAreaView style={style.mainContainer}>

         {loading && <ActivityIndicator style={style.loadingIndicator} color="#5b7cba" size="large" />}

         <Text style={style.registrationText}>Editar Alarme</Text>

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
                  <TouchableOpacity style={monday.enabled ? style.selectedDaysView : style.daysView} onPress={() => setMonday({ ...monday, enabled: !monday.enabled })}>
                     <Text style={monday.enabled ? style.selectedDaysText : style.daysText}>S</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={tuesday.enabled ? style.selectedDaysView : style.daysView} onPress={() => setTuesday({ ...tuesday, enabled: !tuesday.enabled })}>
                     <Text style={tuesday.enabled ? style.selectedDaysText : style.daysText}>T</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={wednesday.enabled ? style.selectedDaysView : style.daysView} onPress={() => setWednesday({ ...wednesday, enabled: !wednesday.enabled })}>
                     <Text style={wednesday.enabled ? style.selectedDaysText : style.daysText}>Q</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={thursday.enabled ? style.selectedDaysView : style.daysView} onPress={() => setThursday({ ...thursday, enabled: !thursday.enabled })}>
                     <Text style={thursday.enabled ? style.selectedDaysText : style.daysText}>Q</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={friday.enabled ? style.selectedDaysView : style.daysView} onPress={() => setFriday({ ...friday, enabled: !friday.enabled })}>
                     <Text style={friday.enabled ? style.selectedDaysText : style.daysText}>S</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={saturday.enabled ? style.selectedDaysView : style.daysView} onPress={() => setSaturday({ ...saturday, enabled: !saturday.enabled })}>
                     <Text style={saturday.enabled ? style.selectedDaysText : style.daysText}>S</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={sunday.enabled ? style.selectedDaysView : style.daysView} onPress={() => setSunday({ ...sunday, enabled: !sunday.enabled })}>
                     <Text style={sunday.enabled ? style.selectedDaysText : style.daysText}>D</Text>
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
               <View style={style.rowView}>
                  <View style={style.deviceArea}>
                     <Picker
                        selectedValue={drug}
                        onValueChange={(t) => setDrug(t)}
                        style={style.registrationPicker}
                     >
                        <Picker.Item label='Alexa' value='' style={style.pickerItem} />
                        <Picker.Item label='Google Home' value='' style={style.pickerItem} />
                     </Picker>
                  </View>

                  <TouchableOpacity style={style.trashIconArea} onPress={handleTrashIcon}>
                     <FontAwesomeIcon color='#000' size={35} icon={faTrashCan} />
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>

         <TouchableOpacity style={style.registrationButton} onPress={handleSaveButton}>
            <Text style={style.registrationButtonText}>Salvar</Text>
         </TouchableOpacity>


      </SafeAreaView>
   );
}

export default AlarmEdit;