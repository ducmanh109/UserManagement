/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RowInfo from 'components/RowInfo/RowInfo';
import Colors from 'theme/colors';
import { userRowInfo } from 'data/user/user.mockData';
import CommonFonts from 'theme/CommonFonts';
import CommonStyles from 'theme/CommonStyles';
import Header from 'components/Header/Header';
import Home from 'screens/Home/Home';
import { useNavigation, useRoute } from '@react-navigation/native';
import listUserStore from 'data/userStore/ListUserStore';
import { observer } from 'mobx-react';
import TimeMaintain from 'screens/Home/TimeMaintain';
import CollectMoney from 'screens/Home/CollectMoney';
import CommonHeights from 'theme/CommonHeights';

export const timeLocale = {
  minute: 'phút',
  hour: 'giờ',
  day: 'ngày',
  week: 'tuần',
  month: 'tháng',
  year: 'năm',
};

const UserDetail = () => {
  const route = useRoute<any>();

  const userInfo = route.params?.item;

  const navigation = useNavigation();

  const [isEdit, setEdit] = useState(false);

  const onUpdateSuccess = item => {
    setEdit(false);
    navigation.setParams({
      item,
    });
  };

  const onDeleteUser = (id: string) => {
    Alert.alert('Bạn có chắc chắn muốn xoá không?', '', [
      { style: 'cancel', text: 'Huỷ' },
      {
        onPress: () => {
          listUserStore.onDeleteUser(id, () => {
            navigation.goBack();
          });
        },
        text: 'Xoá',
        style: 'destructive',
      },
    ]);
  };

  const renderRightInfo = (key: any) => {
    switch (key) {
      case 'timeToRemind':
        if (userInfo['timeToRemind'])
          return new Date(userInfo?.timeToRemind).toLocaleString();
        return '';
      case 'repeatType':
        return timeLocale[userInfo['repeatType']];
      case 'timeToRemindMoney':
        if (userInfo['timeToRemindMoney'])
          return new Date(userInfo?.timeToRemindMoney).toLocaleString();
        return '';
      case 'repeatTypeMoney':
        return timeLocale[userInfo['repeatTypeMoney']];
      default:
        return userInfo[key];
    }
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Header
        rightHeader={
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() => {
                setEdit(value => !value);
              }}>
              <Text
                style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                {isEdit ? 'Huỷ sửa' : 'Sửa'}
              </Text>
            </Pressable>
            <View style={{ width: 20 }} />
            <Pressable onPress={() => onDeleteUser(userInfo.id)}>
              <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>
                Xoá
              </Text>
            </Pressable>
          </View>
        }
        canGoback
      />

      <View style={styles.container}>
        {isEdit ? (
          <Home onUpdateSuccess={onUpdateSuccess} userInfoParams={userInfo} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {userRowInfo.map(row => {
              switch (row.rightKey) {
                case 'time_maintain':
                  return (
                    <View
                      style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 8,
                        paddingHorizontal: 4,
                        marginBottom: 4,
                        paddingBottom: CommonHeights.res16,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          marginTop: 10,
                        }}
                        children="Số buổi hoàn thành:"
                      />

                      <TimeMaintain
                        setTimeMaintain={() => {}}
                        timeMaintain={userInfo.time_maintain}
                        isEdit={false}
                      />
                    </View>
                  );
                case 'collectMoneyType':
                  return (
                    <View
                      style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 8,
                        paddingHorizontal: 4,
                        marginBottom: 4,
                        paddingBottom: CommonHeights.res16,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          marginTop: 10,
                        }}
                        children="Thu tiền:"
                      />
                      <CollectMoney
                        onChangeCollectMoney={() => {}}
                        collectMoney={userInfo.collectMoneyType}
                        isEdit={false}
                      />
                    </View>
                  );
                default:
                  return (
                    <RowInfo
                      key={row.rightKey}
                      leftInfo={row.leftInfo}
                      rightInfo={renderRightInfo(row.rightKey)}
                    />
                  );
              }
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default observer(UserDetail);

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
