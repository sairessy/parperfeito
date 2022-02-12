import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Font from "expo-font";

// Screens
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import PublicProfile from "./src/screens/PublicProfile";
import SignUp from "./src/screens/SignUp";
import Recovery from "./src/screens/Recovery";
import Loader from "./src/screens/Loader";
import Terms from "./src/screens/Terms";
import Settings from "./src/screens/Settings";
import LoginMode from "./src/screens/LoginMode";
import HomeVisitor from "./src/screens/HomeVisitor";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFont = async () => {
    await Font.loadAsync({
      "main": require("./assets/fonts/RobotoCondensed-Regular.ttf"),
      "title": require("./assets/fonts/Quintessential-Regular.ttf")
    });

    setFontLoaded(true);
  }

  useEffect(() => {
    loadFont();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loader" component={Loader} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Recovery" component={Recovery} options={{headerShown: false}}/>
        <Stack.Screen name="PublicProfile" component={PublicProfile} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Terms" component={Terms} options={{title: "Termos e privacidade"}}/>
        <Stack.Screen name="Settings" component={Settings} options={{title: "Configurações"}}/>
        <Stack.Screen name="LoginMode" component={LoginMode} options={{headerShown: false}}/>
        <Stack.Screen name="HomeVisitor" component={HomeVisitor} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}