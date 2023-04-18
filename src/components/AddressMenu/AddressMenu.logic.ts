import { useCallback, useEffect, useRef, useState } from 'react';
import userStore from 'data/userStore/UserStore';
import SelectDropdown from 'react-native-select-dropdown';
import { AddressType } from 'data/address/address.type';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import { ScrollView } from 'react-native';
import CommonWidths from 'theme/CommonWidths';
// import listUserStore from 'data/userStore/ListUserStore';

//TODO fix bug when onFocusDropdown after selected value
const useLogicAddressMenu = () => {
  const [fieldIsFocusing, setFieldIsFocusing] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const [isShowFilter, setShowFilter] = useState(false);

  const addressData = userStore?.addressData;
  const listProvinces = addressData?.provinces?.map(item => item.name);
  const listDistricts = addressData?.districts?.map(item => item.name);
  const listWards = addressData?.wards?.map(item => item.name);

  const provinceRef = useRef<SelectDropdown>(null);
  const districtRef = useRef<SelectDropdown>(null);
  const wardRef = useRef<SelectDropdown>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const onToggleIsShowFilter = useCallback(() => {
    setShowFilter(value => !value);
  }, []);

  const onResetAddress = useCallback((type?: AddressType) => {
    if (type === 'ward') {
      wardRef.current?.reset();
      addressMenuStore.resetFilter(type);

      return;
    }
    if (type === 'district') {
      districtRef.current?.reset();
      wardRef.current?.reset();
      addressMenuStore.resetFilter(type);

      return;
    }

    provinceRef.current?.reset();
    districtRef.current?.reset();
    wardRef.current?.reset();

    addressMenuStore.resetFilter();
    // listUserStore.onGetListUser();
  }, []);

  const onFocusDropdown = useCallback(
    (type: AddressType) => {
      setFieldIsFocusing(type);

      switch (type) {
        case 'province':
          scrollViewRef?.current?.scrollTo({
            x: 0,
            y: 0,
            animated: true,
          });

          userStore.getListProvinces();
          break;
        case 'district':
          scrollViewRef?.current?.scrollTo({
            x: CommonWidths.windowWidth - 130 * 2,
            y: 0,
            animated: true,
          });

          userStore.getListDistricts(addressCode);

          break;
        case 'ward':
          scrollViewRef?.current?.scrollTo({
            x: CommonWidths.windowWidth,
            y: 0,
            animated: true,
          });

          userStore.getListWards(addressCode);
          break;
        default:
          break;
      }
    },
    [addressCode],
  );

  const onBlurDropdown = useCallback(() => {
    setFieldIsFocusing('');
  }, []);

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

          scrollViewRef?.current?.scrollTo({
            x: CommonWidths.windowWidth - 130 * 2,
            y: 0,
            animated: true,
          });
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

          scrollViewRef?.current?.scrollTo({
            x: CommonWidths.windowWidth,
            y: 0,
            animated: true,
          });
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

      // listUserStore.onGetListUser();
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
    fieldIsFocusing,
    scrollViewRef,
    onFocusDropdown,
    onSelectAddress,
    onResetAddress,
    onBlurDropdown,
    isShowFilter,
    onToggleIsShowFilter,
  };
};

export default useLogicAddressMenu;
