import React, { useState } from 'react';
import {
   SafeAreaView,
   TouchableOpacity,
   View,
   Text,
   TextInput,
   ScrollView,
   ActivityIndicator,
   Image

} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import database from '@react-native-firebase/database';

import SimpleToast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';


import { style } from './style';

const DrugRegistration = () => {
   const navigation = useNavigation();

   const [name, setName] = useState('');
   const [usage, setUsage] = useState('');
   const [description, setDescription] = useState('');

   const [loading, setLoading] = useState(false);

   const handleRegistrationButton = async () => {
      if (loading) {
         SimpleToast.show('Cadastro em andamento!');
         return;
      }

      setLoading(true);

      let token = uuid.v4();
      let databaseRef = database().ref(`bd/drugs/${token}`);

      await databaseRef.set({
         token,
         name,
         usage,
         description
      })

      setLoading(false);
      navigation.goBack();
   };

   return (
      <SafeAreaView style={style.mainContainer}>

         {loading && <ActivityIndicator style={style.loadingIndicator} color="#5b7cba" size="large" />}



         <Text style={style.registrationText}>Cadastrar Remédio</Text>

         <ScrollView style={style.registrationArea}>
            <View style={style.alignItens}>
               <TouchableOpacity style={style.imagePickerButton}>
                  <Image
                     style={style.imagePicker}
                     source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEX///+/v7+8vLzKysr8/Pzg4ODFxcXb29vT09Pj4+P4+PjBwcH6+vry8vLY2NjIyMjs7Ozo6Oia8u11AAAEdUlEQVR4nO2d65bqIAxGp/Smrb34/i971KqlEC7FGuJZ3/7dKewJBgK4/PsDAAAAAAAAAAAAAAAA4KUam5+i3m94UsUPoVoYwlA6MIShfGAIQ/nAEIbyOcBQSeNww9NZGOXBhuq8+w1fxugfDG1gmB0YBoFhdmAYBIbZgWEQGGYHhkFgmB0YBoFhdmAYBIbZyWB4qVI6mgyv4WUeH7u007lL7vFeWA3n8rUFrZqWK5KchnWvPapOTGFkNDQPOJrhk45Hw2d4Ns+oVPlRz2NhMxyawkTtv2OWAJvhSBwzfjBO2+g/5TLs7BDeSF4eDP0Y+yiX4UydFKtT4pRxa3SKTcVchtQgLYrobhq0Kj7+XIb0aX+fZtipHfH/ScPlZZG5Jq9hk2RYP96lTnFPcxnWpGF52d2eNrPGPc5lOJC5NDrl65Sv1fs16nEuw8v20sdCP+9uTh8NZVSuYVvTnKlBmjAdaqu/uH8Qm2FVWuNUJYSwOu3tLV9tcelNw5SF9yZjRaVixvpwbrZRTKnyuyKysRXOGn/QBqpK25QzptVm9598eyfqXDaPnah+GlNmwr/aGOcqYl3DvJtYzXU7jvU1bbVmVdExE+pP7Qjb6TiiOBFmOPuyD7XyC+djWYadGt2KxE5PzMpWluHtXc6KQZ/rNYK5RpThfWXnrGzp6iRcQ0ky7KbHK+iBup3rtQZD6wZJhq+9HDIsri89BBsUZPguIal0Y871K6ECRY6hXkFaimQeXQjVUHIMNwWkuVax5/q1xcC6Rozh0G+7vYmidaqzCaJ/whBjaEZJr608Y7QIHvBIMbR3/dfB55jr3/hrKCGGxMHN+vmi53rtSW+uEWLYUj1/dsY1169tetc1MgwHaw9HU3TN9Svec0huw4os6CZHcO7dcc/163O+XMNteC0JRfdk0Aby6BNfDcW9i1EquzedI4R36vAYLfy5htnwtnBRvaHo/SZxjN8Nz7UO5ltf97WnMgbqHCfhRbmHKa/hdXl2qxjzQQsaunMNr+FzUlD62W8bORD9TM4gshpe3xVg+Z7BonJlmN55mMhpWGkV4GughtacsbgvLnAa6hXga6B666I9OGsoRsPtMbCa7l2q6OVaAs6uMxpejXDdd+SPSTMP+vyGdri6+bAQui8u8BmaIbwxUdcXkg0dNRTjOf6BNiSOGirrXYxjcXQ+632ag6EPE7kMiU/h4dA1FJfhgUnTzZTRkCOEt8apYcpj+P1E6u4+j+H3E+kCdUmKxZAjkS4QrbMY8nwKC7qGYjFkSaQL9rqGw5AthORhIoMhUyJ9ksPwsDI+Brv97xtWY8mJNUwZYtixYu0qyjhd+yYwDALD7MAwCAyzA8MgMMwODIPAMDtHGxZ1JYvjDRvWajCC7SYRfhsBhvKBIQzlA0MYygeGMJQPDGEoHxjCUD4whKF8YAhD+cAQhvKBIQzlA0MYygeGMJQPDGEoHxjCUD4whKF8YAhD+cAQhvJJM/wpEgyv9U+R8iNaAAAAAAAAAAAAAAAAAP4r/gEYCYE2Xwz6DQAAAABJRU5ErkJggg==' }}
                  />
               </TouchableOpacity>

               <TextInput
                  style={style.registrationInput}
                  value={name}
                  onChangeText={(t) => setName(t)}
                  placeholder='Nome do remédio'
               />
               <TextInput
                  style={style.registrationInput}
                  value={usage}
                  onChangeText={(t) => setUsage(t)}
                  placeholder='Modo de uso'
               />
               <TextInput
                  style={style.descriptionInput}
                  value={description}
                  onChangeText={(t) => setDescription(t)}
                  placeholder='Descrição'
                  multiline={true}
               />
            </View>
         </ScrollView>

         <TouchableOpacity style={style.registrationButton} onPress={() => handleRegistrationButton()}>
            <Text style={style.registrationButtonText}>Cadastrar</Text>
         </TouchableOpacity>
      </SafeAreaView>
   );
};

export default DrugRegistration;