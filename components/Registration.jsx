import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { View, Text, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { loginandRegistrationStyles } from "./Styles";

export default function Registration({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("User signed up successfully")
        } catch (error) {
            setErrorMessage("Invalid email address or password, please try again")
        }
    }

    return (
        <View style={loginandRegistrationStyles.container}>
            <Text>Welcome to MyShelf!</Text>
            <Text style={loginandRegistrationStyles.errorMessageStyle}>{errorMessage}</Text>
            <TextInput
                style={loginandRegistrationStyles.loginTextInputStyle}
                value={email}
                activeUnderlineColor="#3D2B24"
                textColor="#3D2B24"
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={loginandRegistrationStyles.loginTextInputStyle}
                value={password}
                activeUnderlineColor="#3D2B24"
                textColor="#3D2B24"
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <Button
                style={loginandRegistrationStyles.buttonStyle}
                mode="contained"
                buttonColor="#3D2B24"
                onPress={handleSignIn}>
                Register
            </Button>
            <View style={loginandRegistrationStyles.messageContainer}>
                <Text>Already have an account? </Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={loginandRegistrationStyles.linkStyle}>Log in here!</Text>
                </Pressable>
            </View>
        </View>
    )

}