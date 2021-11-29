import { View, Image, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { Row, Text, Banner, Header, DefaultContainer, ComponentItem, ListingContainer, SmallLogo } from '../essentials/essentials';
import Listing from '../components/Listing';
import styled from 'styled-components/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { User } from 'react-native-feather';

function SearchBar(props) {
    const Container = styled.View`
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
    width: ${props.containerWidth ? props.containerWidth : '350'};
    `;
    const Input = styled.TextInput`
    height: ${props.height ? props.height + 'px' : '40px'};
    margin: ${props.margin ? props.margin + 'px' : '12px'};
    marginRight: ${props.marginRight ? props.marginRight + 'px' : '0px'};
    borderWidth: ${props.borderWidth ? props.borderWidth + 'px' : '1px'};
    borderRadius: ${props.borderRadius ? props.borderRadius + 'px' : '5px'};
    borderColor: ${props.borderColor ? props.borderColor : 'lightgray'};
    padding: ${props.padding ? props.padding + 'px' : '10px'};
    width: ${props.inputWidth ? props.inputWidth + 'px' : '300px'};
    flex: ${props.flex ? props.flex : '4'};
    backgroundColor: ${props.backgroundColor ? props.backgroundColor : 'rgb(242, 242, 247)'};
    `;
    return (
        <Container>
            <Input onChangeText={props.onChangeText ? props.onChangeText : null}
                placeholder={props.placeholder ? props.placeholder : "Search Feed"}>
            </Input>
            {props.children}
        </Container>
    )
}
function SearchContainer(props) {
    const Container = styled.View`
    flex: ${props.flex ? props.flex : 0.05};
    flexDirection: ${props.direction ? props.direction : 'row'};
    width: ${props.width ? props.width : '92%'};
    alignItems: ${props.align ? props.align : 'center'};
    justifyContent: ${props.justify ? props.justify : 'space-between'};
    `;
    const onChangeText = props.onChangeText ? props.onChangeText : null;
    return (
        <Container>
            <SearchBar onChangeText={onChangeText}>
            </SearchBar>
            {props.children}
        </Container>
    )
}
export default function FeedScreen({ navigation }) {
    const [topic, onSearchTopic] = useState('')
    const auth = firebase.auth();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailSub, setEmailSub] = useState(null);
    auth.onAuthStateChanged(user => {
        if (user) {
            setName(user.displayName);
            setEmail(user.email);
            setEmailSub(user.email.substring(0, user.email.indexOf('@')));
        } else {
        }
    });
    return (

        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 20,
            alignItems: 'center',
            // flexDirection: 'column',
            // justifyContent: 'space-around'
            // justifyContent: 'center'
        }}>
            <TouchableHighlight onPress={() => { navigation.navigate("ProfileScreen", { name: name, email: email, emailSub: emailSub }) }}>
                <User height={'18px'} style={{ color: '#db6b5c' }}></User>
            </TouchableHighlight>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 320
            }}>
                <TextInput
                    style={{
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'lightgray',
                        padding: 10,
                        width: 300,
                        flex: 4,
                        backgroundColor: 'rgb(242, 242, 247)'
                    }}
                    onChangeText={onSearchTopic}
                    placeholder="Search Feed"
                    value={topic} />
            </View>
            <View
                style={{
                    width: "98%",
                    height: "100%"
                }}>
                <Listing navigation={navigation} filter={topic} />
            </View>
        </View>
    );
    // return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text>Feed!</Text>
    //   </View>
    // )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        marginTop: 30,
<<<<<<< Updated upstream
        marginRight: 10,
=======
>>>>>>> Stashed changes
    },
});