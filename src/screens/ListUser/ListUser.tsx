/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { View, Text, FlatList, RefreshControl, Pressable } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import useLogicListUser from './ListUser.logic';
import styles from './ListUser.styles';
import AddressMenu from 'components/AddressMenu/AddressMenu';
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { USER_INFO_TYPE } from 'api/user/user.type';
import notificationService from 'services/NotificaionService';
import PushNotification from 'react-native-push-notification';

const timeLocale = {
  minute: 'phút',
  hour: 'giờ',
  day: 'ngày',
  week: 'tuần',
  month: 'tháng',
  year: 'năm',
};

const RenderRowInfo = ({ field, value }: { field: string; value: string }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
      <Text style={styles.txtItem}>{field}: </Text>
      <Text
        style={[
          styles.txtItem,
          { fontWeight: 'bold', fontSize: 16, width: '85%' },
        ]}>
        {value}
      </Text>
    </View>
  );
};

const ItemUser = memo(
  ({
    item,
    navigateToUserDetail,
    onDeleteUser,
  }: {
    item: USER_INFO_TYPE;
    navigateToUserDetail: any;
    onDeleteUser: any;
  }) => {
    useEffect(() => {
      notificationService.addScheduleNotifications({ userDetail: item });

      PushNotification.getScheduledLocalNotifications(listScheduledNoti => {
        console.log(
          '<<<<<<<<<<<,,>>>>>>>>>>>',
          listScheduledNoti.length,
          listScheduledNoti,
        );
      });
    }, [item]);

    return (
      <View
        style={{
          paddingBottom: 5,
          backgroundColor: 'lightblue',
          marginBottom: 6,
          borderRadius: 8,
          padding: 8,
        }}>
        <RenderRowInfo field="Tên" value={`${item?.name}`} />

        <RenderRowInfo field="Tỉnh" value={`${item?.province}`} />

        <RenderRowInfo
          field="Quận/Huyện/Thành Phố"
          value={`${item?.district}`}
        />

        <RenderRowInfo field="Phường Xã" value={`${item?.ward}`} />

        <RenderRowInfo
          field="Địa chỉ chi tiết"
          value={`${item?.detailAddress}`}
        />

        <RenderRowInfo
          field="Thời gian"
          value={`${item?.timeToRemind?.toDate?.()?.toLocaleString()}`}
        />

        <RenderRowInfo
          field="Lịch nhắc"
          value={`${timeLocale[item?.repeatType]}`}
        />

        <View style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={() => onDeleteUser(item.id)}
            style={{
              marginTop: 20,
              marginRight: 8,
              paddingVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 20,
              borderRadius: 6,
              borderColor: 'red',
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.txtItem, { color: 'white' }]}>Xoá</Text>
          </Pressable>

          <Pressable
            onPress={() => navigateToUserDetail(item)}
            style={{
              marginTop: 20,
              marginRight: 8,
              paddingVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 20,
              borderRadius: 6,
              borderColor: 'lightgreen',
              backgroundColor: 'lightgreen',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.txtItem, { color: 'black' }]}>Chi tiết</Text>
          </Pressable>
        </View>
      </View>
    );
  },
);

const ListUser = () => {
  const { users, isLoading, getListUser, navigateToUserDetail, onDeleteUser } =
    useLogicListUser();

  const renderItem = useCallback(
    ({ item }: { item: USER_INFO_TYPE }) => {
      return (
        <ItemUser
          item={item}
          navigateToUserDetail={navigateToUserDetail}
          onDeleteUser={onDeleteUser}
        />
      );
    },
    [navigateToUserDetail, onDeleteUser],
  );

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={isLoading} onRefresh={getListUser} />;
  }, [getListUser, isLoading]);

  const ListEmptyComponent = useCallback(() => {
    return <Text style={styles.txtNoData}>Không có dữ liệu</Text>;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <AddressMenu canResetAddress={true} />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={users}
          renderItem={renderItem}
          refreshControl={refreshControl}
          style={styles.list}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(ListUser);
