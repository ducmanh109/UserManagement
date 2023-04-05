import { action, flow, makeObservable, observable } from 'mobx';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { AxiosResponse } from 'axios';
import {
  getListDistrictsAPI,
  getListProvincesAPI,
  getListWardsAPI,
} from 'api/user/user.api';
import { CREATE_USER_STATUS } from 'api/user/user.type';

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

  constructor() {
    makeObservable(this, {
      addressData: observable,
      createUserStatus: observable,

      setAddressData: action,
      setCreateUserStatus: action,

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

  *onCreateUser(data: any) {
    try {
      firestore()
        .collection('Users')
        .add(data)
        .then(() => {
          this.setCreateUserStatus(CREATE_USER_STATUS.SUCCESS);
          Alert.alert('Added new user');
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