import i18n from 'i18next';
import { SettingStorage } from 'localStorage/settings';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import vn from './vn.json';

const resources = {
  en: {
    translation: en,
  },
  vn: {
    translation: vn,
  },
};

const currentLanguage = SettingStorage.getString('setting-storage');

i18n.use(initReactI18next).init({
  resources,
  lng: currentLanguage ?? 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;
