import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MainLayout = ({ children }: any) => {

    const [user, setUser] = useState<{ displayName: string, email: string }>({displayName: 'Jane', email: 'jane@somewhere.com'});

    const navigation = useNavigation() as any;


    return (
        user ? (
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.Content title={`Welcome, ${user.displayName || user.email}`} />
                    <Appbar.Action icon="logout" onPress={async () => { navigation.navigate('Login') }} />
                </Appbar.Header>
                <View style={{ alignSelf: 'stretch', backgroundColor: '#FFFFFF', height: '80%', display: 'flex', flexDirection: 'column' }}>
                </View>
            </SafeAreaView>
        ) : (
            <ActivityIndicator />
        )
    );
};
export default MainLayout;