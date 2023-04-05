import { View, Text, FlatList, RefreshControl, Button } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import useLogicListUser from './ListUser.logic';
import styles from './ListUser.styles';
import AddressMenu from 'components/AddressMenu/AddressMenu';

const ListUser = () => {
  const { users, isLoading, getListUser } = useLogicListUser();

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View style={styles.wrapItem}>
        <Text>
          {item.firstName} {item.lastName}
        </Text>
        <Text>{item.district}</Text>
        <Text>{item.province}</Text>
      </View>
    );
  }, []);

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={isLoading} onRefresh={getListUser} />;
  }, [getListUser, isLoading]);

  return (
    <View>
      <AddressMenu />

      <Button title="Confirm" onPress={getListUser} />

      <View style={styles.wrapItem}>
        <Text>Full Name</Text>
        <Text>Street</Text>
        <Text>District</Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderItem}
        refreshControl={refreshControl}
        ListEmptyComponent={() => (
          <View>
            <Text>No Data</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListUser;
