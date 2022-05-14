import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
   mainContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#dfe3f1'
   },
   registrationText: {
      fontSize: 17,
      color: '#000',
      marginTop: 55,
      marginBottom: 5,

   },
   registrationArea: {
      width: '90%',
      height: '75%',
      borderRadius: 20,
      backgroundColor: '#fff',
   },
   registrationButton: {
      width: 120,
      height: 45,
      borderRadius: 20,
      marginTop: 25,
      backgroundColor: '#5b7cba',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
   },
   registrationButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
   },
   pickerArea: {
      marginBottom: 15,
   },
   registrationInput: {
      width: '93%',
      height: 45,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: '#e3e3e3',
      marginTop: 15
   },
   descriptionInput: {
      width: '93%',
      height: 70,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: '#e3e3e3',
      marginTop: 15,
      textAlignVertical: 'top',
   },
   alignItens: {
      alignItems: 'center',
      marginBottom: 15,
   },
   registrationPicker: {
      width: '100%',
      height: '100%',
      paddingHorizontal: 15,

   },
   pickerItem: {
      fontSize: 14,
      color: '#888',
   },
   enabledPickerItem: {
      fontSize: 14,
      color: '#000',
   },
   pickerView: {
      width: '93%',
      height: 45,
      borderRadius: 10,
      backgroundColor: '#e3e3e3',
      marginTop: 15,
      justifyContent: 'center',
   },
   daysContainer: {
      flexDirection: 'row',
      marginTop: 5,
   },
   daysView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      width: 20,
      borderRadius: 10,
      backgroundColor: '#e3e3e3',
      marginHorizontal: 2,
   },
   daysText: {
      fontSize: 12,
      color: '#000',
   },
   selectedDaysView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      width: 20,
      borderRadius: 10,
      backgroundColor: '#000',
      marginHorizontal: 2,
   },
   selectedDaysText: {
      fontSize: 12,
      color: '#fff',
   },
   loadingIndicator: {
      position: 'absolute',
      alignSelf: 'center',
      marginTop: 15,
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 2,
   },
   trashIconArea: {
      alignItems: 'center',
      justifyContent: 'center',

   },
   rowView: {
      flexDirection: 'row',
      width: '93%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
   },
   deviceArea: {
      width: '88%',
      height: 45,
      borderRadius: 10,
      justifyContent: 'center',
      backgroundColor: '#e3e3e3',
      borderRadius: 10,
   },
})

export { style };