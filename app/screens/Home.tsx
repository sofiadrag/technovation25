import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Avatar } from "react-native-paper";

export default function HomeScreen({ navigation, route }) {
    const [activeChats, setActiveChats] = useState<{ userName: string; avatar?: string }[]>([]);

    // Check if a new chat user is passed from the SearchScreen
    if (route.params?.userName) {
        const userName = route.params.userName;
        const avatar = route.params.avatar; // Include avatar if provided
        const chatExists = activeChats.some((chat) => chat.userName === userName);

        if (!chatExists) {
            setActiveChats((prevChats) => [...prevChats, { userName, avatar }]);
        }
    }

    const navigateToChat = (userName: string) => {
        navigation.navigate("Chat", { userName });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerGreeting}>Hello</Text>
                <Text style={styles.headerName}>Delia</Text>
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
                            onPress={() => navigateToChat(item.userName)}
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