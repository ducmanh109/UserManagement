/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { TimeMaintainType } from 'api/user/user.type';

const TimeMaintain = ({
  timeMaintain,
  setTimeMaintain,
  isEdit,
}: {
  timeMaintain?: TimeMaintainType;
  setTimeMaintain: any;
  isEdit: any;
}) => {
  const onChangeTimeMaintain = (yearSelect: any, monthSelect: any) => {
    const newTimeMainTain = timeMaintain?.map(yearInfo => {
      if (yearInfo.year === yearSelect) {
        return {
          ...yearInfo,
          month: {
            ...yearInfo.month,
            [monthSelect]: !yearInfo.month[monthSelect],
          },
        };
      }
      return yearInfo;
    });
    setTimeMaintain(newTimeMainTain);
  };

  const addNewYear = () => {
    const highestYear = timeMaintain?.length
      ? Math.max(...timeMaintain.map(year => year.year))
      : 2022;

    const newTimeMainTain = [
      ...(timeMaintain ?? []),
      {
        year: highestYear + 1,
        month: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
        },
      },
    ];

    setTimeMaintain(newTimeMainTain);
  };

  const onChangeNumberYear = (yearSelect: any, type: '+' | '-') => {
    const newTimeMainTain = timeMaintain?.map(yearInfo => {
      if (yearInfo.year === yearSelect) {
        return {
          ...yearInfo,
          year: type === '+' ? yearInfo.year + 1 : yearInfo.year - 1,
        };
      }
      return yearInfo;
    });
    setTimeMaintain(newTimeMainTain);
  };

  const onDeleteYear = (yearSelect: any) => {
    const newTimeMainTain = timeMaintain?.filter(
      yearInfo => yearInfo.year !== yearSelect,
    );
    setTimeMaintain(newTimeMainTain ?? []);
  };

  return (
    <View style={{ paddingTop: 10 }}>
      {timeMaintain?.map(item => {
        return (
          <View style={{ marginTop: 4, borderBottomWidth: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 8,
              }}>
              <Text>{item.year}:</Text>
              {isEdit && (
                <>
                  <Pressable
                    style={styles.buttonYear}
                    onPress={() => onChangeNumberYear(item.year, '-')}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 20,
                      }}>
                      -
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.buttonYear}
                    onPress={() => onChangeNumberYear(item.year, '+')}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 20,
                      }}>
                      +
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.buttonYear}
                    onPress={() => onDeleteYear(item.year)}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 20,
                      }}>
                      Xoá
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
            <Text>Tháng:</Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {Object.keys(item.month).map(month => {
                return (
                  <View style={{ alignItems: 'center' }}>
                    <Text>{+month + 1}</Text>
                    <Pressable
                      disabled={!isEdit}
                      onPress={() => onChangeTimeMaintain(item.year, month)}
                      style={{
                        padding: 2,
                      }}>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          borderWidth: 1,
                          borderRadius: 100,
                          backgroundColor: item.month[month]
                            ? 'lightgreen'
                            : 'white',
                        }}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}

      {isEdit && (
        <Pressable onPress={addNewYear} style={styles.button}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Thêm năm</Text>
        </Pressable>
      )}
    </View>
  );
};

export default memo(TimeMaintain);

const styles = StyleSheet.create({
  button: {
    marginVertical: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'blue',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonYear: {
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'blue',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
