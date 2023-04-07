import { useCallback, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';

const userCollection = firestore().collection('Users');

const useLogicListUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { province, district, ward } = addressMenuStore.selectedAddress;
  const getListUser = useCallback(async () => {
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
  }, [district, province, ward]);

  useEffect(() => {
    getListUser();
  }, [getListUser]);

  return {
    users,
    isLoading,
    getListUser,
  };
};

export default useLogicListUser;
