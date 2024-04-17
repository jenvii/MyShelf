import { useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Search() {

    const [keyword, setKeyword] = useState("");
    const [books, setBooks] = useState([]);
    const numColumns = 2;

    const fetchBooks = (keyword) => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20`)
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

    return (
        <View style={styles.container}>
            <View style={styles.searchBarStyle}>
                <TextInput
                    style={styles.textInputStyle}
                    outlineColor="#3D2B24"
                    activeOutlineColor="#3D2B24"
                    textColor="#3D2B24"
                    mode="outlined"
                    label="Book search"
                    value={keyword}
                    onChangeText={text => setKeyword(text)} />
                <Button
                    mode="contained"
                    buttonColor="#3D2B24"
                    onPress={() => fetchBooks(keyword)}>
                    Search
                </Button>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={books}
                    numColumns={numColumns}
                    renderItem={({ item }) =>
                        <View style={styles.bookContainer}>
                            <Pressable>
                                <Image
                                    style={styles.thumbnail}
                                    source={{ uri: item.imageLinks.smallThumbnail }}
                                />
                                <Text style={{ fontSize: 18 }}>{item.name}</Text>
                            </Pressable>
                        </View>}
                    ListEmptyComponent={
                        <View style={styles.emptySearchStyle}>
                            <Text style={styles.emptySearchTextStyle}>Search for books with book's name or author!</Text>
                        </View>
                    }
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
        paddingTop: 40
    },
    searchBarStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    textInputStyle: {
        flex: 1,
        width: '60%',
        backgroundColor: '#E5CCC3',
        margin: 10
    },
    listContainer: {
        flexDirection: 'row',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
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
    },
    emptySearchStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptySearchTextStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#3D2B24'
    }
});
