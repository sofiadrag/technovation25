import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './app/screens/Login';
import MainNavigator from './app/screens/Main';
import RegisterScreen from './app/screens/Register';
import OnboardingScreen from './app/screens/Onboarding';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatScreen from './app/screens/Chat';

if (typeof globalThis.setImmediate === undefined) {
  globalThis.setImmediate = setTimeout as any;
}
const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#825C96',
    accent: 'yellow',
  },
  font: {
    regular: 'Roboto',
  }
};

// function App() {
//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
//           {/* <Stack.Screen
//             name="Chat"
//             component={(props: any) => <ChatScreen {...props} />}
//             options={{ headerShown: false }}
//           /> */}
//           <Stack.Screen
//             name="Chat"
//             component={ChatScreen}
//             options={{ headerShown: false }}
//             />

//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

function App() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      setShowOnboarding(seen === null); 
      setLoading(false);
    };
    checkOnboarding();
  }, []);

  if (loading) return null; 

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={showOnboarding ? 'Onboarding' : 'Login'}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


export default App;