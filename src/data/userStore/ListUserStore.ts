import { action, flow, makeObservable, observable } from 'mobx';
import { showMessage } from 'react-native-flash-message';
import database from '@react-native-firebase/database';
import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
import notificationService from 'services/NotificaionService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { USER_INFO_TYPE } from 'api/user/user.type';

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
    PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
      PushNotificationIOS.removePendingNotificationRequests(
        listScheduledNoti.map(scheduledLocal => scheduledLocal.id),
      );
    });

    if (newList?.length) {
      newList.map((item: any) => {
        notificationService.syncScheduleNotifications({ userDetail: item });
      });
    }

    setTimeout(() => {
      PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
        console.log('listScheduledNoti', listScheduledNoti);
      });
    }, 5000);
  }

  async onGetListUser() {
    try {
      const snapshot = await this.refUser.once('value');

      const userList = snapshot.val();
      const newList = userList
        ? Object.entries(userList).map(([id, value]) => ({ id, ...value }))
        : [];

      this.setListUser(newList);

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
    console.log('datadata', data);
    try {
      this.refUser
        .child(id)
        .update(data)
        .then(() => {
          Alert.alert('Sửa thành công');
        });
      onUpdateSuccess && onUpdateSuccess(data);
    } catch (error) {
      console.log('onUpdateUser Fail With Error', error);
    }
  }
}

const listUserStore = new ListUserStore();

export default listUserStore;
