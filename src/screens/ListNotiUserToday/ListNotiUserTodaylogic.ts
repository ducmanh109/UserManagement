import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from 'constant/route';
import { USER_INFO_TYPE } from 'api/user/user.type';
import listUserStore from 'data/userStore/ListUserStore';

//TODO: fix bug in comment

const fiterUser = (users: USER_INFO_TYPE[]) => {
  const newListUser = users.filter(user => {
    if (!user.timeToRemind) return false;

    return (
      new Date().toLocaleDateString() ===
      new Date(user.timeToRemind as any).toLocaleDateString()
    );
  });

  return newListUser;
};

const useLogicListUser = () => {
  const navigation = useNavigation();

  const listUser = fiterUser(listUserStore.listUser);

  const navigateToUserDetail = useCallback(
    (item: USER_INFO_TYPE) => {
      navigation.navigate(ROUTES.USER_DETAIL as never, { item } as never);
    },
    [navigation],
  );

  return {
    users: listUser,
    navigateToUserDetail,
  };
};

export default useLogicListUser;
