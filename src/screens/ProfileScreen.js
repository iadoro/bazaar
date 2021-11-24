import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

export default function ProfileScreen({ navigation }) {
    const auth = firebase.auth();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    auth.onAuthStateChanged(user => {
        if (user) {
            setName(user.displayName);
            setEmail(user.email);
        } else {
        }
    });
    return (
        <View style={styles.container}>
            <Text>{!!(name) && name}</Text>
            <Text>{!!(email) && email}</Text>
            <StatusBar style="auto" />
        </View>
    );
}
      
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
      