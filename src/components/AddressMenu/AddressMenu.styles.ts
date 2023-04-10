import { StyleSheet } from 'react-native';
import Colors from 'theme/colors';
import CommonFonts from 'theme/CommonFonts';
import CommonHeights from 'theme/CommonHeights';
import CommonWidths from 'theme/CommonWidths';

const styles = StyleSheet.create({
  container: {
    marginTop: CommonHeights.res8,
    marginBottom: CommonHeights.res16,
  },
  btnDropdown: {
    borderRadius: 30,
    height: CommonHeights.res30,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: CommonWidths.res10,
  },
  txtSelected: {
    color: Colors.black,
    fontWeight: '400',
    fontSize: CommonFonts.res14,
  },
  btnReset: {
    backgroundColor: Colors.azureRadiance,
    alignItems: 'center',
    justifyContent: 'center',
    width: CommonWidths.res80,
    borderRadius: 10,
    paddingVertical: CommonHeights.res8,
    alignSelf: 'center',
  },
  txtReset: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: CommonFonts.res14,
  },
});

export default styles;
