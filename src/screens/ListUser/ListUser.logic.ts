import { useCallback, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ROUTES } from 'constant/route';
import { USER_INFO_TYPE } from 'api/user/user.type';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import listUserStore from 'data/userStore/ListUserStore';
import PushNotification from 'react-native-push-notification';

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

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const filter = addressMenuStore.selectedAddress;

  const listUser = fiterUser(listUserStore.listUser, filter);
  console.log(' ward, province, district', listUser, listUserStore.listUser);

  useEffect(() => {
    PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
      listScheduledNoti.forEach(scheduledLocal => {
        const userScheduled = listUserStore?.listUser.find(
          userInfo => userInfo.id === scheduledLocal.data.userId,
        );

        if (!userScheduled?.length) {
          PushNotificationIOS.removePendingNotificationRequests([
            scheduledLocal.id,
          ]);
        }
      });
    });
  }, [listUserStore?.listUser?.length]);

  const getListUser = useCallback(async () => {
    if (isLoading) return;
    if (!isFocused) return;

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
  }, [isFocused, isLoading]);

  const onDeleteUser = useCallback((id: string) => {
    listUserStore.onDeleteUser(id);
  }, []);

  const navigateToUserDetail = useCallback(
    (item: USER_INFO_TYPE) => {
      navigation.navigate(ROUTES.USER_DETAIL, { item });
    },
    [navigation],
  );

  useEffect(() => {
    getListUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return {
    users: listUser,
    isLoading,
    getListUser,
    navigateToUserDetail,
    onDeleteUser,
  };
};

export default useLogicListUser;
