import AsyncStorage from "@react-native-async-storage/async-storage";

export default{
   getToken: async () => {
      return await AsyncStorage.getItem('token');
   },
   logout: async () =>{
      await AsyncStorage.removeItem('token');
   }
};