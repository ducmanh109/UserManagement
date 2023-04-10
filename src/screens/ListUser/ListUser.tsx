import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import useLogicListUser from './ListUser.logic';
import styles from './ListUser.styles';
import AddressMenu from 'components/AddressMenu/AddressMenu';
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { USER_INFO_TYPE } from 'api/user/user.type';

const ListUser = () => {
  const { users, isLoading, getListUser, navigateToUserDetail } =
    useLogicListUser();

  const renderItem = useCallback(
    ({ item }: { item: USER_INFO_TYPE }) => {
      return (
        <TouchableOpacity
          style={styles.wrapItem}
          onPress={() => navigateToUserDetail(item)}>
          <Text style={styles.txtItem}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.txtItem}>{item.phoneNumber}</Text>
          <Text style={styles.txtItem}>
            {item.ward}, {item.district}, {item.province}
          </Text>
        </TouchableOpacity>
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
    <SafeAreaView style={styles.container}>
      <AddressMenu canResetAddress={true} />

      <View style={styles.wrapTitle}>
        <Text style={styles.txtTitle}>Họ tên</Text>
        <Text style={styles.txtTitle}>SĐT</Text>
        <Text style={styles.txtTitle}>Địa chỉ</Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderItem}
        refreshControl={refreshControl}
        style={styles.list}
        ListEmptyComponent={ListEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default observer(ListUser);
