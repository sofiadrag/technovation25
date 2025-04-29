import React from 'react';
import { ScrollView, StyleSheet, Linking } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';

type Opportunity = {
  id: string;
  name: string;
  description: string;
  link: string;
};

const opportunities: Opportunity[] = [
  {
    id: '1',
    name: 'Frontend Internship',
    description: 'Build beautiful UIs with React and TypeScript.',
    link: 'https://example.com/frontend',
  },
  {
    id: '2',
    name: 'AI Bootcamp',
    description: 'Master machine learning in 12 weeks.',
    link: 'https://example.com/ai',
  },
  {
    id: '3',
    name: 'Girls Who Code Summer Program',
    description: 'Become a GWC Scholar to learn Game Design and Data Science.',
    link: 'https://example.com/gwc',
  }
];

const FeedScreen = () => {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
    style={{ backgroundColor: 'F5F938' }}
    contentContainerStyle={[styles.container, { flexGrow: 1 }]}
    >
      <Text style={styles.title}>My Feed</Text>
      {opportunities.map((opp) => (
        <Card key={opp.id} style={styles.card}>
          <Card.Content>
            <Title>{opp.name}</Title>
            <Paragraph>{opp.description}</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Button
           mode="contained"
           buttonColor="#B191E3"
           onPress={() => handleOpenLink(opp.link)}
          >
           Read More
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
    backgroundColor: 'F5F938',
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
    backgroundColor: '#DBCCF1',
    padding: 10,
  },
});

export default FeedScreen;
