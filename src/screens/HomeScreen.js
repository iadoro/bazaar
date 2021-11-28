import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedScreen'
import NewListingScreen from './NewListingScreen'
import CalendarScreen from './CalendarScreen'
import ProfileScreen from './YourProfileScreen'
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    setName(user.displayName);
    setEmail(user.email);
    if (initializing) setInitializing(false);
  }
  return (
    <Tab.Navigator>
      <Tab.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: true, title: "Feed", headerTitleAlign: "center", tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => <Icon name="list-alt" size={20} color="#581F18" /> }} />
      <Tab.Screen name="NewListingScreen" component={NewListingScreen} options={{ headerShown: true, title: "New Listing", headerTitleAlign: "center", tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => <Icon name="plus" size={20} color="#581F18" /> }} />
      <Tab.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: true, title: "Calendar", headerTitleAlign: "center", tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => <Icon name="calendar" size={20} color="#581F18" /> }} />
      <Tab.Screen name="ProfileScreen" component={() => <ProfileScreen navigation={navigation} name={name} email={email} />} options={{ navigation, headerShown: true, title: "Profile", headerTitleAlign: "center", tabBarShowLabel: false, tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => <Icon name="user" size={20} color="#581F18" /> }} />
    </Tab.Navigator>
  );
}