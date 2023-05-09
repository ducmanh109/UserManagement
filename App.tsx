import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SETUP_API } from './src/api/api.config';
import RootStack from './src/stacks/RootStack';
import { observer } from 'mobx-react';
import FlashMessage from 'react-native-flash-message';
import addressMenuStore from 'data/addressMenu/AddressMenuStore';
import CodePush from 'react-native-code-push';
import { Alert } from 'react-native';

// import database from '@react-native-firebase/database';
// import firebaseConfig from './firebaseConfig';

// if (!database().app.length) {
//   database().initializeApp(firebaseConfig);
// }

const App = () => {
  const [isUpdated, setUpdated] = useState(false);

  useEffect(() => {
    SETUP_API.initAPIConfig();
  }, []);

  const syncImmediate = useCallback(async () => {
    CodePush.sync(
      {
        deploymentKey: 'nPKRkNOQgFzvpND5rogR3GdeJkHRoOElb08v3',
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      },
      status => {
        console.log(
          'CodePush.sync status',
          '>',
          status,
          '<',
          CodePush.SyncStatus,
        );
      },
    );

    const data: any = await CodePush.notifyAppReady();

    if (data?.status === 'DeploymentSucceeded' && !isUpdated) {
      Alert.alert('update success', '', [
        {
          onPress: () => {
            setUpdated(true);
          },
        },
      ]);
    }
  }, [isUpdated]);

  useEffect(() => {
    const interValId = setInterval(() => {
      syncImmediate();
    }, 300000);

    syncImmediate();

    return () => {
      clearInterval(interValId);
    };
  }, [syncImmediate]);

  return (
    <NavigationContainer
      onStateChange={() => {
        addressMenuStore.resetFilter();
      }}>
      <RootStack />
      <FlashMessage />
    </NavigationContainer>
  );
};

export default observer(App);
