import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import useLogicListUser from './ListUser.logic';
import styles from './ListUser.styles';
import AddressMenu from 'components/AddressMenu/AddressMenu';
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView>
      <AddressMenu />

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
    </SafeAreaView>
  );
};

export default observer(ListUser);
