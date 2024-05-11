import { collection, getDocs, where } from "firebase/firestore";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { db } from "../firebase/Firebase";
import { useEffect, useState } from "react";

export default function Shelf({ user }) {
    const [books, setBooks] = useState([]);
    const userUid = user.uid

    const getFavoriteBooks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "books"));
            const bookList = [];
            querySnapshot.forEach((doc) => {
                const bookData = doc.data();
                if (bookData.userId === userUid) {
                    bookList.push(bookData);
                }
            });
            setBooks(bookList);
        } catch (error) {
            console.error("Error with fetching books from Firestore: " + error)
        }
    }

    useEffect(() => {
        getFavoriteBooks();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={books}
                    renderItem={({ item }) => (
                        <View style={styles.listStyle}>
                            <Image
                                style={styles.thumbnail}
                                source={{ uri: item.bookInfo.imageLinks.smallThumbnail }}
                            />
                            <View styles={styles.textContainer}>
                                <Text style={styles.textStyle} >{item.bookInfo.name}</Text>
                                <Text>{item.bookInfo.authors}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flexDirection: 'row',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    },
    listStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    textStyle: {
        maxWidth: '90%'
    },
    thumbnail: {
        width: '40%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
});
