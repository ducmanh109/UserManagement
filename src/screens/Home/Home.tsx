/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { observer } from 'mobx-react';
import styles from './Home.styles';
import useLogicHome from './Home.logic';
import AddressMenu from 'components/AddressMenu/AddressMenu';
import CommonStyles from 'theme/CommonStyles';
import Colors from 'theme/colors';
import { USER_INFO_TYPE } from 'api/user/user.type';
import TimeMaintain from './TimeMaintain';
import SelectDateMaintain from './SelectDateMaintain';
import CollectMoney from './CollectMoney';

const Home = ({
  userInfoParams,
  onUpdateSuccess,
}: {
  userInfoParams?: USER_INFO_TYPE;
  onUpdateSuccess: any;
}) => {
  const {
    userInfo,
    disableSubmitBtn,
    selectedDate,
    onChangeTextInfo,
    onSubmit,
    onSelectRepeatType,
    onSelectRepeatTypeMoney,
    selectedDateMoney,
    onChangeDatePicker,
    onChangeDatePickerMoney,
  } = useLogicHome(userInfoParams, onUpdateSuccess);
  console.log('userInfoParams', userInfoParams);
  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={styles.container}>
        {!userInfoParams && (
          <Text style={styles.txtTitle}>Thông tin khách hàng</Text>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.wrapForm}>
          <Text style={styles.title} children="Tên:" />
          <TextInput
            style={[
              styles.input,
              { borderColor: !userInfo.name ? 'red' : 'black' },
            ]}
            placeholder="Tên đệm & tên"
            onChangeText={onChangeTextInfo('name')}
            value={userInfo.name}
          />

          <Text style={styles.title} children="Số điện thoại:" />
          <TextInput
            style={[
              styles.input,
              { borderColor: !userInfo.phoneNumber ? 'red' : 'black' },
            ]}
            placeholder="Số điện thoại"
            onChangeText={onChangeTextInfo('phoneNumber')}
            value={userInfo.phoneNumber}
            keyboardType="numeric"
          />

          <Text style={styles.title} children="Địa chỉ cụ thể:" />
          <TextInput
            style={[
              styles.input,
              { borderColor: !userInfo.detailAddress ? 'red' : 'black' },
            ]}
            placeholder="Địa chỉ cụ thể, số nhà, tên đường,..."
            onChangeText={onChangeTextInfo('detailAddress')}
            value={userInfo.detailAddress}
          />

          <Text style={styles.title} children="Số buổi hoàn thành:" />
          <TimeMaintain
            setTimeMaintain={onChangeTextInfo('time_maintain')}
            timeMaintain={userInfo.time_maintain}
            isEdit={true}
          />

          <Text style={styles.title} children="Ghi chú:" />
          <TextInput
            style={[
              styles.inputArea,
              { borderColor: !userInfo.note ? 'red' : 'black' },
            ]}
            placeholder="Ghi chú..."
            onChangeText={onChangeTextInfo('note')}
            value={userInfo.note}
            multiline={true}
          />

          <View style={{ paddingVertical: 8 }}>
            <AddressMenu
              province={userInfoParams?.province}
              district={userInfoParams?.district}
              ward={userInfoParams?.ward}
              canResetAddress={false}
            />
          </View>

          <CollectMoney
            onChangeCollectMoney={onChangeTextInfo('collectMoneyType')}
            collectMoney={userInfo.collectMoneyType}
            isEdit={true}
          />

          <SelectDateMaintain
            onSelectRepeatType={onSelectRepeatType}
            repeatType={userInfo.repeatType}
            selectedDate={selectedDate}
            initialRepeatType={userInfoParams?.repeatType}
            type="maintain"
            onChangeDatePicker={onChangeDatePicker}
          />

          <SelectDateMaintain
            onSelectRepeatType={onSelectRepeatTypeMoney}
            repeatType={userInfo.repeatTypeMoney}
            selectedDate={selectedDateMoney}
            initialRepeatType={userInfoParams?.repeatTypeMoney}
            type="money"
            onChangeDatePicker={onChangeDatePickerMoney}
          />

          <Pressable
            disabled={disableSubmitBtn}
            onPress={onSubmit}
            style={{
              ...styles.btnSubmit,
              backgroundColor: disableSubmitBtn
                ? Colors.disabled
                : Colors.mainColor,
            }}>
            <Text
              style={{
                ...styles.txtSubmit,
                color: disableSubmitBtn ? Colors.black : Colors.white,
              }}>
              {userInfoParams ? 'Sửa' : 'Tạo'}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default observer(Home);
