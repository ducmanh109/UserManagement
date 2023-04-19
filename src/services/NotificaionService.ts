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

  editScheduledNotifications({ userDetail }: { userDetail: USER_INFO_TYPE }) {
    console.log('editScheduledNotifications ->>>>> userDetail ', userDetail);
    PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
      const userScheduled = listScheduledNoti?.filter(notification => {
        return notification?.data?.userId === userDetail.id;
      });
      console.log(
        'editScheduledNotifications ->>>>> userScheduled',
        userScheduled,
      );
      if (userScheduled?.length) {
        console.log(
          'editScheduledNotifications ->>>>> removePendingNotificationRequests ->>>>> listScheduledNoti',
          userScheduled,
        );

        PushNotificationIOS.removePendingNotificationRequests([
          userScheduled[0].id,
        ]);
      }

      this.scheduleNotifications({ userDetail });
    });
  }

  scheduleNotifications({ userDetail }: { userDetail: USER_INFO_TYPE }) {
    const remindTime = userDetail?.timeToRemind
      ? new Date(userDetail?.timeToRemind as any)
      : null;

    if (!remindTime || !userDetail?.repeatType) {
      return;
    }
    console.log('scheduleNotifications ->>>>> userDetail', userDetail);
    PushNotificationIOS.scheduleLocalNotification({
      alertTitle: `${userDetail.name}` + ',' + new Date().toDateString(),
      alertBody: `${userDetail.phoneNumber}, ${userDetail?.ward}, ${userDetail?.district}, ${userDetail?.province} \n ${userDetail.detailAddress}`,
      fireDate: new Date(remindTime).toISOString(), // Thời gian thông báo sẽ xuất hiện, ở đây là 30 giây sau khi gọi hàm.
      repeatInterval: userDetail?.repeatType as any, // Lặp lại thông báo hàng ngày.
      userInfo: {
        userId: userDetail.id,
        ...userDetail,
        timeToRemind: '',
        date: '',
        scheduledTime: '',
      }, // Thông tin bổ sung nếu có.
    });
  }

  syncScheduleNotifications({ userDetail }: { userDetail: USER_INFO_TYPE }) {
    console.log(
      'syncScheduleNotificationssyncScheduleNotificationssyncScheduleNotifications',
    );
    const remindTime = userDetail?.timeToRemind
      ? new Date(userDetail?.timeToRemind as any)
      : null;

    PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
      const userScheduled = listScheduledNoti?.filter(value => {
        return value?.data?.userId === userDetail.id;
      });
      console.log(
        'userDetail,listScheduledNoti',
        userDetail,
        listScheduledNoti,
        userScheduled,
      );
      if (userScheduled?.length || !remindTime || !userDetail?.repeatType) {
        // if (!remindTime || !userDetail?.repeatType) {
        console.log(
          'syncScheduleNotifications ->>>>> !remindTime || !userDetail?.repeatType ->>>> removePendingNotificationRequests',
          userScheduled.map(item => item.id),
        );
        PushNotificationIOS.removePendingNotificationRequests(
          userScheduled.map(item => item.id),
        );
        // }
        // return;
      }

      this.scheduleNotifications({ userDetail });
    });
  }
}

const notificationService = new NotificationService();

export default notificationService;
