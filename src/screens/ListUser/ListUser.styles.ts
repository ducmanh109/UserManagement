import { StyleSheet } from 'react-native';
import Colors from 'theme/colors';
import CommonFonts from 'theme/CommonFonts';
import CommonHeights from 'theme/CommonHeights';
import CommonWidths from 'theme/CommonWidths';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  wrapTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: CommonWidths.res8,
    paddingBottom: CommonHeights.res5,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginTop: CommonHeights.res20,
  },
  txtTitle: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: CommonFonts.res14,
    width: `${100 / 3}%`,
  },
  list: {
    height: '100%',
    paddingBottom: CommonHeights.res20,
  },
  wrapItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: CommonHeights.res10,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  txtItem: {
    flex: 1,
  },
  txtNoData: {
    alignSelf: 'center',
    marginTop: 100,
  },
});

export default styles;
