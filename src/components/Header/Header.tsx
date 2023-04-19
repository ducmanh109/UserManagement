import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import CommonHeights from 'theme/CommonHeights';
import Colors from 'theme/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CommonWidths from 'theme/CommonWidths';
import { useNavigation } from '@react-navigation/native';

interface PropsType {
  canGoback?: boolean;
  title?: string;
  backgroundColor?: string;
  rightHeader?: React.ReactNode;
}
const Header: React.FC<PropsType> = ({
  canGoback,
  title,
  backgroundColor,
  rightHeader,
}) => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: backgroundColor ?? Colors.main,
      }}>
      {canGoback ? (
        <IonIcon
          name="chevron-back"
          size={30}
          color={Colors.white}
          onPress={goBack}
        />
      ) : (
        <View />
      )}

      {title && <Text>{title}</Text>}

      {rightHeader && rightHeader ? rightHeader : <View />}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: CommonHeights.res45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CommonWidths.res8,
    justifyContent: 'space-between',
  },
});
