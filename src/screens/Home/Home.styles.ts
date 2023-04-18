import { StyleSheet } from 'react-native';
import Colors from 'theme/colors';
import CommonFonts from 'theme/CommonFonts';
import CommonHeights from 'theme/CommonHeights';
import CommonWidths from 'theme/CommonWidths';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  wrapForm: {
    backgroundColor: Colors.white,
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: CommonFonts.res16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: CommonHeights.res16,
  },
  title: { fontSize: 16, fontWeight: '500', marginTop: 10 },
  input: {
    width: '100%',
    height: CommonHeights.res40,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
    paddingHorizontal: CommonWidths.res8,
    color: Colors.black,
    fontSize: CommonFonts.res14,
  },
  inputArea: {
    width: '100%',
    minHeight: CommonHeights.res40,
    maxHeight: CommonHeights.res140,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
    padding: CommonWidths.res8,
    color: Colors.black,
    fontSize: CommonFonts.res14,
  },
  wrapDateTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnDatePicker: {
    height: CommonHeights.res24,
    width: (CommonWidths.windowWidth - 40) / 3,
    borderWidth: 0.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  btnSubmit: {
    width: '60%',
    height: CommonHeights.res40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: CommonHeights.res50,
  },
  txtSubmit: {
    fontWeight: '700',
    fontSize: CommonFonts.res14,
  },
  txtTypeRepeat: {
    fontSize: CommonFonts.res14,
  },
});

export default styles;
