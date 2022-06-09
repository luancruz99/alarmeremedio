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
   const [title, setTitle] = useState(context.alarmData.alarm.title);
   const [doctor, setDoctor] = useState(context.alarmData.alarm.doctor);
   const [assistant, setAssistant] = useState(context.alarmData.alarm.assistant);
   const [shared, setShared] = useState(context.alarmData.alarm.shared);
   const [description, setDescription] = useState(context.alarmData.alarm.description);
   const [drug, setDrug] = useState(context.alarmData.alarm.drug);
   const [monday, setMonday] = useState(context.alarmData.alarm.days.monday);
   const [tuesday, setTuesday] = useState(context.alarmData.alarm.days.tuesday);
   const [wednesday, setWednesday] = useState(context.alarmData.alarm.days.wednesday);
   const [thursday, setThursday] = useState(context.alarmData.alarm.days.thursday);
   const [friday, setFriday] = useState(context.alarmData.alarm.days.friday);
   const [saturday, setSaturday] = useState(context.alarmData.alarm.days.saturday);
   const [sunday, setSunday] = useState(context.alarmData.alarm.days.sunday);

   const [loading, setLoading] = useState(false);

   const [alarm, setAlarm] = useState();

   useEffect(() => {



      for (let i = 0; i <= 6; i++) {
         let today = new Date();
         today.setDate(today.getDate() + i)

         switch (today.getDay()) {
            case 0:
               setSunday({ ...sunday, nextDate: `${moment(today).format('DD-MM-YYYY')} ${moment(date).format('LT')}:00` });
               break;
            case 1:
               setMonday({ ...monday, nextDate: `${moment(today).format('DD-MM-YYYY')} ${moment(date).format('LT')}:00` });
               break;
            case 2:
               setTuesday({ ...tuesday, nextDate: `${moment(today).format('DD-MM-YYYY')} ${moment(date).format('LT')}:00` });
               break;
            case 3:
               setWednesday({ ...wednesday, nextDate: `${moment(today).format('DD-MM-YYYY')} ${moment(date).format('LT')}:00` });
               break;
            case 4:
               setThursday({ ...thursday, nextDate: `${moment(today).format('DD-MM-YYYY')} ${moment(date).format('LT')}:00` });
               break;
            case 5:
               setFriday({ ...friday, nextDate: `${moment(today).format('DD-MM-YYYY')} ${moment(date).format('LT')}:00` });
               break;
            case 6:
               setSaturday({ ...saturday, nextDate: `${moment(today).format('DD-MM-YYYY')} ${moment(date).format('LT')}:00` });
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

      let shared = '';

      let assistentRef = database().ref('/bd/users')



      await assistentRef.orderByChild('email').equalTo(assistant).once('value').then(snapshot => {
         if (snapshot.val() == null) {
            SimpleToast.show('Cuidador não existe!');
            return;
         }
         let userData = Object.values(snapshot.val())[0];
         shared = userData.token;
         console.log(shared)
         console.log(userData.token)
      })



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
         assistant,
         shared,
      })

      setLoading(false);
      navigation.goBack();
   };

   return (
      <SafeAreaView style={style.mainContainer}>

         {loading && <ActivityIndicator style={style.loadingIndicator} color="#5b7cba" size="large" />}


         <Text style={style.registrationText}>Editar Alarme {context.alarmData.alarm.shared == context.userData.user.token && '(Cuidador)'} </Text>

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
               <TextInput
                  style={style.registrationInput}
                  value={assistant}
                  onChangeText={(t) => setAssistant(t)}
                  placeholder='Cuidador'
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