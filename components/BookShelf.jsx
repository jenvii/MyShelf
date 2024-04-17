import { StyleSheet, Text, View } from "react-native";

export default function Shelf() {
    return (
        <View style={styles.container}>
            <Text>This is your own Bookshelf!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
