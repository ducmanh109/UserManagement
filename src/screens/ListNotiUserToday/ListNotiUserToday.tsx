/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { View, Text, FlatList, Pressable } from 'react-native';
import React, { memo, useCallback } from 'react';
import useLogicListUser from './ListNotiUserTodaylogic';
import styles from './ListNotiUserToday.styles';
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { USER_INFO_TYPE } from 'api/user/user.type';

const RenderRowInfo = ({ field, value }: { field: string; value: string }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
      <Text style={styles.txtItem}>{field}: </Text>
      <Text
        numberOfLines={1}
        style={[
          styles.txtItem,
          { fontWeight: 'bold', fontSize: 16, width: '70%' },
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
  }: {
    item: USER_INFO_TYPE;
    navigateToUserDetail: any;
  }) => {
    return (
      <Pressable onPress={() => navigateToUserDetail(item)}>
        <View
          style={{
            paddingBottom: 5,
            backgroundColor: 'lightblue',
            marginBottom: 6,
            borderRadius: 8,
            padding: 8,
          }}>
          <RenderRowInfo field="Tên" value={`${item?.name}`} />

          <RenderRowInfo
            field="Tỉnh-Quận/Huyện/Thành Phố-Phường Xã"
            value={``}
          />

          <Text
            numberOfLines={2}
            style={[
              styles.txtItem,
              { fontWeight: 'bold', fontSize: 16, width: '100%' },
            ]}>
            {`${item?.province} - ${item?.district} - ${item?.ward}`}
          </Text>

          {/* <RenderRowInfo
          field="Quận/Huyện/Thành Phố"
          value={`${item?.district}`}
        />

        <RenderRowInfo field="Phường Xã" value={`${item?.ward}`} /> */}

          <RenderRowInfo
            field="Địa chỉ chi tiết"
            value={`${item?.detailAddress}`}
          />

          <RenderRowInfo
            field="Thời gian bắt đầu nhắc"
            value={`${new Date(item?.timeToRemind).toLocaleString()}`}
          />

          {/* <RenderRowInfo
            field="Lịch nhắc"
            value={`${timeLocale[item?.repeatType]}`}
          /> */}
        </View>
      </Pressable>
    );
  },
);

const ListNotiUserToday = () => {
  const { users, navigateToUserDetail } = useLogicListUser();

  const renderItem = useCallback(
    ({ item }: { item: USER_INFO_TYPE }) => {
      return (
        <ItemUser item={item} navigateToUserDetail={navigateToUserDetail} />
      );
    },
    [navigateToUserDetail],
  );

  const ListEmptyComponent = useCallback(() => {
    return <Text style={styles.txtNoData}>Không có dữ liệu</Text>;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={users}
          renderItem={renderItem}
          style={styles.list}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(ListNotiUserToday);
