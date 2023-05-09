/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { View, Text, FlatList, Pressable } from 'react-native';
import React, { memo, useCallback } from 'react';
import useLogicListUser from './ListNotiUserCollectMoneyTodaylogic';
import styles from './ListNotiUserCollectMoneyToday.styles';
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { USER_INFO_TYPE } from 'api/user/user.type';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

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

          <RenderRowInfo
            field="Địa chỉ chi tiết"
            value={`${item?.detailAddress}`}
          />

          <RenderRowInfo
            field="Thời gian bắt đầu nhắc"
            value={`${new Date(item?.timeToRemind).toLocaleString()}`}
          />
        </View>
      </Pressable>
    );
  },
);

const ListNotiUserToday = () => {
  const {
    users,
    navigateToUserDetail,
    dateSelected,
    showDatePicker,
    setShowDatePicker,
    onSelectDate,
  } = useLogicListUser();

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
        <View style={{ paddingHorizontal: 16 }}>
          <Text>{`Tổng số khách hàng cần thu tiền hôm nay: ${users.length}`}</Text>
          <Pressable
            onPress={() => {
              setShowDatePicker(value => !value);
            }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: 'blue' }}>
              {format(dateSelected, 'dd/MM/yyyy')}
            </Text>
            {showDatePicker && (
              <RNDateTimePicker
                value={dateSelected}
                mode="date"
                onChange={onSelectDate}
                display="inline"
                locale="vi"
              />
            )}
          </Pressable>
        </View>

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
