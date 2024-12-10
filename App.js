import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider, VStack, useColorModeValue, useColorMode, useTheme, View } from 'native-base';
import theme from './theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/screens/Home';
import Reports from './src/screens/Reports';
import Monitor from './src/screens/Monitor';
import Profile from './src/screens/Profile';
import Config from './src/screens/Config';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ProfileSummary from './src/screens/ProfileSummary';
import ForgotPassword from './src/screens/ForgotPass';
import Activity from './src/screens/Activity';
import Sensors from './src/screens/Sensors';
import { SafeAreaView } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTab = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const activeTintColor = colorMode === 'dark' ? theme.colors.indigo[400] : 'blue';
  const inactiveTintColor = colorMode === 'dark' ? theme.colors.coolGray[400] : 'black';

  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Reports') {
            iconName = 'document-text';
          } else if (route.name === 'Monitor') {
            iconName = 'bar-chart';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Config') {
            iconName = 'settings';
          }
          return <Ionicons
            name={iconName}
            size={size}
            color={focused ? activeTintColor : inactiveTintColor} />;
        },
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          backgroundColor: colorMode === 'dark' ? theme.colors.coolGray[900] : 'white',
        },
      })}>
      <Tab.Screen name="Reports" component={Reports} options={{ headerShown: false }} />
      <Tab.Screen name="Monitor" component={Monitor} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Tab.Screen name="Config" component={Config} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
  });
  const bgColor = useColorModeValue('light.background.50',
    'dark.background.900');
  const textColor = useColorModeValue('light.text.50', 'dark.text.50');

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer >
        <SafeAreaView style={{ flex: 1 }}>
          <VStack flex={1} bg={bgColor}>
            <Stack.Navigator initialRouteName={isAuthenticated ? "MainTab" :
              "Login"}>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {() => <Login setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
              <Stack.Screen name="Register" options={{ headerShown: false }}>
                {() => <Register setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
              <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />
              <Stack.Screen name="ProfileSummary" component={ProfileSummary} options={{ headerShown: false }} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
              <Stack.Screen name="Activity" component={Activity} options={{ headerShown: false }} />
              <Stack.Screen name="Sensors" component={Sensors} options={{ headerShown: false }} />
            </Stack.Navigator>
          </VStack>
        </SafeAreaView>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
