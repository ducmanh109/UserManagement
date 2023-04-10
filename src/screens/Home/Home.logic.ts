import { useCallback, useState } from 'react';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import userStore from 'data/userStore/UserStore';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import notificationService from 'services/NotificaionService';

const date = new Date();

const useLogicHome = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    detailAddress: '',
    repeatType: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);

  const defaultTimePicker = selectedDate ?? date;
  const formatSelectedDate = format(selectedDate, 'dd/MM/yyyy');
  const formatSelectedTime =
    (userStore?.timeToRemind &&
      format(userStore?.timeToRemind as Date, 'HH:mm')) ??
    '--:--';

  const disableSubmitBtn =
    !userInfo ||
    !userInfo.lastName ||
    !userInfo.detailAddress ||
    !addressMenuStore.selectedAddress.ward ||
    !userStore?.timeToRemind;

  const onSubmit = useCallback(() => {
    userStore.onCreateUser({
      ...userInfo,
      ...addressMenuStore.selectedAddress,
      timeToRemind: userStore?.timeToRemind,
    });

    notificationService.scheduleNotifications({
      title: `${userInfo.firstName} ${userInfo.lastName}`,
      message: userInfo.phoneNumber,
    });

    //reset form after create user
    addressMenuStore.setSelectedAddress({
      province: '',
      district: '',
      ward: '',
    });
    setUserInfo({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      detailAddress: '',
      repeatType: '',
    });
    setSelectedDate(date);
    userStore.setTimeToRemind(null);
  }, [userInfo]);

  const onChangeTextInfo = useCallback(
    (fieldValue: string) => (value: string) => {
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
    setSelectedDate(date as any);
    setShowDatePicker(false);
  };

  const onChangeTimePicker = (event: DateTimePickerEvent, date?: Date) => {
    userStore.setTimeToRemind(date);

    setShowTimePicker(false);
  };

  const getRepeatType = useCallback((index: number) => {
    switch (index) {
      case 0:
        notificationService.setRepeatType('week');
        break;
      case 1:
        notificationService.setRepeatType('day');
        break;
      case 2:
        notificationService.setRepeatType('hour');
        break;
      case 3:
        notificationService.setRepeatType('minute');
        break;
      default:
        break;
    }
  }, []);

  const onSelectRepeatType = useCallback(
    (selectedItem: string, index: number) => {
      getRepeatType(index);

      setUserInfo({
        ...userInfo,
        repeatType: selectedItem,
      });
    },
    [getRepeatType, userInfo],
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
  };
};

export default useLogicHome;
