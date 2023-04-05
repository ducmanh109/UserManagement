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
