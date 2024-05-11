import { StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { db } from "../firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Book({ route }) {
    const { book, userUid } = route.params;
    const { name, authors, publisher, description, publishingDate, categories, imageLinks } = book;
    const [bookForSaving, setsBookForSaving] = useState({
        bookInfo: book,
        userId: userUid
    });
    const publishingYear = publishingDate.split('-')[0];
    const navigation = useNavigation();

    const addToFavorites = async () => {
        try {
            const docRef = await addDoc(
                collection(db, "books"), bookForSaving
            )
            console.log("Book added to favorites!")
        } catch (error) {
            console.error("Error adding document: " + error)
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <Pressable onPress={() => navigation.navigate("SearchPage")}>
                    <Icon name="navigate-before" size={40} color="#3D2B24" />
                </Pressable>
            </View>
            <Image
                style={styles.thumbnail}
                source={{ uri: imageLinks.thumbnail }}
            />
            <ScrollView>
                <View style={styles.bookInfo}>
                    <Text style={styles.bookTitleStyle}>{name}</Text>
                    <Text style={styles.bookAuthorStyle}>{authors.join(', ')}</Text>
                    <Text>Genre: {categories}</Text>
                    <Text>Published in {publishingYear}</Text>
                    <Text>Published by {publisher}</Text>
                </View>
                <View>
                    <Pressable onPress={addToFavorites}>
                        <Text>Add to favorites</Text>
                    </Pressable>
                </View>
                <View style={styles.bookDescription}>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        paddingTop: 50,
        padding: 10,
        alignSelf: 'flex-start',
    },
    thumbnail: {
        width: '70%',
        aspectRatio: 1,
        resizeMode: 'contain',
        margin: 10,
        marginLeft: 25
    },
    bookInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    bookTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bookAuthorStyle: {
        fontSize: 17
    },
    bookDescription: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    }
});
