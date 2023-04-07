import userStore from 'data/userStore/UserStore';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class NotificationService {
  constructor() {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: token => {
        console.log('NOTIFICATION TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: notification => {
        console.log('OPEN NOTIFICATION:', notification);
      },

      popInitialNotification: true,
      requestPermissions: false,
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task reminder notifications',
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
      console.log('listScheduledNoti>>>>>.', listScheduledNoti);
    });
  }

  scheduleNotifications({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) {
    if (Platform.OS === 'android') {
      const remindTime =
        userStore?.timeToRemind && userStore?.timeToRemind?.getTime();

      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title,
        message,
        date: new Date(remindTime as number),
        allowWhileIdle: true,
        priority: 'max',
        importance: 'max',
        playSound: true,
      });
    }

    PushNotificationIOS.addNotificationRequest({
      id: 'reminders',
      title,
      subtitle: message,
    });
  }
}

const notificationService = new NotificationService();
export default notificationService;
