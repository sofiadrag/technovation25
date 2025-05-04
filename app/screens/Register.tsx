import React, { useState } from "react";
import { initializeApp } from "firebase/app";
// import firebaseConfig from "../../firebase-config.json";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getAuth,
    initializeAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    // @ts-ignore
    getReactNativePersistence
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { StyleProp, TouchableOpacity, View, ViewStyle, StyleSheet, Text, ScrollView } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";
 

const RegisterScreen = ({ navigation }: any) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [country, setcountry] = useState('');
    const [interests, setInterests] = useState('');
    const [type, setType] = useState('');
    const [opportunities, setOpportunities] = useState('');
    const [workstyle, setWorkstyle] = useState('');
    const [skillsstrengths, setSkillsStrengths] = useState('');
    const [motivations, setMotivations] = useState('');
    const inputStyle: StyleProp<ViewStyle> = {
        alignSelf: 'stretch',
        margin: 20
    };
    
    const Register = async () => {
        navigation.navigate('Main');
    }

    return (
        <ScrollView style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', height: '50%', marginTop: '-5%' }}>
            <Card style={{ padding: 10, backgroundColor: '#825C96', borderRadius: 10 }}>
                <Text style={styles.texttitlu}> Please answer these questions so that our app is filtered for your needs:</Text>
            </Card>
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What is your email address?</Text>
            <TextInput
                mode="outlined"
                style={inputStyle}
                label="Email"
                value={email}
                onChangeText={(email: string) => setEmail(email)}
            />
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What is your password?</Text>
            <TextInput
                mode="outlined"
                label="Password"
                style={inputStyle}
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={(password) => setPassword(password)}
                right={<TextInput.Icon icon={hidePassword ? "eye-off" : "eye"}
                    onPress={() => setHidePassword(!hidePassword)} />}
            />
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What is your first name?</Text>
            <TextInput
                mode="outlined"
                style={inputStyle}
                label="First name"
                value={firstname}
                onChangeText={(firstname: string) => setfirstname(firstname)}
            />
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What is your last name?</Text>
            <TextInput
                mode="outlined"
                style={inputStyle}
                label="Last name"
                value={lastname}
                onChangeText={(lastname: string) => setlastname(lastname)}
            />
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>Where are you from? Please select a country.</Text>
            <Card style={{ alignSelf: 'stretch', margin: 10, padding: 25, borderRadius: 10 }}>
                <Picker

                    selectedValue={country}
                    onValueChange={(itemValue, itemIndex) => setcountry(itemValue)}
                    style={{
                        marginTop: -50,
                        paddingBlock: 10,
                    }}

                    selectionColor="#825C96"
                    itemStyle={{
                        color: '#825C96',

                    }}
                >
                    <Picker.Item label="Romania" value="ro" />
                    <Picker.Item label="Italy" value="it" />
                    <Picker.Item label="Germany" value="de" />
                    <Picker.Item label="France" value="fr" />
                    <Picker.Item label="Spain" value="es" />
                    <Picker.Item label="United Kingdom" value="uk" />
                    <Picker.Item label="United States" value="us" />
                    <Picker.Item label="Canada" value="ca" />
                    <Picker.Item label="Australia" value="au" />
                </Picker>
            </Card>
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What are your areas of interest?</Text>
            <Card style={{ alignSelf: 'stretch', margin: 10, padding: 25, borderRadius: 10 }}>
                <Picker
                    selectedValue={interests}
                    onValueChange={(itemValue, itemIndex) =>
                        setInterests(itemValue)
                    }
                    style={{
                        marginTop: -50,
                        paddingBlock: 10,
                    }}

                    selectionColor="#825C96"
                    itemStyle={{
                        color: '#825C96',

                    }}
                >
                    <Picker.Item label="STEM" value="STEM" />
                    <Picker.Item label="Arts" value="Arts" />
                    <Picker.Item label="Humanities" value="Humanities" />
                    <Picker.Item label="Social Sciences" value="Social Sciences" />
                    <Picker.Item label="Medicine" value="Medicine" />
                    <Picker.Item label="Law" value="Law" />
                    <Picker.Item label="Business" value="Business" />
                </Picker>
            </Card>
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What are you looking for?</Text>
            <Card style={{ alignSelf: 'stretch', margin: 10, padding: 25, borderRadius: 10 }}>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue, itemIndex) =>
                        setType(itemValue)
                    }
                    style={{
                        marginTop: -50,
                        paddingBlock: 10,
                    }}

                    selectionColor="#825C96"
                    itemStyle={{
                        color: '#825C96',

                    }}>
                    <Picker.Item label="Internship" value="Internship" />
                    <Picker.Item label="Job" value="Job" />
                    <Picker.Item label="Project" value="Project" />
                    <Picker.Item label="Research" value="Research" />
                    <Picker.Item label="Volunteering" value="Volunteering" />
                    <Picker.Item label="Contests" value="Contests" />
                </Picker>
            </Card>
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What type of opportunities are you interested in?</Text>
            <Card style={{ alignSelf: 'stretch', margin: 10, padding: 25, borderRadius: 10 }}>
                <Picker
                    selectedValue={opportunities}
                    onValueChange={(itemValue, itemIndex) =>
                        setOpportunities(itemValue)
                    }
                    style={{
                        marginTop: -50,
                        paddingBlock: 10,
                    }}

                    selectionColor="#825C96"
                    itemStyle={{
                        color: '#825C96',

                    }}>
                    <Picker.Item label="In my country" value="In my country" />
                    <Picker.Item label="Foreign countries" value="Foreign countries" />
                    <Picker.Item label="Online" value="Online" />
                </Picker>
            </Card>
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What is your preferred work style?</Text>
            <Card style={{ alignSelf: 'stretch', margin: 10, padding: 25, borderRadius: 10 }}>
                <Picker
                    selectedValue={workstyle}
                    onValueChange={(itemValue, itemIndex) =>
                        setWorkstyle(itemValue)
                    }
                    style={{
                        marginTop: -50,
                        paddingBlock: 10,
                    }}

                    selectionColor="#825C96"
                    itemStyle={{
                        color: '#825C96',

                    }}>
                    <Picker.Item label="Working with people" value="Working with people" />
                    <Picker.Item label="Solving complex problems" value="Solving complex problems" />
                    <Picker.Item label="Being creative" value="Being creative" />
                    <Picker.Item label="Leading projects" value="Leading projects" />
                    <Picker.Item label="Helping others" value="Helping others" />
                </Picker>
            </Card>
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What are a few things you feel you're naturally good at?</Text>
            <TextInput
                mode="outlined"
                style={inputStyle}
                label="Ex: Communication, math, design, etc."
                value={skillsstrengths}
                onChangeText={(skillsstrengths: string) => setSkillsStrengths(skillsstrengths)}
            />
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '6%', marginBottom: '6%' }}>What motivates you most when choosing a career?</Text>
            <TextInput
                mode="outlined"
                style={inputStyle}
                label="Ex: Money, helping others, creativity, etc."
                value={motivations}
                onChangeText={(motivations: string) => setMotivations(motivations)}
            />
            {/* <TouchableOpacity
                style={styles.purpleButton}
                onPress={() => {
                    console.log("Purple Button Pressed!");
                    navigation.navigate('Main');
                }}
            >
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.purpleButton}
                onPress={async () => {
                    const userData = {
                    email,
                    password,
                    firstname,
                    lastname,
                    country,
                    interests,
                    type,
                    opportunities,
                    workstyle,
                    skillsstrengths,
                    motivations
                    };

                    try {
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    console.log("User data saved locally!");
                    navigation.navigate('Main');
                    } catch (e) {
                    console.error("Failed to save user data", e);
                    }
                }}
                >
                <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    purpleButton: {
        backgroundColor: '#B191E3',
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
        margin: 10,
        marginBottom: 30,

    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    texttitlu: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 70,
        color: '#FFFFFF',
    },
});
export default RegisterScreen;