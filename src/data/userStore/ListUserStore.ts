import { action, flow, makeObservable, observable } from 'mobx';
import firestore from '@react-native-firebase/firestore';
import { AxiosResponse } from 'axios';
import { showMessage } from 'react-native-flash-message';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

class ListUserStore {
  collectionUser = firestore().collection('Users');
  listUser: any[];

  constructor() {
    this.listUser = [];
    makeObservable(this, {
      listUser: observable,
      onCreateUser: flow,
      onGetListUser: flow,
      onDeleteUser: flow,
      onUpdateUser: flow,
    });
  }

  async onGetListUser() {
    try {
      // const { ward, province, district } = addressMenuStore.selectedAddress;

      // let response: any;
      const newList: any = [];

      // if (!ward) {
      const response = await this.collectionUser.get();
      // }

      // if (province.length > 0) {
      //   response = await this.collectionUser
      //     .where('province', '==', province)
      //     .get();
      // }

      // if (district) {
      //   response = await this.collectionUser
      //     .where('province', '==', province)
      //     .where('district', '==', district)
      //     .get();
      // }

      // if (ward) {
      //   response = await this.collectionUser
      //     .where('province', '==', province)
      //     .where('district', '==', district)
      //     .where('ward', '==', ward)
      //     .get();
      // }

      response.forEach((user: any) => {
        console.log('useruser', user.id);
        newList.push({ ...user.data(), id: user.id });
      });
      console.log('newList', newList);

      this.listUser = newList;

      return newList;
    } catch (error) {
      console.log('onGetListUser Error', error);
    }
  }

  *onCreateUser(data: any) {
    try {
      this.collectionUser.add(data).then(() => {
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
      console.log('Add New User Fail With Error', error);
    }
  }

  *onDeleteUser(id: any) {
    try {
      this.collectionUser
        .doc(id)
        .delete()
        .then(() => {
          this.onGetListUser();
        });
    } catch (error) {
      console.log('Add New User Fail With Error', error);
    }
  }

  *onUpdateUser(id: any, data: any) {
    try {
      this.collectionUser.doc(id).update({
        scheduledTime: data,
      });
    } catch (error) {
      console.log('Add New User Fail With Error', error);
    }
  }
}

const listUserStore = new ListUserStore();

export default listUserStore;
