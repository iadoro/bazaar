import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

export default function Listing({ navigation }) {
  const [data, setData] = useState(null)
  const [key, setKey] = useState(null)
  function setupListListener() {
    firebase.database().ref('listings').on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setData(snapshot.val().filter((item) => item !== null && item));
      }

    })
  }
  useEffect(() => {
    setupListListener()
  }, [])
  function renderItem({ item }) {
    let itemKey = item.Key;
    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={() => { navigation.navigate({ name: 'ListingPreview', params: { key: itemKey, }, }) }}>
          <Text style={styles.item}>[{item.Header}] {item.Title}</Text>
          <Text style={styles.description}>{item.Header == "Event" && `${item.Date}\n`}{item.Content}</Text>
        </TouchableOpacity>
      </View >)
  }

  function SortingFunction(first, second){
    if (first.key > second.key){
      return -1;
    }
    else{
      return 1;
    }
  }

  return (
    <SafeAreaView>
      {Array.isArray(data) &&
        <FlatList
          data={data.sort(SortingFunction)}
          renderItem={renderItem}
          keyExtractor={item => {
            setKey(item.Key)
            return item.Key.toString();
          }
          }
          style={styles.container}
        />}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  Logo: {
    color: "rgb(231, 111, 81)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    backgroundColor: "transparent",
    alignSelf: "stretch",
    marginLeft: 119,
    marginRight: 118,
  },
  container: {
    marginTop: 100,
    marginBottom: 200,
  },
  item: {
    marginLeft: 10,
    fontSize: 18,
    height: 24,
  },
  description: {
    padding: 0,
    fontSize: 14,
    height: 36,
    marginLeft: 10,
  },
  view: {
    marginBottom: 10
  }
})
