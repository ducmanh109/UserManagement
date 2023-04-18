import { useCallback, useEffect, useState } from 'react';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import userStore from 'data/userStore/UserStore';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import notificationService from 'services/NotificaionService';
import PushNotification from 'react-native-push-notification';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from 'constant/route';
import listUserStore from 'data/userStore/ListUserStore';

const useLogicHome = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    name: '',
    phoneNumber: '',
    detailAddress: '',
    repeatType: 'month',
    timeToRemind: new Date(),
    time_maintain: '0',
    note: '',
    id: null,
  });
  const selectedDate = userInfo.timeToRemind;
  console.log('userInfouserInfo', userInfo);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    // PushNotificationIOS.removeAllPendingNotificationRequests();
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: token => {
        console.log('NOTIFICATION TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
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
  }, [navigation]);

  const defaultTimePicker = selectedDate ?? new Date();
  const formatSelectedDate = format(selectedDate, 'dd/MM/yyyy');
  const formatSelectedTime =
    (selectedDate && format(selectedDate as Date, 'HH:mm')) ?? '--:--';

  const disableSubmitBtn =
    !userInfo.name ||
    !userInfo.detailAddress ||
    !addressMenuStore.selectedAddress.ward ||
    !selectedDate;

  const onSubmit = useCallback(() => {
    userStore.onCreateUser({
      ...userInfo,
      ...addressMenuStore.selectedAddress,
      timeToRemind: selectedDate,
    });

    //reset form after create user
    addressMenuStore.setSelectedAddress({
      province: '',
      district: '',
      ward: '',
    });
    setUserInfo({
      name: '',
      phoneNumber: '',
      detailAddress: '',
      repeatType: 'month',
      timeToRemind: new Date(),
    });
  }, [selectedDate, userInfo]);

  const onChangeTextInfo = useCallback(
    (fieldValue: string) => (value?: string | Date) => {
      setUserInfo({
        ...userInfo,
        [fieldValue]: value,
      });
    },
    [userInfo],
  );

  const onShowDatePicker = useCallback(() => {
    setShowDatePicker(value => !value);
  }, []);

  const onShowTimePicker = useCallback(() => {
    setShowTimePicker(value => !value);
  }, []);

  const onChangeDatePicker = (event: DateTimePickerEvent, date?: Date) => {
    onChangeTextInfo('timeToRemind')(date);
  };

  const onChangeTimePicker = (event: DateTimePickerEvent, date?: Date) => {
    console.log('date', date);
  };

  const onClosePickTime = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const onSelectRepeatType = useCallback(
    (selectedItem: any) => {
      console.log('onSelectRepeatType zxc', selectedItem);
      notificationService.setRepeatType(selectedItem.value);

      setUserInfo({
        ...userInfo,
        repeatType: selectedItem.value,
      });
    },
    [userInfo],
  );

  return {
    userInfo,
    disableSubmitBtn,
    showDatePicker,
    showTimePicker,
    selectedDate,
    defaultTimePicker,
    formatSelectedDate,
    formatSelectedTime,
    onChangeTextInfo,
    onSubmit,
    onShowDatePicker,
    onShowTimePicker,
    onChangeDatePicker,
    onChangeTimePicker,
    onSelectRepeatType,
    onClosePickTime,
  };
};

export default useLogicHome;
