import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MainLayout = ({ children }: any) => {

    const [user, setUser] = useState<{ displayName: string, email: string }>({displayName: 'Jane', email: 'jane@somewhere.com'});

    const navigation = useNavigation() as any;


    return (
        user ? <SafeAreaView>
            {/* <Appbar.Header> */}
                {/* <Appbar.Action icon="logout" onPress={async () => { navigation.navigate('Login') }} /> */}
                {/*<Appbar.Content title="Home" /> {/* Added title to Appbar */}
            {/* </Appbar.Header> */}
            <View style={{ alignSelf: 'stretch', backgroundColor: 'F5F9C8', height: '80%', display: 'flex', flexDirection: 'column' }}>{children}</View>

        </SafeAreaView> :
            <ActivityIndicator />
    );
}

export default MainLayout;