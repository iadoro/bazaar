import { View, Image, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { Row, Text, Banner, Header, DefaultContainer, ComponentItem, ListingContainer, SmallLogo } from '../essentials/essentials';
import Listing from '../components/Listing';
import styled from 'styled-components/native';


function SearchBar(props) {
    const Container = styled.View`
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
    width: ${props.containerWidth ? props.containerWidth : '320'};
    `;
    const Input = styled.TextInput`
    height: ${props.height ? props.height + 'px' : '40px'};
    margin: ${props.margin ? props.margin + 'px' : '12px'};
    marginRight: ${props.marginRight ? props.marginRight + 'px' : '0px'};
    borderWidth: ${props.borderWidth ? props.borderWidth + 'px' : '1px'};
    borderRadius: ${props.borderRadius ? props.borderRadius + 'px' : '5px'};
    borderColor: ${props.borderColor ? props.borderColor: 'lightgray'};
    padding: ${props.padding ? props.padding + 'px' : '10px'};
    width: ${props.inputWidth ? props.inputWidth + 'px' : '300px'};
    flex: ${props.flex ? props.flex: '4'};
    backgroundColor: ${props.backgroundColor ? props.backgroundColor : 'rgb(242, 242, 247)'};
    `;
  
    return (
        <Container>
            <Input onChangeText={props.onChangeText ? props.onChangeText : null}
            placeholder={props.placeholder ? props.placeholder : "Search Feed"}>
            </Input>
            { props.children }
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
                { props.children }
        </Container>
    )
}

export default function FeedScreen({ navigation }) {
    const [topic, onSearchTopic] = useState('Search')

    return (
        <DefaultContainer>
            <Banner flex={0.01} width={'auto'}> 
                {/* <TouchableHighlight> */}
                {/* <ChevronLeft style={{color: 'db6b5c'}}/> */}
                {/* </TouchableHighlight> */}
                {/* <SmallLogo flex={2}></SmallLogo> */}
                {/* <ChevronLeft style={{opacity: 0}}/> */}
            </Banner>
            <SearchContainer onChangeText={onSearchTopic}/>
            <ComponentItem>
                <ListingContainer>
                    <Listing navigation={navigation}/>
                </ListingContainer>
            </ComponentItem>
        </DefaultContainer>
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