/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { observer } from 'mobx-react';
import styles from './Home.styles';
import useLogicHome from './Home.logic';
import AddressMenu from 'components/AddressMenu/AddressMenu';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import CommonStyles from 'theme/CommonStyles';
import Colors from 'theme/colors';
import SelectDropdown from 'react-native-select-dropdown';
import { USER_INFO_TYPE } from 'api/user/user.type';

const valuePicker = [
  { value: 'minute', text: 'phút' },
  { value: 'hour', text: 'giờ' },
  { value: 'day', text: 'ngày' },
  { value: 'week', text: 'tuần' },
  { value: 'month', text: 'tháng' },
  { value: 'year', text: 'năm' },
];

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
    showDatePicker,
    showTimePicker,
    selectedDate,
    formatSelectedDate,
    formatSelectedTime,
    onChangeTextInfo,
    onSubmit,
    onShowDatePicker,
    onShowTimePicker,
    onChangeDatePicker,
    onSelectRepeatType,
    onClosePickTime,
  } = useLogicHome(userInfoParams, onUpdateSuccess);

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
          <TextInput
            style={[
              styles.input,
              { borderColor: !userInfo.time_maintain ? 'red' : 'black' },
            ]}
            placeholder="Số buổi hoàn thành..."
            onChangeText={onChangeTextInfo('time_maintain')}
            value={userInfo.time_maintain}
            keyboardType="numeric"
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

          <AddressMenu canResetAddress={false} />

          {/* date,time picker,repeat type */}
          <View style={styles.wrapDateTime}>
            <TouchableOpacity
              style={[
                styles.btnDatePicker,
                { backgroundColor: showDatePicker ? 'lightgreen' : 'white' },
              ]}
              onPress={onShowDatePicker}>
              <Text>{formatSelectedDate}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btnDatePicker,
                { backgroundColor: showTimePicker ? 'lightgreen' : 'white' },
              ]}
              onPress={onShowTimePicker}>
              <Text>{formatSelectedTime}</Text>
            </TouchableOpacity>

            <SelectDropdown
              data={valuePicker}
              onSelect={onSelectRepeatType}
              buttonStyle={styles.btnDatePicker}
              defaultButtonText="Lịch nhắc"
              buttonTextStyle={styles.txtTypeRepeat}
              defaultValue={
                userInfoParams?.repeatType
                  ? valuePicker.find(
                      item => item.value === userInfoParams?.repeatType,
                    )
                  : { value: 'month', text: 'tháng' }
              }
              buttonTextAfterSelection={selectedItem => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.text;
              }}
              rowTextForSelection={item => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.text;
              }}
            />
          </View>

          {showDatePicker && (
            <RNDateTimePicker
              value={selectedDate}
              mode="date"
              onChange={onChangeDatePicker}
              display="inline"
              locale="vi"
            />
          )}

          {showTimePicker && (
            <RNDateTimePicker
              value={selectedDate}
              mode="time"
              onChange={onChangeDatePicker}
              display="spinner"
              locale="vi"
            />
          )}

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
