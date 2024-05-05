import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth, email, password)
        console.log("User logged in succesfully")
    }

    return (
        <View style={styles.container}>
            <Text>Log in to MyShelf!</Text>
            <TextInput
                style={styles.loginTextInputStyle}
                value={email}
                activeUnderlineColor="#3D2B24"
                textColor="#3D2B24"
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.loginTextInputStyle}
                value={password}
                activeUnderlineColor="#3D2B24"
                textColor="#3D2B24"
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <Button
                style={styles.buttonStyle}
                mode="contained"
                buttonColor="#3D2B24"
                onPress={handleLogin}>
                Login
            </Button>
            <View style={styles.messageContainer}>
                <Text>Don't have an account yet? </Text>
                <Pressable onPress={() => navigation.navigate('RegistrationPage')}>
                    <Text style={styles.linkStyle}>Register here!</Text>
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTextInputStyle: {
        width: 300,
        margin: 10,
        backgroundColor: '#E5CCC3'
    },
    messageContainer: {
        flexDirection: 'row'
    },
    buttonStyle: {
        margin: 8,
        width: 150
    },
    linkStyle: {
        color: 'blue'
    }
})
