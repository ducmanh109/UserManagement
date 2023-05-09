/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { observer } from 'mobx-react';
import useLogicAddressMenu from './AddressMenu.logic';
import styles from './AddressMenu.styles';
import Colors from 'theme/colors';
import { AddressType } from 'data/address/address.type';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PropsType {
  canResetAddress?: boolean;
  province?: any;
  district?: any;
  ward?: any;
}

const AddressMenu: React.FC<PropsType> = ({
  canResetAddress,
  province,
  district,
  ward,
}) => {
  const {
    listProvinces,
    listDistricts,
    listWards,
    provinceRef,
    districtRef,
    wardRef,
    fieldIsFocusing,
    onFocusDropdown,
    onSelectAddress,
    onResetAddress,
    onBlurDropdown,
    isShowFilter,
    onToggleIsShowFilter,
  } = useLogicAddressMenu();
  console.log(
    'addressMenuStore.selectedAddress',
    addressMenuStore.selectedAddress,
  );
  useEffect(() => {
    addressMenuStore.setSelectedAddress({
      ...addressMenuStore.selectedAddress,
      province: province ?? addressMenuStore.selectedAddress.province,
      district: district ?? addressMenuStore.selectedAddress.district,
      ward: ward ?? addressMenuStore.selectedAddress.ward,
    });
  }, []);

  const renderSearchInputRightIcon = useCallback(
    (type: AddressType) => {
      return (
        <Ionicons
          name="ios-reload"
          size={20}
          onPress={() => onResetAddress(type)}
        />
      );
    },
    [onResetAddress],
  );

  return (
    <View>
      {/* <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}> */}
      {isShowFilter ? (
        <>
          <SelectDropdown
            ref={provinceRef}
            data={listProvinces}
            onSelect={(selectedItem: string) =>
              onSelectAddress('province', selectedItem)
            }
            onFocus={() => onFocusDropdown('province')}
            onBlur={onBlurDropdown}
            search
            defaultButtonText="Thành phố/Tỉnh"
            buttonStyle={{
              ...styles.btnDropdown,
              backgroundColor:
                fieldIsFocusing === 'province'
                  ? Colors.mainColor
                  : Colors.coldLight,
            }}
            buttonTextStyle={styles.txtSelected}
            renderSearchInputRightIcon={() =>
              renderSearchInputRightIcon('province')
            }
          />

          <SelectDropdown
            ref={districtRef}
            data={listDistricts}
            onSelect={(selectedItem: string) =>
              onSelectAddress('district', selectedItem)
            }
            onFocus={() => onFocusDropdown('district')}
            onBlur={onBlurDropdown}
            search
            disabled={!addressMenuStore.selectedAddress.province}
            defaultButtonText="Quận/Huyện"
            buttonStyle={{
              ...styles.btnDropdown,
              backgroundColor:
                fieldIsFocusing === 'district'
                  ? Colors.mainColor
                  : Colors.coldLight,
            }}
            buttonTextStyle={styles.txtSelected}
            renderSearchInputRightIcon={() =>
              renderSearchInputRightIcon('district')
            }
          />

          <SelectDropdown
            ref={wardRef}
            data={listWards}
            onSelect={(selectedItem: string) =>
              onSelectAddress('ward', selectedItem)
            }
            onFocus={() => onFocusDropdown('ward')}
            onBlur={onBlurDropdown}
            search
            disabled={!addressMenuStore.selectedAddress.district}
            defaultButtonText="Phường/Xã"
            buttonStyle={{
              ...styles.btnDropdown,
              backgroundColor:
                fieldIsFocusing === 'ward'
                  ? Colors.mainColor
                  : Colors.coldLight,
            }}
            buttonTextStyle={styles.txtSelected}
            renderSearchInputRightIcon={() =>
              renderSearchInputRightIcon('ward')
            }
          />
        </>
      ) : (
        <TouchableOpacity onPress={onToggleIsShowFilter}>
          <>
            {!addressMenuStore?.selectedAddress?.province ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: 'blue',
                }}>
                Chưa chọn địa chỉ:
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: 'blue',
                }}>{`${addressMenuStore.selectedAddress.ward}, ${addressMenuStore.selectedAddress.district}, ${addressMenuStore.selectedAddress.province}`}</Text>
            )}
          </>
        </TouchableOpacity>
      )}
      {/* </ScrollView> */}
      <View style={{ flexDirection: 'row' }}>
        {isShowFilter && (
          <>
            {canResetAddress && (
              <Pressable
                style={styles.btnReset}
                onPress={onResetAddress as any}>
                <Text style={styles.txtReset}>Đặt lại</Text>
              </Pressable>
            )}

            <Pressable style={styles.btnReset} onPress={onToggleIsShowFilter}>
              <Text>Đóng</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default observer(AddressMenu);
