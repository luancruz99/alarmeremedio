import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
   mainContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#dfe3f1'
   },
   imagePickerButton: {
      width: 150,
      height: 150,
      borderRadius: 75,
      alignSelf: 'center',
      marginTop: 25,
      marginBottom: 5,
      backgroundColor: '#e3e3e3',

   },
   imagePicker: {
      height: 150,
      width: 150,
      borderRadius: 75,
      alignSelf: 'center',
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
   alignItens: {
      alignItems: 'center',
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
      height: 200,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: '#e3e3e3',
      marginTop: 15,
      textAlignVertical: 'top',
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
   loadingIndicator: {
      position: 'absolute',
      alignSelf: 'center',
      marginTop: 15,
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 2,
   },
})

export { style };