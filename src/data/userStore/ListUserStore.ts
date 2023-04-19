import { action, flow, makeObservable, observable } from 'mobx';
import { showMessage } from 'react-native-flash-message';
import database from '@react-native-firebase/database';
import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
import notificationService from 'services/NotificaionService';

class ListUserStore {
  refUser = database().ref('Users');
  listUser: any[];

  constructor() {
    this.listUser = [];
    makeObservable(this, {
      listUser: observable,

      setListUser: action,
      onCreateUser: flow,
      onGetListUser: flow,
      onDeleteUser: flow,
      onUpdateUser: flow,
    });
  }

  setListUser(newList: any) {
    this.listUser = newList;
  }

  async onGetListUser() {
    try {
      const snapshot = await this.refUser.once('value');

      const userList = snapshot.val();
      const newList = userList
        ? Object.entries(userList).map(([id, value]) => ({ id, ...value }))
        : [];

      this.listUser = newList;

      setTimeout(() => {
        PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
          console.log(
            '<<<<<<<<<<<,,>>>>>>>>>>>',
            listScheduledNoti.length,
            listScheduledNoti.map(item => ({
              ...item,
              date: new Date(item.date).toLocaleString(),
            })),
          );
        });
      }, 5000);

      return newList;
    } catch (error) {
      console.log('onGetListUser Error', error);
    }
  }

  *onCreateUser(data: any) {
    try {
      this.refUser.push(data).then(() => {
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

  *onDeleteUser(id: any, onDeleteSuccess: any) {
    try {
      this.refUser
        .child(id)
        .remove()
        .then(() => {
          Alert.alert('Xoá thành công');
          onDeleteSuccess && onDeleteSuccess();
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (error) {
      console.log('onDeleteUser Fail With Error', error);
    }
  }

  *onUpdateUser(id: any, data: any, onUpdateSuccess?: any) {
    try {
      this.refUser
        .child(id)
        .update(data)
        .then(() => {
          // notificationService.editScheduledNotifications({
          //   userDetail: data,
          // });
          Alert.alert('Sửa thành công');
        });
      onUpdateSuccess && onUpdateSuccess(data);
    } catch (error) {
      console.log('Add New User Fail With Error', error);
    }
  }
}

const listUserStore = new ListUserStore();

export default listUserStore;
