import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { db } from "../firebase/Firebase";
import { useEffect, useState } from "react";
import Header from "./Header";
import { bookShelfStyles } from "./Styles";
import { Icon } from "@rneui/base";

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
                    bookData.id = doc.id;
                    bookList.push(bookData);
                }
            });
            setBooks(bookList);
        } catch (error) {
            console.error("Error with fetching books from Firestore: " + error)
        }
    }

    const removeFromFavorites = async (bookId) => {
        try {
            await deleteDoc(doc(db, "books", bookId));
            const updatedBooks = books.filter(book => book.id !== bookId);
            setBooks(updatedBooks);
        } catch (error) {
            console.error("Error with removing book from favorites:", error);
        }
    };

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
                            <View style={bookShelfStyles.removeButtonContainer}>
                                <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
                                    <Icon name="close" size={30} color="#3D2B24" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View >
    )
}

