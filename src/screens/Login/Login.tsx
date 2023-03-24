import { Button, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import useLogicLogin from './Login.logic';
import { observer } from 'mobx-react';

const Login = () => {
  const { onChangeEmail, onChangePassword, onLogin } = useLogicLogin();

  return (
    <View>
      <TextInput
        placeholder="Phone"
        style={styles.input}
        onChangeText={onChangeEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={onChangePassword}
      />

      <Button title="Login" onPress={onLogin} />
    </View>
  );
};

export default observer(Login);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 30,
  },
});
