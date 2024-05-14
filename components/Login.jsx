import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { View, Text, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { loginandRegistrationStyles } from "./Styles";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth, email, password)
        console.log("User logged in succesfully")
    }

    return (
        <View style={loginandRegistrationStyles.container}>
            <Text>Log in to MyShelf!</Text>
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
                onPress={handleLogin}>
                Login
            </Button>
            <View style={loginandRegistrationStyles.messageContainer}>
                <Text>Don't have an account yet? </Text>
                <Pressable onPress={() => navigation.navigate('Registration')}>
                    <Text style={loginandRegistrationStyles.linkStyle}>Register here!</Text>
                </Pressable>
            </View>
        </View>
    )

}
