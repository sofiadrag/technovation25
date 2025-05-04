import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = ({ navigation }: any) => {
  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('Login'); 
    } catch (e) {
      console.error('Failed to save onboarding status:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        At [Your App Name], we believe your career should fit you — not the other way around.
      </Text>

      <Text style={styles.body}>
        Our AI-powered guide helps you discover your passions, connect with the right universities, internships, and job opportunities, and build a CV that gets you noticed.
        {"\n\n"}From finding your first internship to landing your dream job, we’re with you every step of the way.
        {"\n\n"}Start today — your journey to success begins now.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111',
    marginBottom: 20,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#825C96',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});
