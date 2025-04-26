import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons
import { Avatar } from 'react-native-paper'; // Import Avatar from react-native-paper


const ChatScreen = ({ route, navigation }) => {
    const { userName } = route.params; // Get the user's name from navigation params
    const [allMessages, setAllMessages] = useState<{ [key: string]: { id: string; text: string }[] }>({}); // State to store messages for all users
    const [input, setInput] = useState(''); // State to store the current input

    const userMessages = allMessages[userName] || []; // Get messages for the current user

    const sendMessage = () => {
        if (input.trim()) {
            const newMessage = { id: Date.now().toString(), text: input };
            const updatedMessages = { ...allMessages, [userName]: [...userMessages, newMessage] };
            setAllMessages(updatedMessages); // Update the messages for the current user
            setInput(''); // Clear the input field
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust for iOS or Android
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        {/* Avatar */}
                        <Avatar.Image
                            size={50}
                            source={{
                                uri: `https://randomuser.me/api/portraits/men/${userName.length % 100}.jpg`,
                            }}
                            style={[styles.avatar, { backgroundColor: "#FFFFFF" }]}
                        />

                        {/* Header Text */}
                        <Text style={styles.headerText}>Chat with {userName}</Text>
                        {/* Back Button */}
                        <View style={styles.backButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Messages List */}
                    <FlatList
                        data={userMessages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.message}>
                                <Text style={styles.messageText}>{item.text}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.messagesContainer}
                    />

                    {/* Input Field */}
                    <View style={styles.inputContainer}>
                        {/* Attachments Button */}
                        <TouchableOpacity style={styles.attachmentsButton} onPress={() => console.log('Attachments pressed')}>
                            <Icon name="attach-file" size={24} color="#825C96"/> {/* Attach file icon */}
                        </TouchableOpacity>

                        {/* Text Input */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Type a message..."
                            value={input}
                            onChangeText={setInput}
                        />

                        {/* Send Button */}
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                input.trim() === '' && styles.disabledSendButton, // Apply disabled style if input is empty
                            ]}
                            onPress={sendMessage}
                            disabled={input.trim() === ''} // Disable button if input is empty
                        >
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    innerContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#825C96',
    },
    backButtonContainer: {
        backgroundColor: '#DBCCF1', // Light purple background
        borderRadius: 10, // Rounded corners
        padding: 10, // Padding inside the container
        marginRight: -10,
        marginTop: 15, // Space above the button
    },
    backButtonText: {
        color: '#FFF', // White text color
        fontSize: 16,
    },
    avatar: {
        marginRight: -7.5,
        marginTop: 15, // Space above the avatar
    },
    headerText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, // Allow the text to take up remaining space
        textAlign: 'center', // Center-align the text
        marginTop: 15, // Space above the text
    },
    messagesContainer: {
        flexGrow: 1,
        padding: 10,
    },
    message: {
        backgroundColor: '#DBCCF1',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#CCC',
        backgroundColor: '#FFF',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#825C96',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    disabledSendButton: {
        backgroundColor: '#CCC', // Grey out the button when disabled
    },
    sendButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    attachmentsButton: {
        marginRight: 10,
    },
    attachmentsIcon: {
        fontSize: 20,
    },
    Avatar: {
        marginRight: 20,
    },
});

export default ChatScreen;