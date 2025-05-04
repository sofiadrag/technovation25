import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { ScrollView, StyleSheet, Linking, View } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Avatar } from 'react-native-paper';

type Opportunity = {
  id: string;
  name: string;
  description: string;
  link: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
};

const opportunities: Opportunity[] = [
  {
    id: '1',
    name: 'Frontend Internship',
    description: 'Build beautiful UIs with React and TypeScript.',
    link: 'https://example.com/frontend',
    username: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    email: 'michael.brown@example.com',
    phone: '555-987-6543',
    address: '456 Developer Lane, Austin, USA',
  },
  {
    id: '2',
    name: 'AI Bootcamp',
    description: 'Master machine learning in 12 weeks.',
    link: 'https://example.com/ai',
    username: 'Sophia Davis',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    email: 'sophia.davis@example.com',
    phone: '555-876-5432',
    address: '789 AI Street, Palo Alto, USA',
  },
  {
    id: '3',
    name: 'Girls Who Code Summer Program',
    description: 'Become a GWC Scholar to learn Game Design and Data Science.',
    link: 'https://example.com/gwc',
    username: 'Emma Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    email: 'emma.wilson@example.com',
    phone: '555-765-4321',
    address: '123 Coding Avenue, New York, USA',
  },
];

const FeedScreen = ({ navigation }: any) => {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { flexGrow: 1 }]}
    >
      <Text style={styles.title}>My Feed</Text>
      {opportunities.map((opp) => (
        <Card key={opp.id} style={styles.card}>
          <Card.Content>
            <Title>
              <Text style={{ fontWeight: 'bold' }}>{opp.name}</Text>
            </Title>
            <Paragraph>{opp.description}</Paragraph>
            <View style={styles.userInfo}>
              <Avatar.Image size={40} source={{ uri: opp.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{opp.username}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>
                <Text style={styles.contactTitle}>Email:</Text> {opp.email}
              </Text>
              <Text style={styles.contactText}>
                <Text style={styles.contactTitle}>Phone:</Text> {opp.phone}
              </Text>
              <Text style={styles.contactText}>
                <Text style={styles.contactTitle}>Address:</Text> {opp.address}
              </Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              buttonColor="#825C96"
              onPress={() => handleOpenLink(opp.link)}
            >
              Read More
            </Button>
            <Button
              mode="outlined"
              textColor="white"
              onPress={async () => {
                const storedChatUsers = await AsyncStorage.getItem("chatUsers");
                const parsedChatUsers = JSON.parse(storedChatUsers || "[]");

                if (!parsedChatUsers.includes(opp.id)) {
                  const updatedChatUsers = [...parsedChatUsers, opp.id];
                  await AsyncStorage.setItem("chatUsers", JSON.stringify(updatedChatUsers));
                }
                navigation.navigate("Chat", { id: opp.id });
              }}
              style={styles.chatButton}
              buttonColor="#825C96"
            >
              Chat
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 15,
    width: '100%',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    backgroundColor: '#DBCCF1',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginTop: 10,
  },
  contactTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  chatButton: {
    marginLeft: 10,
  },
});

export default FeedScreen;
