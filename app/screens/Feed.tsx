import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import ItemEditScreen from "./ItemEdit";
import ItemListScreen from "./ItemList";
import MainLayout from "./Layout";
import { Paragraph } from "react-native-paper";

//https://reactnavigation.org/docs/hello-react-navigation
const ItemStack = createNativeStackNavigator();

const ItemScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>My Feed</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 75,
      paddingLeft: 10,
      paddingRight:10,
      alignItems: 'center',
      backgroundColor: '#fff',
      
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
    }
  });
export default ItemScreen;