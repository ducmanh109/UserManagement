import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { RepeatType } from 'services/NotificaionService';

export type GENDER = 'male' | 'female';

export type USER_TYPE = {
  id: string;
  password: string;
  gender: GENDER;
  verifyPhone: boolean;
  nickName: string;
  avatarUrl: string;
  fullName: string;
  userId: string;
  role: string;
  phone: string;
  isSynced: boolean;
  email: string;
  firebaseId: string;
  appleId: string;
  facebookId: string;
  wechatId: string;
  kakaoId: string;
  isHavePassword: boolean;
  dateOfBirth: string;
  cartId: string;
  canCheckin: boolean;
  amountAccumulation: number;
  createdAt: string;
  provider: null;
  providerId: null;
  authority: [];
  accessToken: string;
};

export type CREATE_USER_STATUS_TYPE = {
  SUCCESS: 'SUCCESS';
  FAIL: 'FAIL';
};

export const CREATE_USER_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

export type TimeMaintainType = Array<{
  year: number;
  month: {
    0: boolean;
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
    5: boolean;
    6: boolean;
    7: boolean;
    8: boolean;
    9: boolean;
    10: boolean;
    11: boolean;
  };
}>;

export type CollectMoneyType = Array<{
  date: string;
  money: number;
}>;

export type USER_INFO_TYPE = {
  detailAddress: string;
  district: string;
  name: string;
  phoneNumber: string;
  province: string;
  repeatType: RepeatType;
  repeatTypeMoney: RepeatType;
  timeToRemind: any;
  timeToRemindMoney: any;
  ward: string;
  id: string;
  scheduledTime: any; // for local schedule push
  time_maintain: TimeMaintainType;
  note: string;
  collectMoneyType: CollectMoneyType;
};
