import { StyleSheet } from 'react-native';
import Colors from 'theme/colors';
import CommonFonts from 'theme/CommonFonts';
import CommonHeights from 'theme/CommonHeights';
import CommonWidths from 'theme/CommonWidths';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // padding: 16,
  },
  wrapTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: CommonHeights.res5,
    marginTop: CommonHeights.res20,
  },
  txtTitle: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: CommonFonts.res14,
    width: `${100 / 3}%`,
  },
  list: {
    paddingBottom: CommonHeights.res20,
    padding: 10,
  },
  wrapItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: CommonHeights.res10,
  },
  txtItem: {
    // flex: 1,
    fontSize: 16,
  },
  txtNoData: {
    alignSelf: 'center',
    marginTop: 100,
  },
  btnReset: {
    backgroundColor: Colors.azureRadiance,
    alignItems: 'center',
    justifyContent: 'center',
    width: CommonWidths.res80,
    borderRadius: 10,
    paddingVertical: CommonHeights.res8,
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default styles;
