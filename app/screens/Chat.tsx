import React, { useEffect, useState } from 'react';
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
    Image,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Card } from 'react-native-paper';
import Data from '../data/mock_api.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
type RootStackParamList = {
    Chat: { id: string };
    Main: undefined;
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

const ChatScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [allMessages, setAllMessages] = useState<{ [key: string]: { id: string; text: string }[] }>({});
    const [input, setInput] = useState('');
    const [user, setUser] = useState<any | undefined>();
    const [userMessages, setUserMessages] = useState<any[]>([]);

    useEffect(() => {
        if (!(route.params as any)?.id) return;
        setUser(Data.find((user) => user.id === (route.params as any)?.id));
        console.log("id", (route.params as any)?.id);

        const fetchMessages = async () => {
            const storedMessages = await AsyncStorage.getItem('messages');
            if (storedMessages) {
                const parsedMessages = JSON.parse(storedMessages);
                setAllMessages(parsedMessages);
                setUserMessages(parsedMessages[(route.params as any)?.id] || []); // Ensure userMessages is an array
            } else {
                setAllMessages({});
                setUserMessages([]);
            }
        };

        fetchMessages();
    }, [(route.params as any)?.id]);

    const sendMessage = () => {
        if (input.trim()) {
            const newMessage = { id: Date.now().toString(), text: input };
            const updatedMessages = {
                ...allMessages,
                [(route.params as any)?.id]: [...(userMessages || []), newMessage],
            };
            setAllMessages(updatedMessages);
            setUserMessages([...(userMessages || []), newMessage]);
            setInput('');
        }
    };

    const onBackButtonPress = async () => {
        await AsyncStorage.setItem('messages', JSON.stringify(allMessages));
        navigation.navigate('Main' as never);
    };

    const wipeAllMessages = async () => {
        try {
            await AsyncStorage.removeItem('messages');
            setAllMessages({});
            setUserMessages([]);
            console.log("All messages wiped successfully!");
        } catch (error) {
            console.error("Error wiping messages:", error);
        }
    };

    const [pdfUri, setPdfUri] = useState<string | null>(null);

    const pickPDF = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
            copyToCacheDirectory: true,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setPdfUri(uri);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <Card>
                        <View style={styles.header}>
                            <Avatar.Image
                                size={50}
                                source={{
                                    uri: user?.photo,
                                }}
                                style={[styles.avatar, { backgroundColor: "#FFFFFF" }]}
                            />
                            <Text style={styles.headerText}>{user?.contact.firstName} {user?.contact.lastName}</Text>
                            <TouchableOpacity onPress={onBackButtonPress} style={styles.backButtonContainer}>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                    <View>
                        <TouchableOpacity onPress={wipeAllMessages}>
                            <Text style={styles.backButtonText}>Wipe All Messages</Text>
                        </TouchableOpacity>
                    </View>
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
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            style={styles.attachmentsButton}
                            onPress={pickPDF}
                        >
                            <Icon name="attach-file" size={24} color="#825C96" />
                        </TouchableOpacity>
                        {pdfUri && (
                            <View style={styles.webViewContainer}>
                                <WebView
                                    source={{ uri: pdfUri }}
                                    style={styles.webView}
                                    originWhitelist={['*']}
                                    useWebKit={true}
                                    javaScriptEnabled={true}
                                />
                            </View>
                        )}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Type a message..."
                            placeholderTextColor="#825C96"
                            value={input}
                            onChangeText={setInput}
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                input.trim() === '' && styles.disabledSendButton,
                            ]}
                            onPress={sendMessage}
                            disabled={input.trim() === ''}
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
        paddingHorizontal: 20,
        backgroundColor: '#825C96',
        height: 130,
    },
    backButtonContainer: {
        backgroundColor: '#DBCCF1',
        borderRadius: 20,
        padding: 12,
        marginLeft: 10,
        marginTop: 30,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    avatar: {
        marginRight: 10,
        marginTop: 30,
    },
    headerText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginTop: 30,
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
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#CCC',
        backgroundColor: '#FFF',
        height: 100,
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
        backgroundColor: '#CCC',
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
    webViewContainer: {
        width: Dimensions.get("window").width - 20,
        height: 400,
        marginTop: 20,
    },
    webView: {
        flex: 1,
    },
});

export default ChatScreen;