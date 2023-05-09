/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import styles from './Home.styles';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import SelectDropdown from 'react-native-select-dropdown';

const valuePicker = [
  { value: 'minute', text: 'phút' },
  { value: 'hour', text: 'giờ' },
  { value: 'day', text: 'ngày' },
  { value: 'week', text: 'tuần' },
  { value: 'month', text: 'tháng' },
  { value: 'year', text: 'năm' },
  { value: null, text: 'Không nhắc nữa' },
];

const SelectDateMaintain = ({
  selectedDate,
  onSelectRepeatType,
  repeatType,
  initialRepeatType,
  onChangeDatePicker,
  type,
}: {
  selectedDate: any;
  onSelectRepeatType: any;
  repeatType: any;
  initialRepeatType?: any;
  onChangeDatePicker: any;
  type: 'maintain' | 'money';
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const formatSelectedDate = format(selectedDate, 'dd/MM/yyyy');
  const formatSelectedTime =
    (selectedDate && format(selectedDate as Date, 'HH:mm')) ?? '--:--';

  const onShowDatePicker = useCallback(() => {
    setShowDatePicker(value => !value);
    setShowTimePicker(false);
  }, []);

  const onShowTimePicker = useCallback(() => {
    setShowTimePicker(value => !value);
    setShowDatePicker(false);
  }, []);

  return (
    <View>
      {/* date,time picker,repeat type */}
      <Text
        style={styles.title}
        children={
          type === 'maintain'
            ? 'Chọn lịch nhắc bảo trì'
            : 'Chọn lịch nhắc thu tiền'
        }
      />

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
          defaultButtonText={
            type === 'maintain' ? 'Nhắc bảo trì' : 'Nhắc thu tiền'
          }
          buttonTextStyle={styles.txtTypeRepeat}
          defaultValue={
            initialRepeatType
              ? valuePicker.find(item => item.value === initialRepeatType)
              : valuePicker.find(item => item.value === repeatType)
          }
          buttonTextAfterSelection={selectedItem => selectedItem.text}
          rowTextForSelection={item => item.text}
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
    </View>
  );
};

export default memo(SelectDateMaintain);
