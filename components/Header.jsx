import { View, StyleSheet, Text } from "react-native";

export default function Header({ headertext }) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{headertext}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
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
})