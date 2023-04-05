import { Button, SafeAreaView, Text, TextInput } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react';
import styles from './Home.styles';
import useLogicHome from './Home.logic';
import AddressMenu from 'components/AddressMenu/AddressMenu';

const Home = () => {
  const { userInfo, disableButton, onChangeTextInfo, onSubmit } =
    useLogicHome();

  return (
    <SafeAreaView>
      <Text>Form User</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={onChangeTextInfo('firstName')}
        value={userInfo.firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={onChangeTextInfo('lastName')}
        value={userInfo.lastName}
      />

      <AddressMenu />

      <Button
        disabled={disableButton}
        title="Submit"
        onPress={onSubmit}
        color={disableButton ? 'grey' : 'blue'}
      />
    </SafeAreaView>
  );
};

export default observer(Home);
