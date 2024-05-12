import { useState } from "react";
import { Button } from 'react-native-paper';
import { View, ScrollView } from "react-native";
import { genreButtonStyles } from "./Styles";

export default function GenreButtons({ fetchBooks }) {
    const [selectedGenre, setSelectedGenre] = useState('All');

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
        fetchBooks(genre);
    }

    return (
        <View style={genreButtonStyles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <Button
                    mode="contained"
                    title="All"
                    onPress={() => handleGenreChange('All')}
                    buttonColor={selectedGenre == 'All' ? '#3D2B24' : '#8D776E'}
                    style={genreButtonStyles.buttonContainer}
                >
                    All
                </Button>
                <Button
                    mode="contained"
                    title="Biography"
                    onPress={() => handleGenreChange('Biography')}
                    buttonColor={selectedGenre == 'Biography' ? '#3D2B24' : '#8D776E'}
                    style={genreButtonStyles.buttonContainer}
                >
                    Biography
                </Button>
                <Button
                    mode="contained"
                    title="Fantasy"
                    onPress={() => handleGenreChange('Fantasy')}
                    buttonColor={selectedGenre == 'Fantasy' ? '#3D2B24' : '#8D776E'}
                    style={genreButtonStyles.buttonContainer}
                >
                    Fantasy
                </Button>
                <Button
                    mode="contained"
                    title="Horror"
                    onPress={() => handleGenreChange('Horror')}
                    buttonColor={selectedGenre == 'Horror' ? '#3D2B24' : '#8D776E'}
                    style={genreButtonStyles.buttonContainer}
                >
                    Horror
                </Button>
                <Button
                    mode="contained"
                    title="Romance"
                    onPress={() => handleGenreChange('Romance')}
                    buttonColor={selectedGenre == 'Romance' ? '#3D2B24' : '#8D776E'}
                    style={genreButtonStyles.buttonContainer}
                >
                    Romance
                </Button>
                <Button
                    mode="contained"
                    title="Thriller"
                    onPress={() => handleGenreChange('Thriller')}
                    buttonColor={selectedGenre == 'Thriller' ? '#3D2B24' : '#8D776E'}
                    style={genreButtonStyles.buttonContainer}
                >
                    Thriller
                </Button>
                <Button
                    mode="contained"
                    title="Travel"
                    onPress={() => handleGenreChange('Travel')}
                    buttonColor={selectedGenre == 'Travel' ? '#3D2B24' : '#8D776E'}
                    style={genreButtonStyles.buttonContainer}
                >
                    Travel
                </Button>
            </ScrollView>
        </View >
    )
}