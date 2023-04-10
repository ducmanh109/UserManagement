import { StyleSheet, ViewStyle } from 'react-native';
import Colors from './colors';
import CommonHeights from './CommonHeights';
import CommonWidths from './CommonWidths';
import { responsiveHeight } from './screen';

export const iconSize = CommonWidths.res25;
export const iconColorGrey = Colors.grey;

const CommonStyles = {
  flex1: { flex: 1 } as ViewStyle,

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  } as ViewStyle,

  containerHeader: {
    height: responsiveHeight(45),
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,

  paddingHorizontalContainer: {
    paddingHorizontal: CommonWidths.spaceDefault,
  } as ViewStyle,

  paddingContainer: {
    padding: CommonWidths.spaceDefault,
  } as ViewStyle,

  borderColor: { borderColor: Colors.smoke } as ViewStyle,

  width100: { width: '100%' } as ViewStyle,
  height100: { height: '100%' } as ViewStyle,

  absolute: StyleSheet.absoluteFillObject,

  flex1Center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  alignCenter: { alignItems: 'center' } as ViewStyle,

  activityIndicator: {
    marginVertical: CommonHeights.res5,
  } as ViewStyle,

  opacity5: { opacity: 0.5 } as ViewStyle,

  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  } as ViewStyle,

  row: {
    flexDirection: 'row',
  } as ViewStyle,

  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 2,
  } as ViewStyle,

  menuItem: {
    borderBottomColor: Colors.greyBrown,
    borderTopColor: Colors.greyBrown,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  } as ViewStyle,

  line: {
    width: '100%',
    left: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyBrown,
  } as ViewStyle,
};

export default CommonStyles;
