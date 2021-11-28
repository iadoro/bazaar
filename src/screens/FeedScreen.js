import { View, Image, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { Row, Text, Banner, Header, DefaultContainer, ComponentItem, ListingContainer, SmallLogo } from '../essentials/essentials';
import Listing from '../components/Listing';
import styled from 'styled-components/native';

export default function FeedScreen({ navigation }) {
    const [topic, onSearchTopic] = useState('')

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
            style = {{
                width: "98%",
                height: "100%"
            }}>
                <Listing navigation={navigation} filter={topic}/>
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
    },
});