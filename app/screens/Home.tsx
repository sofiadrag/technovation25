import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Avatar } from "react-native-paper";
import Data from "../data/mock_api.json"; // Import user data from mock_api.json
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation, route }) {
    const [activeChats, setActiveChats] = useState<{ userName: string; avatar?: string, id: string }[]>([]);

    useEffect(() => {
        AsyncStorage.getItem("chatUsers").then((chatUsers) => {
            const parsedChatUsers = JSON.parse(chatUsers || "[]") || [];
            setActiveChats(Data
                .filter((user) => parsedChatUsers.some((chatUser) => chatUser === user.id))
                .map(user => ({ id: user.id, userName: user.contact.firstName + ' ' + user.contact.lastName, avatar: user.photo })) // Map the filtered users to the desired format
            ); 
        }
        )
    }, [route.params?.id]); // Update the active chats when the component mounts or when the user ID changes

    const navigateToChat = (user) => {
        navigation.navigate("Chat", { id: user.id }); // Navigate to the Chat screen with the user's ID
    };
    const wipeAllUsers = async () => {
        await AsyncStorage.removeItem("chatUsers"); // Clear all chat users from AsyncStorage
        setActiveChats([]);
    };
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerGreeting}>Hello</Text>
                <Text style={styles.headerName}>Delia</Text>
                {/* Wipe All Users Button */}
                <Button mode="text" onPress={wipeAllUsers} style={styles.wipeButton}>
                    Wipe All Users
                </Button>
            </View>
            <FlatList
                data={activeChats}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.chatRow}>
                        <Avatar.Image
                            size={40}
                            source={{ uri: item.avatar }} // Use the avatar URL from the user data
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
                    </View>
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
    chatRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#DBCCF1",
        borderRadius: 10,
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
        borderRadius: 5,
    },
    chatButtonText: {
        color: "#FFF", // Make the text white
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 20,
    },
});