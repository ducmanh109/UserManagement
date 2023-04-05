import { useCallback, useState } from 'react';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import userStore from 'data/userStore/UserStore';

const useLogicHome = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
  });
  const disableButton =
    !userInfo.firstName ||
    !userInfo.lastName ||
    !addressMenuStore.selectedAddress.ward;

  const onSubmit = useCallback(() => {
    userStore.onCreateUser({
      ...userInfo,
      ...addressMenuStore.selectedAddress,
    });
    addressMenuStore.setSelectedAddress({
      province: '',
      district: '',
      ward: '',
    });
    setUserInfo({
      firstName: '',
      lastName: '',
    });
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

  return {
    userInfo,
    disableButton,
    onChangeTextInfo,
    onSubmit,
  };
};

export default useLogicHome;
