import React, { useState } from "react";
import { StyleProp, ViewStyle, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const inputStyle: StyleProp<ViewStyle> = {
        alignSelf: 'stretch',
        margin: 20,
    };

    const signIn = async () => {
        console.log("Mock authentication successful");
        navigation.navigate('Main'); 
    };

    const signup = async () => {
        navigation.navigate('Register');
    };

    return (
        <ScrollView style={styles.scrollView}>
            <TextInput
                mode="outlined"
                style={inputStyle}
                label="Email"
                value={email}
                onChangeText={(email: string) => setEmail(email)}
            />
            <TextInput
                mode="outlined"
                label="Password"
                style={inputStyle}
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={(password) => setPassword(password)}
                right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
            />
            <TouchableOpacity
                style={styles.loginButton}
                onPress={signIn}
            >
                <Text style={styles.buttonTextlogin}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.registerButton}
                onPress={signup}
            >
                <Text style={styles.buttonTextregister}>Register</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        height: '50%',
        marginTop: '30%',
    },
    registerButton: {
        backgroundColor: '#825C96',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    buttonTextregister: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#825C96',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    buttonTextlogin: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default LoginScreen;