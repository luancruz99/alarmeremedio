import PushNotification from 'react-native-push-notification';

const setNotification = (days, token, time, drug) => {
   if (days.monday.enabled) {
      PushNotification.localNotificationSchedule({
         channelId: 'main-channel',
         title: 'Alarm Clock at ' + time,
         message: 'Tomar remédio ' + drug,
         date: new Date(days.monday.nextDate),
         allowWhileIdle: true,
         id: token,
      })
      console.log(new Date(days.monday.nextDate))
   }
   if (days.tuesday.enabled) {
      PushNotification.localNotificationSchedule({
         channelId: 'main-channel',
         title: 'Alarm Clock at ' + time,
         message: 'Tomar remédio ' + drug,
         date: new Date(days.tuesday.nextDate),
         allowWhileIdle: true,
         id: token,
      })
   }
   if (days.wednesday.enabled) {
      PushNotification.localNotificationSchedule({
         channelId: 'main-channel',
         title: 'Alarm Clock at ' + time,
         message: 'Tomar remédio ' + drug,
         date: new Date(days.wednesday.nextDate),
         allowWhileIdle: true,
         id: token,
      })
   }
   if (days.thursday.enabled) {
      PushNotification.localNotificationSchedule({
         channelId: 'main-channel',
         title: 'Alarm Clock at ' + time,
         message: 'Tomar remédio ' + drug,
         date: new Date(days.thursday.nextDate),
         allowWhileIdle: true,
         id: token,
      })
   }
   if (days.friday.enabled) {
      PushNotification.localNotificationSchedule({
         channelId: 'main-channel',
         title: 'Alarm Clock at ' + time,
         message: 'Tomar remédio ' + drug,
         date: new Date(days.friday.nextDate),
         allowWhileIdle: true,
         id: token,
      })
   }
   if (days.saturday.enabled) {
      PushNotification.localNotificationSchedule({
         channelId: 'main-channel',
         title: 'Alarm Clock at ' + time,
         message: 'Tomar remédio ' + drug,
         date: new Date(days.saturday.nextDate),
         allowWhileIdle: true,
         id: token,
      })
   }
   if (days.monday.enabled) {
      PushNotification.localNotificationSchedule({
         channelId: 'main-channel',
         title: 'Alarm Clock at ' + time,
         message: 'Tomar remédio ' + drug,
         date: new Date(days.monday.nextDate),
         allowWhileIdle: true,
         id: token,
      })
   }
}

export { setNotification };