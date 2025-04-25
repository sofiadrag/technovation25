import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import data from "../data/mock_api.json";

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(
    null
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      `${item.contact.firstName} ${item.contact.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      item.location.city.toLowerCase().includes(query.toLowerCase()) ||
      item.location.country.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleShowDetails = (item: any) => {
    setSelectedOpportunity(item);
  };

  const handleBack = () => {
    setSelectedOpportunity(null);
  };

  const navigateToChat = (user) => {
    const userName = `${user.contact.firstName} ${user.contact.lastName}`;
    navigation.navigate("Home", { userName });
  };

  if (selectedOpportunity) {
    return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginTop: 60 }}>
        <View style={styles.DetailsContainer}>
          <Text style={styles.DetailsLabel}>{selectedOpportunity.label}</Text>
          <View style={styles.ContactRow}>
            <Avatar.Image
              size={80}
              source={{
                uri: selectedOpportunity.photo || `https://randomuser.me/api/portraits/men/1.jpg`,
              }}
            />
            <Text style={styles.Contact}>
              {selectedOpportunity.contact.firstName}{" "}
              {selectedOpportunity.contact.lastName}
            </Text>
          </View>
          <Text style={styles.Email}>
            <Text style={styles.Bold}>Email:</Text>{" "}
            {selectedOpportunity.contact.email}
          </Text>
          <Text style={styles.Phone}>
            <Text style={styles.Bold}>Phone:</Text>{" "}
            {selectedOpportunity.contact.phone}
          </Text>
          <Text style={styles.Location}>
            <Text style={styles.Bold}>Address:</Text>{" "}
            {selectedOpportunity.location.address},{" "}
            {selectedOpportunity.location.city},{" "}
            {selectedOpportunity.location.country}
          </Text>
          {selectedOpportunity.description && (
            <View style={styles.DescriptionContainer}>
              <Text style={styles.Bold}>Description:</Text>
              <Text style={styles.Description}>{selectedOpportunity.description}</Text>
            </View>
          )}
          <Button mode="contained" onPress={handleBack} style={styles.BackButton}>
            Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginTop: 60 }}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.Searchbar}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />

      <ScrollView>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.Rectangle}>
            <Text style={styles.Label}>{item.label}</Text>
            <View style={styles.ContactRow}>
              <Avatar.Image
                size={40}
                source={{
                  uri: item.photo || `https://randomuser.me/api/portraits/men/${index}.jpg`,
                }}
              />
              <Text style={styles.Contact}>
                {item.contact.firstName} {item.contact.lastName}
              </Text>
            </View>
            <Text style={styles.Email}>
              <Text style={styles.Bold}>Email:</Text> {item.contact.email}
            </Text>
            <Text style={styles.Phone}>
              <Text style={styles.Bold}>Phone:</Text> {item.contact.phone}
            </Text>
            <Text style={styles.Location}>
              <Text style={styles.Bold}>Address:</Text> {item.location.address},{" "}
              {item.location.city}, {item.location.country}
            </Text>
            <Button
              mode="contained"
              onPress={() => handleShowDetails(item)}
              style={styles.DetailsButton}
            >
              View Details
            </Button>
            <Button
              mode="text"
              onPress={() => navigateToChat(item)}
              style={styles.ChatButton}
              labelStyle={{ color: "#FFFFFF" }}
              theme={{ colors: { primary: "#FFFFFF" } }}
            >
              Chat
            </Button>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Searchbar: {
    borderColor: "#57525B",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#825C96",
    marginBottom: 20,
  },
  Rectangle: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#DBCCF1",
  },
  Label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  ContactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  Contact: {
    fontSize: 14,
    marginLeft: 10,
    flexWrap: "wrap",
  },
  Email: {
    fontSize: 14,
    marginBottom: 5,
    flexWrap: "wrap",
  },
  Phone: {
    fontSize: 14,
    marginBottom: 5,
    flexWrap: "wrap",
    marginTop: 5,
  },
  Location: {
    fontSize: 14,
    flexWrap: "wrap",
    marginTop: 5,
  },
  Description: {
    fontSize: 14,
    marginTop: 10,
    flexWrap: "wrap",
  },
  Bold: {
    fontWeight: "bold",
  },
  DetailsButton: {
    marginTop: 10,
    backgroundColor: "#825C96",
    borderColor: "white",
    borderWidth: 0.5,
  },
  ChatButton: {
    marginTop: 10,
    backgroundColor: "#825C96",
    height: 40,
    borderColor: "white",
    borderWidth: 0.5,
  },
  DetailsContainer: {
    flex: 1,
    padding: 20,
  },
  DetailsLabel: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  BackButton: {
    marginTop: 40,
    backgroundColor: "#825C96",
    padding: 10,
    borderColor: "white",
    borderWidth: 0.5,
  },
  DescriptionContainer: {
    marginTop: 25,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
});