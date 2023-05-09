/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { View, Text, FlatList, RefreshControl, Pressable } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import useLogicListUser from './ListUser.logic';
import styles from './ListUser.styles';
import AddressMenu from 'components/AddressMenu/AddressMenu';
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { USER_INFO_TYPE } from 'api/user/user.type';
import { onCreateNewExcel } from 'services/CreateFileExel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from 'theme/colors';

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

const ListUser = () => {
  const { users, isLoading, getListUser, navigateToUserDetail } =
    useLogicListUser();

  const renderItem = useCallback(
    ({ item }: { item: USER_INFO_TYPE }) => {
      return (
        <ItemUser item={item} navigateToUserDetail={navigateToUserDetail} />
      );
    },
    [navigateToUserDetail],
  );

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={isLoading} onRefresh={getListUser} />;
  }, [getListUser, isLoading]);

  const ListEmptyComponent = useCallback(() => {
    return <Text style={styles.txtNoData}>Không có dữ liệu</Text>;
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{`Tổng số khách hàng: ${users.length}`}</Text>
          <Pressable onPress={() => onCreateNewExcel(users)}>
            <FontAwesome name="download" size={30} color={Colors.blue} />
          </Pressable>
        </View>

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
    </View>
  );
};

export default observer(ListUser);
