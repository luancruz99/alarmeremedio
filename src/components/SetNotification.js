import ReactNativeAN from 'react-native-alarm-notification';
import moment from 'moment';

const alarmNotifData = {
   title: "Alarm Ringing",
   message: "My Notification Message",
   channel: "alarm-channel",
   ticker: "My Notification Ticker",
   small_icon: "ic_launcher",
   vibrate: true,
   large_icon: "ic_launcher",
   play_sound: true,
   sound_name: null,
   color: 'red',
   schedule_once: true,
   tag: 'some_tag',

   // You can add any additional data that is important for the notification
   // It will be added to the PendingIntent along with the rest of the bundle.
   // e.g.
   data: { foo: "bar" },
};

const setNotification = async (days, token, drug) => {
   if (days.monday.enabled) {
      const monday = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: days.monday.nextDate, id: token, message: `Tomar remédio: ${drug}` })
      console.log(monday);
   }
   if (days.tuesday.enabled) {
      const tuesday = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: days.tuesday.nextDate, id: token, message: `Tomar remédio: ${drug}` })
      console.log(tuesday);
   }
   if (days.wednesday.enabled) {
      const wednesday = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: days.wednesday.nextDate, id: token, message: `Tomar remédio: ${drug}` })
      console.log(wednesday);
   }
   if (days.thursday.enabled) {
      const thursday = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, id: token, fire_date: days.thursday.nextDate, message: `Tomar remédio: ${drug}` })
      console.log(thursday);
   }
   if (days.friday.enabled) {
      const friday = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, id: token, fire_date: days.friday.nextDate, message: `Tomar remédio: ${drug}` })
      console.log(friday);
   }
   if (days.saturday.enabled) {
      const saturday = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, id: token, fire_date: days.saturday.nextDate, message: `Tomar remédio: ${drug}` })
      console.log(saturday);
   }
   if (days.sunday.enabled) {
      const sunday = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, id: token, fire_date: days.sunday.nextDate, message: `Tomar remédio: ${drug}` })
      console.log(sunday);
   }

}

export { setNotification };