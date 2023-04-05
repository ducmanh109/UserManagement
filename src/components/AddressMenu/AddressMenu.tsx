/* eslint-disable import/default */
import { Button, View } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { observer } from 'mobx-react';
import useLogicAddressMenu from './AddressMenu.logic';
import { isEmpty } from 'lodash';

const AddressMenu = () => {
  const {
    listProvinces,
    listDistricts,
    listWards,
    provinceRef,
    districtRef,
    wardRef,
    onFocusDropdown,
    onSelectAddress,
    onResetAddress,
  } = useLogicAddressMenu();

  return (
    <View>
      <SelectDropdown
        ref={provinceRef}
        data={listProvinces}
        onSelect={(selectedItem: string) =>
          onSelectAddress('province', selectedItem)
        }
        onFocus={() => onFocusDropdown('province')}
        search
        defaultButtonText="Province"
      />

      <SelectDropdown
        ref={districtRef}
        data={listDistricts}
        onSelect={(selectedItem: string) =>
          onSelectAddress('district', selectedItem)
        }
        onFocus={() => onFocusDropdown('district')}
        search
        disabled={isEmpty(listProvinces)}
        defaultButtonText="District"
      />

      <SelectDropdown
        ref={wardRef}
        data={listWards}
        onSelect={(selectedItem: string) =>
          onSelectAddress('ward', selectedItem)
        }
        onFocus={() => onFocusDropdown('ward')}
        search
        disabled={isEmpty(listDistricts)}
        defaultButtonText="Ward"
      />

      <Button title="Reset" onPress={onResetAddress} />
    </View>
  );
};

export default observer(AddressMenu);
