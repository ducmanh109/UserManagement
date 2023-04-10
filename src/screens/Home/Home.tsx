import {
  Pressable,
  SafeAreaView,
  ScrollView,
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
import { repeatNotificationType } from 'data/user/user.mockData';

const Home = () => {
  const {
    userInfo,
    disableSubmitBtn,
    showDatePicker,
    showTimePicker,
    selectedDate,
    defaultTimePicker,
    formatSelectedDate,
    formatSelectedTime,
    onChangeTextInfo,
    onSubmit,
    onShowDatePicker,
    onShowTimePicker,
    onChangeDatePicker,
    onChangeTimePicker,
    onSelectRepeatType,
  } = useLogicHome();

  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={styles.container}>
        <Text style={styles.txtTitle}>Thông tin khách hàng</Text>

        <ScrollView style={styles.wrapForm}>
          <TextInput
            style={styles.input}
            placeholder="Họ"
            onChangeText={onChangeTextInfo('firstName')}
            value={userInfo.firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên đệm & tên"
            onChangeText={onChangeTextInfo('lastName')}
            value={userInfo.lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            onChangeText={onChangeTextInfo('phoneNumber')}
            value={userInfo.phoneNumber}
            keyboardType="numeric"
          />

          <AddressMenu canResetAddress={false} />

          <TextInput
            style={styles.input}
            placeholder="Địa chỉ cụ thể, số nhà, tên đường,..."
            onChangeText={onChangeTextInfo('detailAddress')}
            value={userInfo.detailAddress}
          />

          {/* date,time picker,repeat type */}
          <View style={styles.wrapDateTime}>
            <TouchableOpacity
              style={styles.btnDatePicker}
              onPress={onShowDatePicker}>
              <Text>{formatSelectedDate}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnDatePicker}
              onPress={onShowTimePicker}>
              <Text>{formatSelectedTime}</Text>
            </TouchableOpacity>

            <SelectDropdown
              data={repeatNotificationType}
              onSelect={onSelectRepeatType}
              buttonStyle={styles.btnDatePicker}
              defaultButtonText="Lịch nhắc"
              buttonTextStyle={styles.txtTypeRepeat}
            />
          </View>

          {showDatePicker && (
            <RNDateTimePicker
              value={selectedDate}
              mode="date"
              onChange={onChangeDatePicker}
              display="spinner"
            />
          )}

          {showTimePicker && (
            <RNDateTimePicker
              value={defaultTimePicker}
              mode="time"
              onChange={onChangeTimePicker}
              display="spinner"
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
              Tạo
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default observer(Home);
