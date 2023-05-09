import { useCallback, useState } from 'react';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import userStore from 'data/userStore/UserStore';
import listUserStore from 'data/userStore/ListUserStore';
import { USER_INFO_TYPE } from 'api/user/user.type';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from 'constant/route';

const useLogicHome = (
  userInfoParams?: USER_INFO_TYPE,
  onUpdateSuccess?: any,
) => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    name: userInfoParams?.name ?? '',
    phoneNumber: userInfoParams?.phoneNumber ?? '',
    detailAddress: userInfoParams?.detailAddress ?? '',
    repeatType: userInfoParams?.repeatType ?? 'month',
    repeatTypeMoney: userInfoParams?.repeatTypeMoney ?? 'month',
    timeToRemind: userInfoParams?.timeToRemind
      ? new Date(userInfoParams?.timeToRemind)
      : new Date(),
    timeToRemindMoney: userInfoParams?.timeToRemindMoney
      ? new Date(userInfoParams?.timeToRemindMoney)
      : new Date(),
    collectMoneyType: userInfoParams?.collectMoneyType ?? [],
    time_maintain: userInfoParams?.time_maintain ?? [
      {
        year: 2023,
        month: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
        },
      },
    ],
    note: userInfoParams?.note ?? '',
    id: userInfoParams?.id ?? null,
  });

  const selectedDate = userInfo.timeToRemind;
  const selectedDateMoney = userInfo.timeToRemindMoney;

  const disableSubmitBtn =
    !userInfo.name || !userInfo.detailAddress || !selectedDate;

  const onSubmit = useCallback(() => {
    if (userInfoParams) {
      listUserStore.onUpdateUser(
        userInfoParams.id,
        {
          ...(userInfoParams ? userInfoParams : {}),
          ...userInfo,
          ...addressMenuStore.selectedAddress,
          timeToRemind: new Date(selectedDate).toString(),
          timeToRemindMoney: new Date(selectedDateMoney).toString(),
          // time_maintain: '',
        },
        onUpdateSuccess,
      );
      return;
    }

    userStore.onCreateUser(
      {
        ...userInfo,
        ...addressMenuStore.selectedAddress,
        timeToRemind: new Date(selectedDate).toString(),
        timeToRemindMoney: new Date(selectedDateMoney).toString(),
      },
      () => {
        navigation.navigate(ROUTES.LIST_USER as never);
      },
    );

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
      timeToRemindMoney: new Date(),
    } as any);
  }, [
    navigation,
    onUpdateSuccess,
    selectedDate,
    selectedDateMoney,
    userInfo,
    userInfoParams,
  ]);

  const onChangeDatePicker = (_: any, date?: Date) => {
    onChangeTextInfo('timeToRemind')(date);
  };

  const onChangeDatePickerMoney = (_: any, date?: Date) => {
    onChangeTextInfo('timeToRemindMoney')(date);
  };

  const onChangeTextInfo = useCallback(
    (fieldValue: string) => (value?: string | Date) => {
      console.log('valuevalue', value);
      setUserInfo({
        ...userInfo,
        [fieldValue]: value,
      });
    },
    [userInfo],
  );

  const onSelectRepeatType = useCallback(
    (selectedItem: any) => {
      setUserInfo({
        ...userInfo,
        repeatType: selectedItem.value,
      });
    },
    [userInfo],
  );

  const onSelectRepeatTypeMoney = useCallback(
    (selectedItem: any) => {
      setUserInfo({
        ...userInfo,
        repeatTypeMoney: selectedItem.value,
      });
    },
    [userInfo],
  );

  return {
    userInfo,
    disableSubmitBtn,
    selectedDate,
    onChangeTextInfo,
    onSubmit,
    onSelectRepeatType,
    onSelectRepeatTypeMoney,
    selectedDateMoney,
    onChangeDatePicker,
    onChangeDatePickerMoney,
  };
};

export default useLogicHome;
