import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MainLayout = ({ children }: any) => {
    const [user, setUser] = useState<{ displayName: string, email: string }>({ displayName: 'User', email: '' });
    const navigation = useNavigation() as any;

    return (
        user ? (
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.Content title={`Welcome, ${user.displayName || user.email}`} />
                    <Appbar.Action icon="logout" onPress={async () => { navigation.navigate('Login') }} />
                </Appbar.Header>
                <ScrollView style={{ alignSelf: 'stretch', backgroundColor: '#F5F9C9', height: '80%', display: 'flex', flexDirection: 'column' }}>
                    <Text style={styles.texttitlu}> Required Information</Text>
                    <Text style={styles.continut}>
                        Question 1{'\n'}
                        Question 2{'\n'}
                        Question 3{'\n'}
                        Question 4{'\n'}
                        Question 5{'\n'}
                        Question 6{'\n'}
                        Question 7{'\n'}
                        Question 8{'\n'}
                        Question 9{'\n'}
                        Question 10{'\n'}
                    </Text>
                    {children}
                    {/* Purple Button */}
                    <TouchableOpacity
                        style={styles.purpleButton}
                        onPress={() => {
                            console.log("Purple Button Pressed!");
                        }}
                    >
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        ) : (
            <ActivityIndicator />
        )
    );
};

const styles = StyleSheet.create({
    texttitlu: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#B191E3",
        marginTop: 50,
    },
    continut: {
        marginTop: 75,
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20,
        lineHeight: 50,
    },
    purpleButton: {
        backgroundColor: '#B191E3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
        marginTop: 350,
    },
    buttonText: {
        fontSize: 16,
    },
});

export default MainLayout;