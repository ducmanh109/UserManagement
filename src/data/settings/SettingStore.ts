import { SettingStorage } from 'localStorage/settings';
import { action, makeObservable, observable } from 'mobx';

class SettingStore {
  language: string = 'en';

  constructor() {
    makeObservable(this, {
      language: observable,

      setLanguage: action,
    });
  }

  setLanguage(language: string) {
    this.language = language;
    SettingStorage.set('setting-storage', language);
  }
}

const settingStore = new SettingStore();
export default settingStore;
