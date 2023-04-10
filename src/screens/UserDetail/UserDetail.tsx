import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RowInfo from 'components/RowInfo/RowInfo';
import Colors from 'theme/colors';
import useLogicUserDetail from './UserDetail.logic';
import { userRowInfo } from 'data/user/user.mockData';
import CommonFonts from 'theme/CommonFonts';
import CommonStyles from 'theme/CommonStyles';
import Header from 'components/Header/Header';

const UserDetail = () => {
  const { userInfo } = useLogicUserDetail();

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Header canGoback />

      <View style={styles.container}>
        <Text style={styles.txtTitle}>Thông tin chi tiết của khách hàng</Text>

        <ScrollView>
          {userRowInfo.map(row => {
            return (
              <RowInfo
                key={row.rightKey}
                leftInfo={row.leftInfo}
                rightInfo={userInfo[row.rightKey]}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  txtTitle: {
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: CommonFonts.res15,
  },
});
