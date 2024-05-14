import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { View, Text, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { loginandRegistrationStyles } from "./Styles";

export default function Registration({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("User signed up successfully")
    }

    return (
        <View style={loginandRegistrationStyles.container}>
            <Text>Welcome to MyShelf!</Text>
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