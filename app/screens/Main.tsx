import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatAIScreen from "./ChatAI";
import SearchScreen from "./Search";
import FeedScreen from "./Feed";
import HomeScreen from "./Home";
import AccountScreen from "./Account";
import ChatScreen from "./Chat";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator({
    screens: {
        Home: HomeScreen,
        Feed: FeedScreen,
        ChatAI: ChatAIScreen,
        Search: SearchScreen,
        Account: AccountScreen, 
    }
});
const MainNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: "#825C96", 
            tabBarInactiveTintColor: "grey",
        }}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Entypo name="home" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Feed"
            component={FeedScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Feed',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="auto-awesome-mosaic" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="ChatAI"
            component={ChatAIScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color }) => (
                    <Entypo name="chat" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Search',
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="search" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Account',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="account-circle" size={24} color="grey" />
                ),
            }}
        />
        <Tab.Screen
            name="Chat"
            component={({ route, navigation }: { route: any; navigation: import('@react-navigation/native').NavigationProp<any> }) => <ChatScreen route={route} navigation={navigation} />}
            options={{
                headerShown: false,
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="chat" size={24} color="grey" />
                ),
            }}
        />
    </Tab.Navigator>
);




export default MainNavigator;