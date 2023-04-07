/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { observer } from 'mobx-react';
import styles from './Home.styles';
import useLogicHome from './Home.logic';
import AddressMenu from 'components/AddressMenu/AddressMenu';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import notificationService from 'services/NotificaionService';

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
  } = useLogicHome();

  return (
    <SafeAreaView>
      <Text>Form User</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={onChangeTextInfo('firstName')}
        value={userInfo.firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={onChangeTextInfo('lastName')}
        value={userInfo.lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={onChangeTextInfo('phoneNumber')}
        value={userInfo.phoneNumber}
        keyboardType="numeric"
      />

      <AddressMenu />

      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 5,
          borderWidth: 1,
          marginVertical: 20,
        }}
        onPress={() => onShowDatePicker(true)}>
        <Text>{formatSelectedDate}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 5,
          borderWidth: 1,
        }}
        onPress={() => onShowTimePicker(true)}>
        <Text>{formatSelectedTime}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Detail Address"
        onChangeText={onChangeTextInfo('detailAddress')}
        value={userInfo.detailAddress}
      />

      <Button
        disabled={disableSubmitBtn}
        title="Submit"
        onPress={onSubmit}
        color={disableSubmitBtn ? 'grey' : 'blue'}
      />

      <Button
        title="Send Noti"
        onPress={() =>
          notificationService.scheduleNotifications({
            title: 'hehe',
            message: 'abc',
          })
        }
      />

      {showDatePicker && (
        <RNDateTimePicker
          value={selectedDate}
          mode="date"
          onChange={onChangeDatePicker}
        />
      )}

      {showTimePicker && (
        <RNDateTimePicker
          value={defaultTimePicker}
          mode="time"
          onChange={onChangeTimePicker}
        />
      )}
    </SafeAreaView>
  );
};

export default observer(Home);
