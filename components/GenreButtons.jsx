import { useState } from "react";
import { Button } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from "react-native";

export default function GenreButtons({ fetchBooks }) {
    const [selectedGenre, setSelectedGenre] = useState('All');

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
        fetchBooks(genre);
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <Button
                    mode="contained"
                    title="All"
                    onPress={() => handleGenreChange('All')}
                    buttonColor={selectedGenre == 'All' ? '#3D2B24' : '#8D776E'}
                    style={styles.buttonContainer}
                >
                    All
                </Button>
                <Button
                    mode="contained"
                    title="Biography"
                    onPress={() => handleGenreChange('Biography')}
                    buttonColor={selectedGenre == 'Biography' ? '#3D2B24' : '#8D776E'}
                    style={styles.buttonContainer}
                >
                    Biography
                </Button>
                <Button
                    mode="contained"
                    title="Fantasy"
                    onPress={() => handleGenreChange('Fantasy')}
                    buttonColor={selectedGenre == 'Fantasy' ? '#3D2B24' : '#8D776E'}
                    style={styles.buttonContainer}
                >
                    Fantasy
                </Button>
                <Button
                    mode="contained"
                    title="Horror"
                    onPress={() => handleGenreChange('Horror')}
                    buttonColor={selectedGenre == 'Horror' ? '#3D2B24' : '#8D776E'}
                    style={styles.buttonContainer}
                >
                    Horror
                </Button>
                <Button
                    mode="contained"
                    title="Romance"
                    onPress={() => handleGenreChange('Romance')}
                    buttonColor={selectedGenre == 'Romance' ? '#3D2B24' : '#8D776E'}
                    style={styles.buttonContainer}
                >
                    Romance
                </Button>
                <Button
                    mode="contained"
                    title="Thriller"
                    onPress={() => handleGenreChange('Thriller')}
                    buttonColor={selectedGenre == 'Thriller' ? '#3D2B24' : '#8D776E'}
                    style={styles.buttonContainer}
                >
                    Thriller
                </Button>
                <Button
                    mode="contained"
                    title="Travel"
                    onPress={() => handleGenreChange('Travel')}
                    buttonColor={selectedGenre == 'Travel' ? '#3D2B24' : '#8D776E'}
                    style={styles.buttonContainer}
                >
                    Travel
                </Button>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    buttonContainer: {
        margin: 1,
    }
})