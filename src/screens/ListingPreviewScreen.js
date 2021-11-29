import firebase from 'firebase/compat/app';
import React, { useEffect, useState } from "react"
import { Animated, FlatList, SafeAreaView, ScrollView, Image, StyleSheet, Text, View, Button } from "react-native"
import TextInput from '../components/TextInput'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedScreen'
import NewListingScreen from './NewListingScreen'
import CalendarScreen from './CalendarScreen'
import YourProfileScreen from './YourProfileScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ComponentItem, DefaultContainer } from '../essentials/essentials';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import HomeScreen from './HomeScreen';
import BackButton from '../components/BackButton'


export default function ListingPreviewScreen({ route, navigation }) {
    useEffect(() => {
        setupListingListener(route.params.key)
    }, [])
    const [listingTitle, setTitle] = useState(null)
    const [listingContent, setContent] = useState(null)
    const [listingHeader, setHeader] = useState(null)
    const [comments, setComments] = useState(null)
    const [commentsNum, setCommentsNum] = useState(null)
    const [newComment, setNewComment] = useState(null)
    const [listingUser, setUser] = useState(null);
    const [listingPoster, setPoster] = useState(null);
    const [listingDate, setDate] = useState(null);
    const Tab = createBottomTabNavigator();

    function setupListingListener(listingID) {
        firebase.database().ref('listings/' + listingID).on('value', (snapshot) => {
            if (snapshot.val() != null) {
                setTitle(snapshot.val().Title)
                setContent(snapshot.val().Content)
                setHeader(snapshot.val().Header)
                setUser(snapshot.val().User)
                setPoster(snapshot.val().Poster)
                setDate(snapshot.val().Date)
                setComments(snapshot.val().comments)
                setCommentsNum(snapshot.val().CommentsNum)

            }
        })
    }
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
    function renderItem({ item }) {
        let commentNum = item.Key;
        var tempEmailSub = item.posterEmail.substring(0, item.posterEmail.indexOf('@'))
        var tempName = item.poster;
        var tempEmail = item.posterEmail;
        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={() => { navigation.navigate('ProfileScreen', { name: tempName, email: tempEmail, emailSub: tempEmailSub }) }}>
                    <Text style={styles.description}>{item.poster}: {item.comment}</Text>
                </TouchableOpacity>
            </View >)
    }
    function SortingFunction(first, second) {
        if (first.key > second.key) {
            return -1;
        }
        else {
            return 1;
        }
    }
    function submit() {
        if (!!newComment && newComment != null) {
            firebase.database().ref('/listings/' + route.params.key).update({
                CommentsNum: commentsNum + 1,
            })
            firebase.database().ref('/listings/' + route.params.key + '/comments/' + commentsNum).set({
                comment: newComment,
                poster: name,
                Key: commentsNum,
                posterEmail: email,
            })
            setNewComment('');
        }
    }
    return (
        < View >
            <ScrollView style={styles.scroll}>
                <BackButton goBack={navigation.goBack} />
                <Text style={styles.ListingTitle}>{!!(listingTitle) && listingTitle}</Text>
                <Text style={styles.Header}>{!!(listingHeader) && listingHeader}</Text>
                <TouchableOpacity style={styles.Header} onPress={() => { navigation.navigate({ name: 'ProfileScreen', params: { name: listingPoster, email: listingUser } }) }}>
                    <Text >Post by: {listingPoster}</Text>
                </TouchableOpacity>
                {listingPoster == name && <Button
                    onPress={() => {
                        firebase.database().ref('listings/' + route.params.key).remove()
                        navigation.navigate('FeedScreen');
                    }}
                    title="Delete" />}
                <Text></Text>
                <Text style={styles.Content}>
                    {!!(listingContent) && listingContent}
                </Text>
                <SafeAreaView>
                    {Array.isArray(comments) &&
                        <FlatList
                            data={comments.sort(SortingFunction)}
                            renderItem={renderItem}
                            keyExtractor={item => {
                                return item.Key.toString();
                            }
                            }
                            style={styles.container}
                        />}
                    <TextInput
                        style={styles.input}
                        onChangeText={setNewComment}
                        value={newComment}
                        placeholder="Enter Comment Here"
                    />
                    <Button
                        onPress={() => {
                            submit();
                        }}
                        title="Submit Comment"
                        color="#db6b5c"
                        style={styles.submit}
                    />
                </SafeAreaView>
            </ScrollView>

        </View >

    )
}

const styles = StyleSheet.create({
    scroll: {
        marginBottom: 50,
    },
    navbar: {
        flex: 1,
        height: 40,
    },
    ListingTitle: {
        left: 15,
        color: "black",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        backgroundColor: "transparent",
        marginTop: 100,
    },
    Header: {
        left: 15,
        color: "black",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        backgroundColor: "transparent",
        marginTop: 9,
    },
    Content: {
        color: "rgb(102, 102, 102)",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        backgroundColor: "transparent",
        width: 330,
        paddingBottom: 10,
        left: 15,
    },
    input: {
        //height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        marginTop: 10,
        marginBottom: 20,
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
