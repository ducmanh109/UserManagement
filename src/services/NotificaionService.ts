import userStore from 'data/userStore/UserStore';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { USER_INFO_TYPE } from 'api/user/user.type';
import listUserStore from 'data/userStore/ListUserStore';

export type RepeatType =
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'time'
  | 'month'
  | undefined;

class NotificationService {
  repeatType?: RepeatType = 'day';

  constructor() {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
  }

  setRepeatType(repeatType?: RepeatType) {
    this.repeatType = repeatType;
  }

  scheduleNotifications({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) {
    const remindTime =
      userStore?.timeToRemind && userStore?.timeToRemind?.getTime();
    console.log('remindTime', remindTime, userStore?.timeToRemind?.getTime());
    if (Platform.OS === 'android') {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title,
        message,
        date: new Date(remindTime as number),
        allowWhileIdle: true,
        priority: 'max',
        importance: 'max',
        playSound: true,
        repeatType: this.repeatType as any,
      });
    }

    const repeatsComponent: { [key: string]: boolean } = {};

    if (this.repeatType !== 'time' && typeof this.repeatType === 'string') {
      repeatsComponent[
        this.repeatType === 'week' ? 'dayOfWeek' : this.repeatType
      ] = true;
    }

    PushNotificationIOS.addNotificationRequest({
      id: 'reminders',
      title,
      subtitle: message,
      fireDate: new Date(remindTime as number),
      repeats: true,
      repeatsComponent,
    });
  }

  addScheduleNotifications({
    userDetail,
  }: // title,
  // message,
  // timeToRemind,
  // repeatType,
  // id,
  {
    userDetail: USER_INFO_TYPE;
    // title: string;
    // message: string;
    // timeToRemind: any;
    // repeatType: any;
    // id: any;
  }) {
    const userId = userDetail.id;

    PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
      const userScheduled = listScheduledNoti?.filter(value => {
        return value?.data?.userId === userId;
      });

      if (userScheduled?.length) {
        if (!userDetail?.scheduledTime) {
          listUserStore.onUpdateUser(userDetail.id, userScheduled[0]);
        }
        return;
      }

      const remindTime = userDetail?.timeToRemind.toMillis();

      const repeatsComponent: { [key: string]: boolean } = {};

      if (!userDetail?.repeatType) return;

      if (
        userDetail?.repeatType !== 'time' &&
        typeof userDetail?.repeatType === 'string'
      ) {
        repeatsComponent[
          userDetail?.repeatType === 'week'
            ? 'dayOfWeek'
            : userDetail?.repeatType
        ] = true;
      }

      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: `${userDetail.name}` + ',' + new Date().toDateString(),
        alertBody: `${userDetail.phoneNumber}, ${userDetail?.ward}, ${userDetail?.district}, ${userDetail?.province} \n ${userDetail.detailAddress}`,
        fireDate: new Date(remindTime).toISOString(), // Thời gian thông báo sẽ xuất hiện, ở đây là 30 giây sau khi gọi hàm.
        repeatInterval: userDetail?.repeatType as any, // Lặp lại thông báo hàng ngày.
        userInfo: {
          userId,
          ...userDetail,
          timeToRemind: '',
          date: '',
          scheduledTime: '',
        }, // Thông tin bổ sung nếu có.
      });
    });
  }
}

const notificationService = new NotificationService();

export default notificationService;
