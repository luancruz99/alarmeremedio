import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#dfe3f1',
   },
   content: {
      alignItems: 'center',
   },
   pageTitle: {
      fontSize: 50,
      color: '#5b7cba',
      marginBottom: 40,
      marginTop: 50,
   },
   textInput: {
      width: '90%',
      height: 50,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
      fontSize: 16,
   },
   halfTextInputArea:{
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
   },
   halfTextInput: {
      width: '48%',
      height: 50,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
      fontSize: 16,
   },
   registerButtonArea: {
      width: 150,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5b7cba',
      borderRadius: 25,
      marginVertical: 15,
   },
   registerButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600'
   },
})

export { style };