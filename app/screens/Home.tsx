import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Avatar, Card } from "react-native-paper";
import Data from "../data/mock_api.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined;
    Chat: { id: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: { navigation: HomeScreenNavigationProp; route: { params?: { id?: string } } }) {
    const [activeChats, setActiveChats] = useState<{ userName: string; avatar?: string, id: string }[]>([]);

    useEffect(() => {
        const fetchActiveChats = async () => {
            const storedChatUsers = await AsyncStorage.getItem("chatUsers");
            const parsedChatUsers = JSON.parse(storedChatUsers || "[]");
            setActiveChats(
                Data.filter((user) => parsedChatUsers.includes(user.id)).map((user) => ({
                    id: user.id,
                    userName: `${user.contact.firstName} ${user.contact.lastName}`,
                    avatar: user.photo,
                }))
            );
        };

        fetchActiveChats();
        const unsubscribe = navigation.addListener("focus", fetchActiveChats);
        return unsubscribe;
    }, [navigation]);

    // Uncomment this function to clear chat history

    {/*const clearChatHistory = async () => {
        await AsyncStorage.removeItem("chatUsers");
        setActiveChats([]);
    };
    */}

    const navigateToChat = (user: { userName?: string; avatar?: string | undefined; id: any; }) => {
        navigation.navigate("Chat", { id: user.id });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerGreeting}>Hello</Text>
                <Text style={styles.headerName}>John Doe</Text>
            </View>
            <FlatList
                data={activeChats}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <Avatar.Image
                                size={40}
                                source={{ uri: item.avatar }}
                                style={styles.avatar}
                            />
                            <Text style={styles.chatName}>{item.userName}</Text>
                            <Button
                                mode="text"
                                onPress={() => navigateToChat(item)}
                                style={styles.chatButton}
                                labelStyle={styles.chatButtonText}
                            >
                                Open Chat
                            </Button>
                            {/* Uncomment this button to clear chat history */}
                            {/*<Button
                                mode="text"
                                onPress={() => { clearChatHistory(); }}
                                style={styles.clearButton}
                                labelStyle={styles.clearButtonText}              
                            >
                                Wipe all user data
                            </Button>*/}

                        </View>
                    </Card>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No active chats</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    card: {
        marginBottom: 15,
        width: "100%",
        borderRadius: 10,
        elevation: 3,
        padding: 10,
        backgroundColor: "#DBCCF1",
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        backgroundColor: "#825C96",
        marginRight: 10,
    },
    chatName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
    },
    chatButton: {
        backgroundColor: "#825C96",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    chatButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 20,
    },
    header: {
        backgroundColor: "#F5F5F5",
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomColor: "#DDD",
        borderBottomWidth: 1,
    },
    headerGreeting: {
        fontSize: 20,
        color: "#999",
        textAlign: "left",
    },
    headerName: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        textAlign: "left",
    },
    clearButton: {
        marginTop: 10,
        backgroundColor: "#FF6F61",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    clearButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});