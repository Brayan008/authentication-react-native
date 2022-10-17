import { SafeAreaView, TextInput, StyleSheet, Button, Alert} from 'react-native'
import React, { useState } from 'react'
import authController from '../controllers/authController';

function Login(props) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  async function reqLogin(username, pass){
    if(!username || !pass) return Alert.alert("Username and password are required")
    const res = await authController.authLogin(username,pass);
    if(res.message){
      Alert.alert(res.message)
    }else{
      props.setUser(res)
    }
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Username"
        value={username}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        placeholder="Password"
        secureTextEntry={true}
        value={pass}
      />
      <Button
        title="Login"
        onPress={() => reqLogin(username, pass)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login