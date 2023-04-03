import { Button, SafeAreaView, Text } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react';
import useLogicHome from './Home.logic';
import { useTranslation } from 'react-i18next';
import i18n from 'languages/i18n.config';
import settingStore from 'data/settings/SettingStore';

const Home = () => {
  const { t } = useTranslation();

  const { getData, onLogout } = useLogicHome();

  return (
    <SafeAreaView>
      <Button title="Call API" onPress={getData} />

      <Text>{t('Welcome to React')}</Text>

      <Button title="Log out" onPress={onLogout} />
      <Button
        title="Change Language TO VIETNAM"
        onPress={() => {
          i18n.changeLanguage('vn');
          settingStore.setLanguage('vn');
        }}
      />
      <Button
        title="Change Language TO ENG"
        onPress={() => {
          i18n.changeLanguage('en');
          settingStore.setLanguage('en');
        }}
      />
    </SafeAreaView>
  );
};

export default observer(Home);
