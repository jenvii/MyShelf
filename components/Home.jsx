import { useEffect, useState } from "react";
import { Text, View, FlatList, Image, Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from '../firebase/Firebase';
import GenreButtons from "./GenreButtons";
import Header from "./Header";
import { homeStyles } from "./Styles";

export default function Home({ user }) {

    const [books, setBooks] = useState([]);
    const numColumns = 2;
    const username = (user.email).split('@')[0]

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
        <View style={homeStyles.container}>
            <Header headertext="Home" />
            <Text style={homeStyles.welcomeTextStyle}>Welcome to MyShelf, {username}</Text>
            <Pressable onPress={handleLogout} style={homeStyles.logoutButton}>
                <Text style={homeStyles.logoutText}>Logout</Text>
            </Pressable>
            <View style={homeStyles.genreContainer}>
                <GenreButtons fetchBooks={fetchBooks} />
            </View>
            <View style={homeStyles.listContainer}>
                <FlatList
                    data={books}
                    numColumns={numColumns}
                    renderItem={({ item }) =>
                        <View style={homeStyles.bookContainer}>
                            <Image
                                style={homeStyles.thumbnail}
                                source={{ uri: item.imageLinks.smallThumbnail }}
                            />
                            <Text style={{ fontSize: 18 }}>{item.name}</Text>
                        </View>}

                />
            </View>
        </View>
    )
}
