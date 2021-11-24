import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

export function Row(props) {

  return (
    <View style={{ flexDirection: 'row' }}>
      { props.children }
    </View>
  );
}

export function Text(props) {
  
  const Text = styled.Text`
    font-size: ${props.size ? props.size + "px" : "12px"};
    color: ${props.color ? props.color : 'black'};
    font-weight: ${props.bold ? '700' : '400'};
  `;

  return (
    <Text>
      { props.children }
    </Text>
  );
}

export function DefaultContainer(props) {
  const Container = styled.View`
    flex: ${props.flex ? props.flex : 1};
    backgroundColor: ${props.bgcolor ? props.bgcolor : '#fff'};
    alignItems: ${props.align ? props.align : 'center'};
    justifyContent: ${props.justify ? props.justify : 'center'};
  `;

  return (
    <Container>
      { props.children }
    </Container>
  )
}

export function PageContainer(props) {
  const Container = styled.View`
    flex: ${props.flex ? props.flex : 1};
    backgroundColor: ${props.bgcolor ? props.bgcolor : '#fff'};
    justifyContent: ${props.justify ? props.justify : 'center'};
  `;

  return (
    <Container>
      { props.children }
    </Container>
  )
}

export function Header(props) {
  const Header = styled.View`
    flex: ${props.flex ? props.flex : 1};
    align-items: ${props.align ? props.align : 'center'};
    justify-content: ${props.justify ? props.justify : 'flex-start'};
    background-color: ${props.backgroundColor ? props.backgroundColor : 'transparent'};
  `;

  return (
    <Header>
      { props.children }
    </Header>
  )
}

export function Banner(props){
  const Banner = styled.View`
    flex-direction: ${props.direction ? props.direction : 'row'};
    align-items: ${props.align ? props.align : 'center'};
    justify-content: ${props.justify ? props.justify : 'space-evenly'};
    flex: ${props.flex ? props.flex : 0.5};
    padding-top: ${props.paddingTop ? props.paddingTop + "px" : '50px'};
    padding-left: ${props.paddingLeft ? props.paddingLeft + "px" : '30px'};
    padding-right: ${props.paddingRight ? props.paddingRight + "px" : '30px'};
    width: ${props.width ? props.width : '120%'};
  `;

  return (
    <Banner>  
      {props.children}
    </Banner>
  )
}

export function ListingContainer(props) {
  const Container = styled.View`
    position: ${props.position ? props.position : 'absolute'};
    right: ${props.right ? props.right : 0};
    justifyContent: ${props.justify ? props.justify : 'flex-start'};
    alignItems: ${props.align ? props.align : 'flex-start'};
  `;

  return (
    <Container>
        {props.children}
    </Container>
  )
}

export function ComponentContainer(props) {
  const Container = styled.View`
    flex: ${props.flex ? props.flex : 1};
    backgroundColor: ${props.bgcolor ? props.bgcolor : '#fff'};
    alignItems: ${props.align ? props.align : 'center'};
    justifyContent: ${props.justify ? props.justify : 'center'};
  `;

  return (
    <Container>
      {props.children}
    </Container>
  )
}

export function ComponentItem(props) {
  const Container = styled.View`
    flex: ${props.flex ? props.flex : 1};
    width: ${props.width ? props.width : '100%'};
  `;

  return (
    <Container>
      {props.children}
    </Container>
  )
}

export function FieldItem(props) {
  const Container = styled.View`
    flex: ${props.flex ? props.flex : 1};
    width: ${props.width ? props.width : '100%'};
    padding: ${props.padding ? props.padding +'px' : '`200px`'};
  `;

  return (
    <Container>
      {props.children}
    </Container>
  )
}

export function SmallLogo(props) {
  const Image = styled.Image`
    flex: ${props.flex ? props.flex : 1};
    height: ${props.height ? props.height : 20};
    resizeMode: ${props.mode ? props.mode : 'contain'};
  `;

  return (
    <Image source={require('./bazaar.jpeg')}>
      {props.children}
    </Image>
  )
}
