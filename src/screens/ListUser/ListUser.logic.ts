import { useCallback, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ROUTES } from 'constant/route';
import { USER_INFO_TYPE } from 'api/user/user.type';

//TODO: fix bug in comment
const userCollection = firestore().collection('Users');

const useLogicListUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { province, district, ward } = addressMenuStore.selectedAddress;
  const getListUser = useCallback(async () => {
    if (!isFocused) return;

    setIsLoading(true);

    try {
      let response: any;
      const newList: any = [];

      if (!ward) {
        response = await userCollection.get();
      }

      if (province.length > 0) {
        response = await userCollection.where('province', '==', province).get();
      }

      if (district) {
        response = await userCollection
          .where('province', '==', province)
          .where('district', '==', district)
          .get();
      }

      if (ward) {
        response = await userCollection
          .where('province', '==', province)
          .where('district', '==', district)
          .where('ward', '==', ward)
          .get();
      }

      response.forEach((user: any) => {
        newList.push(user.data());
      });

      setUsers(newList);
    } catch (error) {
      console.log('Get List User Fail With Error', error);
    } finally {
      setIsLoading(false);
    }

    //phải disable và dùng isFocus để check vì khi chọn province,district or ward(được lưu vào store mobx khi chọn)
    //thì hàm này sẽ bị gọi làm thay đổi data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, province, ward]);

  const navigateToUserDetail = useCallback(
    (item: USER_INFO_TYPE) => {
      navigation.navigate(ROUTES.USER_DETAIL, { item });
    },
    [navigation],
  );

  useEffect(() => {
    getListUser();
  }, [getListUser]);

  return {
    users,
    isLoading,
    getListUser,
    navigateToUserDetail,
  };
};

export default useLogicListUser;
