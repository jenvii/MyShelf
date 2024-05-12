import { collection, getDocs, where } from "firebase/firestore";
import { FlatList, Text, View, Image } from "react-native";
import { db } from "../firebase/Firebase";
import { useEffect, useState } from "react";
import Header from "./Header";
import { bookShelfStyles } from "./Styles";

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
        <View style={bookShelfStyles.container}>
            <Header headertext="Your Bookshelf" />
            <View style={bookShelfStyles.listContainer}>
                <FlatList
                    data={books}
                    renderItem={({ item }) => (
                        <View style={bookShelfStyles.listStyle}>
                            <Image
                                style={bookShelfStyles.thumbnail}
                                source={{ uri: item.bookInfo.imageLinks.smallThumbnail }}
                            />
                            <View bookShelfStyles={bookShelfStyles.textContainer}>
                                <Text style={bookShelfStyles.textStyle} >{item.bookInfo.name}</Text>
                                <Text>{item.bookInfo.authors}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View >
    )
}

