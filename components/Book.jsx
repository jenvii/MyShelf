import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { db } from "../firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { bookStyles } from "./Styles";

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
        <View style={bookStyles.container}>
            <View style={bookStyles.backButton}>
                <Pressable onPress={() => navigation.navigate("SearchPage")}>
                    <Icon name="navigate-before" size={40} color="#3D2B24" />
                </Pressable>
            </View>
            <Image
                style={bookStyles.thumbnail}
                source={{ uri: imageLinks.thumbnail }}
            />
            <ScrollView>
                <View style={bookStyles.bookInfo}>
                    <Text style={bookStyles.bookTitleStyle}>{name}</Text>
                    <Text style={bookStyles.bookAuthorStyle}>{authors.join(', ')}</Text>
                    <Text>Genre: {categories}</Text>
                    <Text>Published in {publishingYear}</Text>
                    <Text>Published by {publisher}</Text>
                </View>
                <View>
                    <Pressable onPress={addToFavorites}>
                        <Text>Add to favorites</Text>
                    </Pressable>
                </View>
                <View style={bookStyles.bookDescription}>
                    <Text style={bookStyles.description}>{description}</Text>
                </View>
            </ScrollView>
        </View>
    )
}
