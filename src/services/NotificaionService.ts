import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { USER_INFO_TYPE } from 'api/user/user.type';

export type RepeatType =
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'time'
  | 'month'
  | undefined;

export const notiType = {
  MAIN_TAIN: 'maintain',
  MONEY: 'money',
};

class NotificationService {
  constructor() {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
  }

  // editScheduledNotifications({ userDetail }: { userDetail: USER_INFO_TYPE }) {
  //   console.log('editScheduledNotifications ->>>>> userDetail ', userDetail);
  //   PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
  //     const userScheduled = listScheduledNoti?.filter(notification => {
  //       return notification?.data?.userId === userDetail.id;
  //     });
  //     console.log(
  //       'editScheduledNotifications ->>>>> userScheduled',
  //       userScheduled,
  //     );
  //     if (userScheduled?.length) {
  //       console.log(
  //         'editScheduledNotifications ->>>>> removePendingNotificationRequests ->>>>> listScheduledNoti',
  //         userScheduled,
  //       );

  //       PushNotificationIOS.removePendingNotificationRequests([
  //         userScheduled[0].id,
  //       ]);
  //     }

  //     this.scheduleNotifications({ userDetail });
  //   });
  // }

  scheduleNotifications({ userDetail }: { userDetail: USER_INFO_TYPE }) {
    const remindTime = userDetail?.timeToRemind
      ? new Date(userDetail?.timeToRemind as any)
      : null;
    const remindTimeMoney = userDetail?.timeToRemindMoney
      ? new Date(userDetail?.timeToRemindMoney as any)
      : null;
    console.log('userDetail', userDetail);
    if (remindTime && userDetail?.repeatType) {
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: `Bảo trì: ${userDetail.name}`,
        alertBody: `${userDetail.phoneNumber}, ${userDetail?.ward}, ${userDetail?.district}, ${userDetail?.province} \n ${userDetail.detailAddress}`,
        fireDate: new Date(remindTime).toISOString(), // Thời gian thông báo sẽ xuất hiện, ở đây là 30 giây sau khi gọi hàm.
        repeatInterval: userDetail?.repeatType as any, // Lặp lại thông báo hàng ngày.
        soundName: 'mixkit-urgent-simple-tone-loop-2976.wav',
        userInfo: {
          type: notiType.MAIN_TAIN,
          userId: userDetail.id,
          ...userDetail,
          timeToRemind: '',
          timeToRemindMoney: '',
          date: '',
          scheduledTime: '',
          time_maintain: '',
        }, // Thông tin bổ sung nếu có.
      });
    }

    if (remindTimeMoney && userDetail?.repeatTypeMoney) {
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: `Thu tiền: ${userDetail.name}` + ',',
        alertBody: `${userDetail.phoneNumber}, ${userDetail?.ward}, ${userDetail?.district}, ${userDetail?.province} \n ${userDetail.detailAddress}`,
        fireDate: new Date(remindTimeMoney).toISOString(), // Thời gian thông báo sẽ xuất hiện, ở đây là 30 giây sau khi gọi hàm.
        repeatInterval: userDetail?.repeatType as any, // Lặp lại thông báo hàng ngày.\
        soundName: 'mixkit-urgent-simple-tone-loop-2976.wav',
        userInfo: {
          type: notiType.MONEY,
          userId: userDetail.id,
          ...userDetail,
          timeToRemind: '',
          timeToRemindMoney: '',
          date: '',
          scheduledTime: '',
          time_maintain: '',
        }, // Thông tin bổ sung nếu có.
      });
    }
  }

  syncScheduleNotifications({ userDetail }: { userDetail: USER_INFO_TYPE }) {
    this.scheduleNotifications({ userDetail });
  }
}

const notificationService = new NotificationService();

export default notificationService;
