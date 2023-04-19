import { useCallback, useEffect, useState } from 'react';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from 'constant/route';
import { USER_INFO_TYPE } from 'api/user/user.type';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import listUserStore from 'data/userStore/ListUserStore';
import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';

//TODO: fix bug in comment

const fiterUser = (
  users: USER_INFO_TYPE[],
  filter: { ward: string; province: string; district: string },
) => {
  const { ward, province, district } = filter;
  if (!ward && !province && !district) {
    return users;
  }

  const newListUser = users.filter(user => {
    return (
      (province === '' || user.province === province) &&
      (ward === '' || user.ward === ward) &&
      (district === '' || user.district === district)
    );
  });

  return newListUser;
};

const useLogicListUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const filter = addressMenuStore.selectedAddress;

  const listUser = fiterUser(listUserStore.listUser, filter);

  console.log('listUser', listUser);

  const getListUser = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await listUserStore.onGetListUser();
    } catch (error) {
      console.log('Get List User Fail With Error', error);
    } finally {
      setIsLoading(false);
    }

    //phải disable và dùng isFocus để check vì khi chọn province,district or ward(được lưu vào store mobx khi chọn)
    //thì hàm này sẽ bị gọi làm thay đổi data
  }, [isLoading]);

  const navigateToUserDetail = useCallback(
    (item: USER_INFO_TYPE) => {
      navigation.navigate(ROUTES.USER_DETAIL, { item });
    },
    [navigation],
  );

  useEffect(() => {
    PushNotification.configure({
      onRegister: token => {
        console.log('NOTIFICATION TOKEN:', token);
      },

      onNotification: notification => {
        console.log('OPEN NOTIFICATION:', notification);
        navigation.navigate(
          ROUTES.USER_DETAIL as never,
          {
            item: notification.data,
          } as never,
        );
      },

      popInitialNotification: true,
      requestPermissions: true,
      permissions: { alert: true, badge: true, sound: true },
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task reminder notifications',
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    listUserStore.onGetListUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
        listScheduledNoti.forEach(scheduledLocal => {
          const userScheduled = listUserStore?.listUser.find(
            userInfo => userInfo.id === scheduledLocal.data.userId,
          );

          if (!userScheduled) {
            PushNotificationIOS.removePendingNotificationRequests([
              scheduledLocal.id,
            ]);
          }
        });
      });

      PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
        console.log('listScheduledNoti', listScheduledNoti);
      });
    }, 2000);
  }, [listUserStore?.listUser]);

  useEffect(() => {
    const onValueChange = database()
      .ref('Users')
      .on('value', snapshot => {
        const userList = snapshot.val();
        const newList = userList
          ? Object.entries(userList).map(([id, value]) => ({ id, ...value }))
          : [];
        listUserStore.setListUser(newList);
      });

    return () => database().ref('Users').off('value', onValueChange);
  }, []);

  return {
    users: listUser,
    isLoading,
    getListUser,
    navigateToUserDetail,
  };
};

export default useLogicListUser;
