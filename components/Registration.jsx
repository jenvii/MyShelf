import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("User signed up successfully")
    }

    return (
        <View style={styles.container}>
            <Text>Welcome to MyShelf!</Text>
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
                onPress={handleSignIn}>
                Register
            </Button>
            <View style={styles.messageContainer}>
                <Text>Already have an account? </Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkStyle}>Log in here!</Text>
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
    inputContainer: {

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
