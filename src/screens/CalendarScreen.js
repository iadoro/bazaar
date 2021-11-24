import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { Text, DefaultContainer } from '../essentials/essentials';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

export default function CalendarScreen({ navigation }) {
    const [data, setData] = useState(null)
    const [datesToMark, setDatesToMark] = useState(null)
    function setupListListener() {
      firebase.database().ref('listings').on('value', (snapshot) => {
        if (snapshot.val() != null) {
          setData(snapshot.val());
          eventsByDate( snapshot.val() );
        }
  
      })
    }
    useEffect(() => {
      setupListListener()
    }, [])
  
    const eventsByDate = ( info ) => {
      let toMark = {}
      info.map((item) => {
        const date = item.Date;
        const title = item.Title;
        const key = item.Key;
        if ( date == "" ) {}
        else if (toMark[date]) {
          toMark[date].events.push([title, key]);
        } else {
          toMark[date] = {
            marked: true,
            events: [[title, key]],
            dotColor: "#db6b5c"
          };
        }
      })
      setDatesToMark(toMark);
    }
  
    return (
        <DefaultContainer>
          <Text>Calendar</Text>
          <Calendar
            theme={{
              // backgroundColor: '#ffffff',
              // calendarBackground: '#ffffff',
              // textSectionTitleColor: '#b6c1cd',
              // textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#db6b5c',
              // selectedDayTextColor: '#ffffff',
              todayTextColor: '#db6b5c',
              // dayTextColor: '#2d4150',
              // textDisabledColor: '#d9e1e8',
              dotColor: '#db6b5c',
              // selectedDotColor: '#ffffff',
              arrowColor: '#db6b5c',
              // disabledArrowColor: '#d9e1e8',
              // monthTextColor: 'blue',
              // indicatorColor: 'blue',
              // textDayFontFamily: 'monospace',
              // textMonthFontFamily: 'monospace',
              // textDayHeaderFontFamily: 'monospace',
              // textDayFontWeight: '300',
              // textMonthFontWeight: 'bold',
              // textDayHeaderFontWeight: '300',
              // textDayFontSize: 16,
              // textMonthFontSize: 16,
              // textDayHeaderFontSize: 16
            }}
            displayLoadingIndicator
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {
              const date = datesToMark[day.dateString]
              if (date) {
                let key;
                if (date.events.length == 1)  key = date.events[0][1];
                else {
                  // TODO: Make a popup that allows you to select the title and navigate to that key -- reuse Listing functionality
                  const titles = date.events.map((item) => item[0])
                }
                navigation.navigate({ name: 'ListingPreview', params: { key: key }})
              }
            }}
            monthFormat={'MMM yyyy'}
            hideExtraDays={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            markedDates={datesToMark}
          />
        </DefaultContainer>
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
