import { useCallback, useState } from 'react';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import userStore from 'data/userStore/UserStore';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import notificationService from 'services/NotificaionService';
import listUserStore from 'data/userStore/ListUserStore';
import { USER_INFO_TYPE } from 'api/user/user.type';

const useLogicHome = (
  userInfoParams?: USER_INFO_TYPE,
  onUpdateSuccess?: any,
) => {
  console.log('userInfoParamsuserInfoParamsuserInfoParams', userInfoParams);
  const [userInfo, setUserInfo] = useState({
    name: userInfoParams?.name ?? '',
    phoneNumber: userInfoParams?.phoneNumber ?? '',
    detailAddress: userInfoParams?.detailAddress ?? '',
    repeatType: userInfoParams?.repeatType ?? 'month',
    timeToRemind: userInfoParams?.timeToRemind
      ? new Date(userInfoParams?.timeToRemind)
      : new Date(),
    time_maintain: userInfoParams?.time_maintain ?? '0',
    note: userInfoParams?.note ?? '',
    id: userInfoParams?.id ?? null,
  });
  const selectedDate = userInfo.timeToRemind;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatSelectedDate = format(selectedDate, 'dd/MM/yyyy');
  const formatSelectedTime =
    (selectedDate && format(selectedDate as Date, 'HH:mm')) ?? '--:--';

  const disableSubmitBtn =
    !userInfo.name || !userInfo.detailAddress || !selectedDate;

  const onSubmit = useCallback(() => {
    userInfoParams
      ? listUserStore.onUpdateUser(
          userInfoParams.id,
          {
            ...(userInfoParams ? userInfoParams : {}),
            ...userInfo,
            ...addressMenuStore.selectedAddress,
            timeToRemind: new Date(selectedDate).toString(),
          },
          onUpdateSuccess,
        )
      : userStore.onCreateUser({
          ...userInfo,
          ...addressMenuStore.selectedAddress,
          timeToRemind: new Date(selectedDate).toString(),
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
  }, [onUpdateSuccess, selectedDate, userInfo, userInfoParams]);

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
    setShowTimePicker(false);
  }, []);

  const onShowTimePicker = useCallback(() => {
    setShowTimePicker(value => !value);
    setShowDatePicker(false);
  }, []);

  const onChangeDatePicker = (event: DateTimePickerEvent, date?: Date) => {
    onChangeTextInfo('timeToRemind')(date);
  };

  const onClosePickTime = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const onSelectRepeatType = useCallback(
    (selectedItem: any) => {
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
    formatSelectedDate,
    formatSelectedTime,
    onChangeTextInfo,
    onSubmit,
    onShowDatePicker,
    onShowTimePicker,
    onChangeDatePicker,
    onSelectRepeatType,
    onClosePickTime,
  };
};

export default useLogicHome;
