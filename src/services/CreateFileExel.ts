import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import FileViewer from 'react-native-file-viewer';
import { USER_INFO_TYPE } from 'api/user/user.type';
import { timeLocale } from 'screens/UserDetail/UserDetail';

// const data = [
//   { name: 'John', age: 25, city: 'New York' },
//   { name: 'Alice', age: 30, city: 'Los Angeles' },
//   { name: 'Bob', age: 35, city: 'Chicago' },
// ];

export const onCreateNewExcel = async (data: USER_INFO_TYPE[]) => {
  const convertData = data.map(item => ({
    Tên: item.name,
    'Địa chỉ chi tiết:': item.detailAddress,
    'Số điện thoại': item.phoneNumber,
    'Thời gian bắt nhắc đầu bảo trì': new Date(
      item?.timeToRemind,
    ).toLocaleString(),
    'Nhắc bảo trì theo:':
      item?.repeatType && item?.repeatType in timeLocale
        ? timeLocale[item.repeatType]
        : 'không nhắc',
    'Thời gian bắt nhắc thu tiền': new Date(
      item?.timeToRemindMoney,
    ).toLocaleString(),
    'Nhắc thu tiền theo:':
      item?.repeatTypeMoney && item?.repeatTypeMoney in timeLocale
        ? timeLocale[item.repeatTypeMoney]
        : 'không nhắc',
    'Tháng bảo trì theo năm': item.time_maintain.reduce((string, timeInfo) => {
      let monthMaintained = '';
      // Object.keys(timeInfo.month).forEach(month => {
      //   if (timeInfo.month[month]) {
      //     monthMaintained += `,tháng ${month + 1}`;
      //   }
      // });
      for (const month in timeInfo.month) {
        if (timeInfo.month[month]) {
          monthMaintained += `tháng ${+month + 1},`;
        }
      }
      return string + `${timeInfo.year} : ${monthMaintained}\n`;
    }, ''),
    'Lịch đã thu tiền': item.collectMoneyType.reduce((string, moneyInfo) => {
      // let monthMaintained = '';
      // // Object.keys(timeInfo.month).forEach(month => {
      // //   if (timeInfo.month[month]) {
      // //     monthMaintained += `,tháng ${month + 1}`;
      // //   }
      // // });
      // for (const month in timeInfo.month) {
      //   if (timeInfo.month[month]) {
      //     monthMaintained += `,tháng ${month + 1}`;
      //   }
      // }
      return (
        string +
        `${moneyInfo.date} : ${moneyInfo.money.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}\n`
      );
    }, ''),
  }));

  try {
    const worksheet = XLSX.utils.json_to_sheet(convertData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
    const fileUri =
      RNFS.DocumentDirectoryPath + `/${new Date().toDateString()}.xlsx`;

    await RNFS.writeFile(fileUri, wbout, 'ascii');
    FileViewer.open(fileUri) // absolute-path-to-my-local-file.
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
    return fileUri;
  } catch (error) {
    Alert.alert(JSON.stringify(error));
  }
};
