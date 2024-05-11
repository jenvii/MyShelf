import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from '../firebase/Firebase';
import GenreButtons from "./GenreButtons";
import { useNavigation } from "@react-navigation/native";

export default function Home() {

    const [books, setBooks] = useState([]);
    const numColumns = 2;

    const handleLogout = async () => {
        await signOut(auth)
        console.log("USer signed out successfully")
    }

    const fetchBooks = (genre) => {
        let url = 'https://www.googleapis.com/books/v1/volumes?q='

        if (genre && genre !== 'All') {
            url += `subject:${genre}&`
        } else {
            url += `*&`
        }

        url += 'maxResults=40'
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error in fetching books: ' + response.statusText);
                }
            })
            .then(data => {
                const filteredBooks = data.items.filter(item => (
                    item.volumeInfo.title &&
                    item.volumeInfo.authors &&
                    item.volumeInfo.industryIdentifiers &&
                    item.volumeInfo.publisher &&
                    item.volumeInfo.description &&
                    item.volumeInfo.publishedDate &&
                    item.volumeInfo.categories &&
                    item.volumeInfo.imageLinks &&
                    item.volumeInfo.imageLinks.smallThumbnail
                ));

                const chosenInformation = filteredBooks.map(item => ({
                    name: item.volumeInfo.title,
                    authors: item.volumeInfo.authors,
                    isbn: item.volumeInfo.industryIdentifiers,
                    publisher: item.volumeInfo.publisher,
                    description: item.volumeInfo.description,
                    publishingDate: item.volumeInfo.publishedDate,
                    categories: item.volumeInfo.categories,
                    imageLinks: item.volumeInfo.imageLinks
                }));
                setBooks(chosenInformation);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchBooks('All')
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Home</Text>
            </View>
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
            <View style={styles.genreContainer}>
                <GenreButtons fetchBooks={fetchBooks} />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={books}
                    numColumns={numColumns}
                    renderItem={({ item }) =>
                        <View style={styles.bookContainer}>
                            <Image
                                style={styles.thumbnail}
                                source={{ uri: item.imageLinks.smallThumbnail }}
                            />
                            <Text style={{ fontSize: 18 }}>{item.name}</Text>
                        </View>}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        backgroundColor: '#3D2B24',
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        marginTop: 30,
        color: 'white',
        fontSize: 25
    },
    genreContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    listContainer: {
        flexDirection: 'row',
        flex: 3,
        alignItems: 'center'
    },
    bookContainer: {
        alignItems: 'center',
        marginBottom: 10,
        width: '50%',
    },
    thumbnail: {
        width: '80%',
        aspectRatio: 1,
        resizeMode: 'contain',
    }
});
