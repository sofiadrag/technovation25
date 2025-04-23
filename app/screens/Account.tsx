import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import ItemEditScreen from "./ItemEdit";
import ItemListScreen from "./ItemList";
import MainLayout from "./Layout";
import { Paragraph } from "react-native-paper";

//https://reactnavigation.org/docs/hello-react-navigation
const ItemStack = createNativeStackNavigator();

const AccountScreen = () => {
    return (
       <View style={styles.container}>
         <Text style={styles.title}>My Account</Text>
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>
      <Text style={styles.cv}>C.V.</Text>
      <Text style={styles.cv}>Experience:</Text>
      <Button title="Edit Profile" onPress={() => alert('Edit Profile')} />
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
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
    },
    email: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 20,
    },
    cv: {
        fontSize:17,
        marginRight:250,
    }
  });

export default AccountScreen;