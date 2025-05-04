import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";

const AccountScreen = () => {
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>

      <Button mode="outlined" textColor="#825C96" style={{ margin: 20 }} onPress={() => alert("Edit Profile")}>
        Edit Profile
      </Button>

      <Button
        mode="outlined"
        style={{ marginTop: 20, backgroundColor: "#825C96" }}
        textColor="#FFFFFF"
        onPress={pickPDF}>
        Upload PDF
      </Button>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 75,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  cv: {
    fontSize: 17,
    marginRight: 250,
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

export default AccountScreen;
