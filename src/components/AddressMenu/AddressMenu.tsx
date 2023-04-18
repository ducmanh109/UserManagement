import { Pressable, Text, View } from 'react-native';
import React, { useCallback } from 'react';
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
}

const AddressMenu: React.FC<PropsType> = ({ canResetAddress }) => {
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
        <>
          <Text>{`${addressMenuStore.selectedAddress.ward}, ${addressMenuStore.selectedAddress.district}, ${addressMenuStore.selectedAddress.province}`}</Text>
          <Pressable style={styles.btnReset} onPress={onToggleIsShowFilter}>
            <Text>Mở</Text>
          </Pressable>
        </>
      )}
      {/* </ScrollView> */}
      <View style={{ flexDirection: 'row' }}>
        {canResetAddress && (
          <Pressable style={styles.btnReset} onPress={() => onResetAddress()}>
            <Text style={styles.txtReset}>Đặt lại</Text>
          </Pressable>
        )}

        {isShowFilter && (
          <Pressable style={styles.btnReset} onPress={onToggleIsShowFilter}>
            <Text>Đóng</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default observer(AddressMenu);
