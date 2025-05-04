import React, { useState } from "react";

import {
  View,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { fetchGeminiResponse } from "../../utils/geminiApi";

const ChatAIScreen = () => {
  const [messages, setMessages] = useState([{ sender: "user", text: "" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev: any) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const aiText = await fetchGeminiResponse(input);
    const aiMessage = { sender: "ai", text: aiText };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <ScrollView
            style={styles.chatContainer}
            contentContainerStyle={[styles.messagesContainer, { flexGrow: 1 }]}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.message,
                  msg.sender === "user" ? styles.userMessage : styles.aiMessage,
                ]}
              >
                <Text selectable style={styles.messageText}>{msg.text}</Text>
              </View>
            ))}
            {loading && <ActivityIndicator size="small" color="#825C96" />}
          </ScrollView>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Ask a question"
              placeholderTextColor="#825C96"
            />
            <Button title="Send" color='#825C96' onPress={sendMessage} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatAIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  innerContainer: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    padding: 10,
    marginTop: 40,
    alignContent: "flex-start",
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#DBCCF1",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#A884B3",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
});
