import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedScreen'
import NewListingScreen from './NewListingScreen'
import CalendarScreen from './CalendarScreen'
import ProfileScreen from './ProfileScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginScreen } from '.';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator initialRouteName={FeedScreen}>
      <Tab.Screen name="NewListingScreen" component={NewListingScreen} options={{ headerShown: true, title: "New Listing", headerTitleAlign: "center", tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => <Icon name="plus" size={20} color="#db6b5c" /> }} />
      <Tab.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: true, title: "Home", headerTitleAlign: "center", tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => <Icon name="home" size={20} color="#db6b5c" /> }} />
      <Tab.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: true, title: "Calendar", headerTitleAlign: "center", tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => <Icon name="calendar" size={20} color="#db6b5c" /> }} />
    </Tab.Navigator>
  );
}/**() => <ProfileScreen route={{ params: { name: name, email: email, emailSub: emailSub } } */