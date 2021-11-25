import firebase from 'firebase/compat/app';
import React, { useEffect, useState } from "react"
import { Animated, FlatList, SafeAreaView, ScrollView, Image, StyleSheet, Text, View, Button } from "react-native"
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ComponentItem } from '../essentials/essentials';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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
    const [listingAuthor, setListingAuthor] = useState(null)
    const [listingAuthorEmail, setListingAuthorEmail] = useState(null)

    function setupListingListener(listingID) {
        firebase.database().ref('listings/' + listingID).on('value', (snapshot) => {
            setTitle(snapshot.val().Title)
            setContent(snapshot.val().Content)
            setHeader(snapshot.val().Header)
            setComments(snapshot.val().comments)
            setCommentsNum(snapshot.val().CommentsNum)
            setListingAuthor(snapshot.val().Poster)
            setListingAuthorEmail(snapshot.val().User)
        })
    }
    const auth = firebase.auth();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    auth.onAuthStateChanged(user => {
        if (user) {
            setName(user.displayName);
            setEmail(user.email);
        } else {
        }
    });
    function renderItem({ item }) {
        let commentNum = item.Key;
        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={() => { navigation.navigate({ name: 'ProfileScreen', route: { name: name, email: email } }) }}>
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
                Key: commentsNum
            })
        }
    }
    return (
        < View >
            <ScrollView style={styles.scroll}>
                <ComponentItem>
                    <Text style={styles.ListingTitle}>{!!(listingTitle) && listingTitle}</Text>
                    <Text style={styles.Header}>{!!(listingHeader) && listingHeader}</Text>
                    <TouchableOpacity style={styles.Header} onPress={() => { navigation.navigate({ name: 'ProfileScreen', params: { name: listingAuthor, email: listingAuthorEmail } }) }}>
                        <Text >Post by: {listingAuthor}</Text>
                    </TouchableOpacity>
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
                </ComponentItem>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    scroll: {
        marginBottom: 270,
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
        marginTop: 40,
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
