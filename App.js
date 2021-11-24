import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import HomeScreen from './src/screens/HomeScreen';
import FeedScreen from './src/screens/FeedScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import firebase from 'firebase/compat/app'
import 'firebase/compat/database';
import 'firebase/compat/auth';



export default function App() {
  const Stack = createStackNavigator()

  const [appIsReady, setAppIsReady] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyA6bvrrwuVo15KB0rjyJefDokY4ac3fYKs",
    authDomain: "cs4710mobileappdev.firebaseapp.com",
    projectId: "cs4710mobileappdev",
    storageBucket: "cs4710mobileappdev.appspot.com",
    messagingSenderId: "852344152474",
    appId: "1:852344152474:web:55fd0f415224a04400da23",
    measurementId: "G-P3N28NP6LE"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="FeedScreen" component={FeedScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
