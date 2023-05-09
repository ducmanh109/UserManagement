/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Alert } from 'react-native';
import React, { memo, useState } from 'react';
import { CollectMoneyType } from 'api/user/user.type';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const CollectMoney = ({
  collectMoney,
  onChangeCollectMoney,
  isEdit,
}: {
  collectMoney: CollectMoneyType;
  onChangeCollectMoney: any;
  isEdit: boolean;
}) => {
  const [isShowCreateMoney, setShowCreateMoney] = useState(false);
  const [newMoney, setNewMoney] = useState('0');
  const [newDate, setNewDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onCreateNewCollectMoney = () => {
    const isHaveMonth = collectMoney.find(
      item => item.date === newDate.toLocaleDateString(),
    );

    if (isHaveMonth) {
      Alert.alert('Ngày bị trùng');
      return;
    }

    onChangeCollectMoney([
      ...collectMoney,
      { date: newDate.toLocaleDateString(), money: newMoney },
    ]);
    setShowCreateMoney(false);
    setNewMoney('0');
    setShowDatePicker(false);
  };

  const onCancelNewCollectMoney = () => {
    setNewMoney('0');
    setShowCreateMoney(false);
    setShowDatePicker(false);
  };

  const onDeleteMoneyInfo = (date: string) => {
    Alert.alert('Bạn có chắc chắn muốn xoá không?', '', [
      { style: 'cancel', text: 'Huỷ' },
      {
        onPress: () => {
          onChangeCollectMoney(collectMoney.filter(info => info.date !== date));
        },
        text: 'Xoá',
        style: 'destructive',
      },
    ]);
  };

  const onChangeDatePicker = (_: any, date?: Date) => {
    date && setNewDate(date);
  };

  return (
    <View>
      {isEdit && (
        <Pressable
          onPress={() => {
            setShowCreateMoney(value => !value);
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: 'blue',
              marginBottom: 8,
            }}>
            Tạo thêm số tiền đã thu
          </Text>
        </Pressable>
      )}
      {isShowCreateMoney && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', width: '30%' }}>
              <Pressable onPress={() => setShowDatePicker(value => !value)}>
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', color: 'blue' }}>
                  {newDate.toLocaleDateString()} :
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Số tiền: </Text>

              <NumericInput
                style={{
                  borderWidth: 1,
                  width: '70%',
                  borderRadius: 4,
                  paddingHorizontal: 4,
                  paddingVertical: 8,
                }}
                type="currency"
                locale="vi-VN"
                currency="VND"
                decimalPlaces={3}
                value={newMoney}
                onUpdate={setNewMoney}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <Pressable onPress={onCreateNewCollectMoney}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: 'blue',
                  marginBottom: 8,
                  borderWidth: 1,
                  padding: 4,
                  borderRadius: 4,
                  marginRight: 16,
                }}>
                Đồng ý
              </Text>
            </Pressable>
            <Pressable onPress={onCancelNewCollectMoney}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: 'blue',
                  marginBottom: 8,
                  borderWidth: 1,
                  padding: 4,
                  borderRadius: 4,
                }}>
                Huỷ
              </Text>
            </Pressable>
          </View>
          {showDatePicker && (
            <RNDateTimePicker
              value={newDate}
              mode="date"
              onChange={onChangeDatePicker}
              display="inline"
              locale="vi"
            />
          )}
        </>
      )}
      {collectMoney?.map(moneyInfo => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginVertical: 4,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, fontWeight: '500', width: 120 }}>
                {moneyInfo.date} :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                {moneyInfo.money.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            </View>
            {isEdit && (
              <Pressable onPress={() => onDeleteMoneyInfo(moneyInfo.date)}>
                <Text>Xoá</Text>
              </Pressable>
            )}
          </View>
        );
      })}
      <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', width: 120 }}>
          Tổng :
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {collectMoney
            .reduce((total, moneyInfo) => {
              return total + moneyInfo.money;
            }, 0)
            .toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
        </Text>
      </View>
    </View>
  );
};

export default memo(CollectMoney);
