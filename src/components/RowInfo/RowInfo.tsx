import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CommonHeights from 'theme/CommonHeights';
import Colors from 'theme/colors';
import CommonFonts from 'theme/CommonFonts';

interface PropsType {
  leftInfo: string;
  rightInfo: string;
}

const RowInfo: React.FC<PropsType> = ({ leftInfo, rightInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.leftInfo}>{leftInfo}: </Text>

      <Text>{rightInfo}</Text>
    </View>
  );
};

export default RowInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: CommonHeights.res16,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  leftInfo: {
    fontWeight: '700',
    fontSize: CommonFonts.res13,
  },
});
