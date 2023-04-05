import { action, makeObservable, observable } from 'mobx';

class AddressMenuStore {
  selectedAddress: {
    province: string;
    district: string;
    ward: string;
  } = {
    province: '',
    district: '',
    ward: '',
  };
  isResetAddress: boolean = false;

  constructor() {
    makeObservable(this, {
      selectedAddress: observable,
      isResetAddress: observable,

      setSelectedAddress: action,
      setIsResetAddress: action,
      resetFilter: action,
    });
  }

  setSelectedAddress(address: any) {
    this.selectedAddress = address;
  }

  setIsResetAddress(value: boolean) {
    this.isResetAddress = value;
  }

  resetFilter() {
    this.selectedAddress.province = '';
    this.selectedAddress.district = '';
    this.selectedAddress.ward = '';
  }
}

const addressMenuStore = new AddressMenuStore();
export default addressMenuStore;
