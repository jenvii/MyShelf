import { useState } from "react";
import { Text, View, FlatList, Pressable, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { searchStyles } from "./Styles";
import Header from "./Header";

export default function Search({ navigation, user }) {

    const [keyword, setKeyword] = useState("");
    const [books, setBooks] = useState([]);
    const userId = user.uid;
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
        <View style={searchStyles.container}>
            <Header headertext="Search" />
            <View style={searchStyles.searchBarStyle}>
                <TextInput
                    style={searchStyles.textInputStyle}
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
            <View style={searchStyles.listContainer}>
                <FlatList
                    data={books}
                    numColumns={numColumns}
                    renderItem={({ item }) =>
                        <View style={searchStyles.bookContainer}>
                            <Pressable onPress={() => navigation.navigate("Book", { book: item, userUid: userId })}>
                                <Image
                                    style={searchStyles.thumbnail}
                                    source={{ uri: item.imageLinks.smallThumbnail }}
                                />
                                <Text style={searchStyles.titleStyle}>{item.name}</Text>
                                <View style={searchStyles.buttonContainer}>
                                    <Button
                                        mode="contained"
                                        buttonColor="#8D776E"
                                        style={searchStyles.buttonStyle}
                                    >
                                        Learn more
                                    </Button>
                                </View>
                            </Pressable>
                        </View>}
                    ListEmptyComponent={
                        <View style={searchStyles.emptySearchStyle}>
                            <Text style={searchStyles.emptySearchTextStyle}>Search for books with book's name or author!</Text>
                        </View>
                    }
                />
            </View>
        </View>
    )
}
