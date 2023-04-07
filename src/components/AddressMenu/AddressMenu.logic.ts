import { useCallback, useEffect, useRef, useState } from 'react';
import userStore from 'data/userStore/UserStore';
import SelectDropdown from 'react-native-select-dropdown';
import { AddressType } from 'data/address/address.type';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';

const useLogicAddressMenu = () => {
  const addressData = userStore?.addressData;
  const listProvinces = addressData?.provinces?.map(item => item.name);
  const listDistricts = addressData?.districts?.map(item => item.name);
  const listWards = addressData?.wards?.map(item => item.name);

  const provinceRef = useRef<SelectDropdown>(null);
  const districtRef = useRef<SelectDropdown>(null);
  const wardRef = useRef<SelectDropdown>(null);

  const [addressCode, setAddressCode] = useState('');

  const onResetAddress = useCallback(() => {
    provinceRef.current?.reset();
    districtRef.current?.reset();
    wardRef.current?.reset();

    addressMenuStore.resetFilter();
  }, []);

  const onFocusDropdown = useCallback(
    (type: AddressType) => {
      switch (type) {
        case 'province':
          userStore.getListProvinces();
          break;
        case 'district':
          userStore.getListDistricts(addressCode);
          break;
        case 'ward':
          userStore.getListWards(addressCode);
          break;
        default:
          break;
      }
    },
    [addressCode],
  );

  const getAddressCode = useCallback((array: any, name: string) => {
    const addressObj = array.find((item: any) => item.name === name);

    setAddressCode(addressObj.code);
  }, []);

  const onSelectAddress = useCallback(
    (type: AddressType, selectedItem: string) => {
      switch (type) {
        case 'province':
          if (addressMenuStore.selectedAddress.province !== selectedItem) {
            districtRef.current?.reset();
            wardRef.current?.reset();
          }

          addressMenuStore.setSelectedAddress({
            ...addressMenuStore.selectedAddress,
            province: selectedItem,
          });

          getAddressCode(userStore.addressData.provinces, selectedItem);
          break;

        case 'district':
          if (addressMenuStore.selectedAddress.district !== selectedItem) {
            wardRef.current?.reset();
          }

          addressMenuStore.setSelectedAddress({
            ...addressMenuStore.selectedAddress,
            district: selectedItem,
          });
          getAddressCode(userStore.addressData.districts, selectedItem);
          break;

        case 'ward':
          addressMenuStore.setSelectedAddress({
            ...addressMenuStore.selectedAddress,
            ward: selectedItem,
          });
          break;

        default:
          break;
      }
    },
    [getAddressCode],
  );

  useEffect(() => {
    addressMenuStore.isResetAddress && onResetAddress();
  }, [onResetAddress]);

  return {
    listProvinces,
    listDistricts,
    listWards,
    provinceRef,
    districtRef,
    wardRef,
    onFocusDropdown,
    onSelectAddress,
    onResetAddress,
  };
};

export default useLogicAddressMenu;
