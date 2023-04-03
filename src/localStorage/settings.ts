import { MMKV } from 'react-native-mmkv';

export const SettingStorage = new MMKV({
  id: 'setting-storage',
  encryptionKey: 'setting-storage',
});
