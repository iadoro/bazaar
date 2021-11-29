import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import { Calendar } from 'react-native-calendars'
import firebase from 'firebase/compat/app'
import { Text, DefaultContainer } from '../essentials/essentials'
import Listing from '../components/Listing'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { ScrollView } from 'react-native-gesture-handler'


export default function CalendarScreen({ navigation }) {
  const [data, setData] = useState(null)
  const [datesToMark, setDatesToMark] = useState(null)
  const [selectedDate, setSelectedDate] = useState("");
  const [multipleEvents, setMultipleEvents] = useState(false);

  function setupListListener() {
    firebase.database().ref('listings').on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setData(snapshot.val().filter((item) => (item != null && item && ((item.deleted == false) || (item.deleted == null)))));
        eventsByDate(snapshot.val())
      }

    })
  }
  useEffect(() => {
    setupListListener()
  }, [])

  function multipleEventsHandler(date) {
    setMultipleEvents(true);
    setSelectedDate(date);
  }

  const eventsByDate = (info) => {
    let toMark = {}
    info.map((item) => {
      const date = item.Date
      const title = item.Title
      const key = item.Key
      if (date == "") { }
      else if (toMark[date]) {
        toMark[date].events.push([title, key])
      } else {
        toMark[date] = {
          marked: true,
          events: [[title, key]],
          dotColor: "#db6b5c"
        }
      }
    })
    setDatesToMark(toMark)
  }

  return (
    <View styles={styles.page}>
      <ScrollView>
        <Calendar
          theme={{
            selectedDayBackgroundColor: '#db6b5c',
            todayTextColor: '#db6b5c',
            dotColor: '#db6b5c',
            arrowColor: '#db6b5c',
          }}
          displayLoadingIndicator
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            setMultipleEvents(false)
            const date = datesToMark[day.dateString]
            if (date) {
              if (date.events.length == 1) {
                const key = date.events[0][1]
                navigation.navigate({ name: 'ListingPreview', params: { key } })
              }
              else multipleEventsHandler(day.dateString)
            }
          }}
          monthFormat={'MMM yyyy'}
          hideExtraDays={true}
          firstDay={1}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          markedDates={datesToMark}
          style={styles.Calendar}
        />
        {multipleEvents && <Listing date={selectedDate} navigation={navigation} />}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center'
  },
  Calendar: {
    paddingTop: 20,
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
})
