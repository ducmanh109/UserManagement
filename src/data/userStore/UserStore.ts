import { action, flow, makeObservable, observable } from 'mobx';
import firestore from '@react-native-firebase/firestore';
import { AxiosResponse } from 'axios';
import {
  getListDistrictsAPI,
  getListProvincesAPI,
  getListWardsAPI,
} from 'api/user/user.api';
import { CREATE_USER_STATUS } from 'api/user/user.type';
import { showMessage } from 'react-native-flash-message';

class UserStore {
  addressData: {
    provinces: any[];
    districts: any[];
    wards: any[];
  } = {
    provinces: [],
    districts: [],
    wards: [],
  };
  createUserStatus: string = '';
  timeToRemind?: Date | null = null;

  constructor() {
    makeObservable(this, {
      addressData: observable,
      createUserStatus: observable,
      timeToRemind: observable,

      setAddressData: action,
      setCreateUserStatus: action,
      setTimeToRemind: action,

      onCreateUser: flow,
      getListProvinces: flow,
      getListDistricts: flow,
      getListWards: flow,
    });
  }

  setAddressData(
    addressData: {
      provinces: string[];
      districts: string[];
      wards: string[];
    } = {
      provinces: [],
      districts: [],
      wards: [],
    },
  ) {
    this.addressData = addressData;
  }

  setCreateUserStatus(status: string) {
    this.createUserStatus = status;

    console.log('this.createUserStatus', this.createUserStatus);
  }

  setTimeToRemind(time?: Date | null) {
    this.timeToRemind = time;
  }

  *onCreateUser(data: any) {
    try {
      firestore()
        .collection('Users')
        .add(data)
        .then(() => {
          this.setCreateUserStatus(CREATE_USER_STATUS.SUCCESS);

          showMessage({
            message: 'Tạo thông tin khách hàng thành công',
            type: 'success',
            animated: true,
            duration: 1500,
            hideStatusBar: true,
            floating: true,
            icon: 'success',
          });
        });
    } catch (error) {
      this.setCreateUserStatus(CREATE_USER_STATUS.FAIL);

      console.log('Add New User Fail With Error', error);
    }
  }

  *getListProvinces() {
    try {
      const response: AxiosResponse<any> = yield getListProvincesAPI();

      const addressData = {
        provinces: response?.data,
        districts: this.addressData.districts,
        wards: this.addressData.wards,
      };

      this.setAddressData(addressData);
    } catch (error) {
      console.log('Get List Province Fail With Error', error);
    }
  }

  *getListDistricts(province_code: string) {
    try {
      const response: AxiosResponse<any> = yield getListDistrictsAPI(
        province_code,
      );

      const addressData = {
        provinces: this.addressData.provinces,
        districts: response?.data?.districts,
        wards: this.addressData.wards,
      };

      this.setAddressData(addressData);
    } catch (error) {
      console.log('Get List Districts Fail With Error', error);
    }
  }

  *getListWards(district_code: string) {
    try {
      const response: AxiosResponse<any> = yield getListWardsAPI(district_code);

      const addressData = {
        provinces: this.addressData.provinces,
        districts: this.addressData.districts,
        wards: response?.data?.wards,
      };

      this.setAddressData(addressData);
    } catch (error) {
      console.log('Get List Wards Fail With Error', error);
    }
  }
}

const userStore = new UserStore();
export default userStore;
