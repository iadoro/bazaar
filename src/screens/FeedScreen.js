import { View, Image, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { Row, Text, Banner, Header, DefaultContainer, ComponentItem, ListingContainer, SmallLogo } from '../essentials/essentials';
import Listing from '../components/Listing';
import styled from 'styled-components/native';

export default function FeedScreen({ navigation }) {
    const [topic, onSearchTopic] = useState('')

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Banner flex={0.01} width={'auto'}> 
                {/* <TouchableHighlight> */}
                {/* <ChevronLeft style={{color: 'db6b5c'}}/> */}
                {/* </TouchableHighlight> */}
                {/* <SmallLogo flex={2}></SmallLogo> */}
                {/* <ChevronLeft style={{opacity: 0}}/> */}
            </Banner>
            <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: 320
          }}>
            <TextInput 
            style={{
              height: 40,
              margin: 12,
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
            <ComponentItem>
                <ListingContainer>
                    <Listing navigation={navigation} filter={topic}/>
                </ListingContainer>
            </ComponentItem>
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
});