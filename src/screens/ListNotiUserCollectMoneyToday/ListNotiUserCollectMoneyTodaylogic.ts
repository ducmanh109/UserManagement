import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from 'constant/route';
import { USER_INFO_TYPE } from 'api/user/user.type';
import listUserStore from 'data/userStore/ListUserStore';

//TODO: fix bug in comment

const fiterUser = (users: USER_INFO_TYPE[], date: Date) => {
  const newListUser = users.filter(user => {
    if (
      user.timeToRemindMoney &&
      user.repeatTypeMoney &&
      date.toLocaleDateString() ===
        new Date(user.timeToRemindMoney as any).toLocaleDateString()
    )
      return true;

    return false;
  });

  return newListUser;
};

const useLogicListUser = () => {
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());
  const onSelectDate = (_: any, date?: Date | undefined) => {
    date && setDateSelected(date);
  };
  const listUser = fiterUser(listUserStore.listUser, dateSelected);

  const navigateToUserDetail = useCallback(
    (item: USER_INFO_TYPE) => {
      navigation.navigate(ROUTES.USER_DETAIL as never, { item } as never);
    },
    [navigation],
  );

  return {
    users: listUser,
    navigateToUserDetail,
    dateSelected,
    showDatePicker,
    setShowDatePicker,
    onSelectDate,
  };
};

export default useLogicListUser;
