import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

export default function RegisterScreen({ navigation }) {
  const [name, onChangeName] = useState('')
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const authenticate = () => {
    // TODO: Error handling with invalid name, email, and password
    // TODO: Set up API to handle authentication
    setErrorMessage(null)
    if (email.toLowerCase().includes('@virginia.edu')) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: name
        })
        var user = userCredential.user;
        firebase.auth().currentUser.sendEmailVerification().then(() => { });
        setErrorMessage("Please check your email to verify your account");
        console.log("Please check your email to verify your account");
      })
        .catch((error) => {
          setErrorMessage(error.message);
          console.log(error.message);
        });

    }
    else {
      console.log('Please use a Univeristy of Virginia email')
      setErrorMessage('Please use a Univeristy of Virginia email')
    }
  }

  const forgotPassword = () => {
    // TODO: Proper error handling with invalid email
    setErrorMessage(null)
    if (!email) setErrorMessage("Invalid email.")
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={onChangeName}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={onChangeEmail}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry
      />
      <Text>{!!errorMessage && errorMessage}</Text>
      <Button
        mode="contained"
        onPress={() => authenticate()}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
