import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";

import HomeScreen from "./app/screens/homeScreen";
import PlayScreen from "./app/screens/playScreen";
import SetupScreen from "./app/screens/setupScreen";
import ManBoardSetupScreen from "./app/screens/manBoardSetupScreen";
import QuestionBankScreen from "./app/screens/QuestionBankScreen";

import { Provider } from "react-redux";
import store from "./app/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = extendTheme({
    // fontSizes: {
    //   base: 0,
    //   sm: 580,
    //   md: 888,
    //   lg: 992,
    //   xl: 1280,},
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SetupScreen"
              component={SetupScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManBoardSetupScreen"
              component={ManBoardSetupScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlayScreen"
              component={PlayScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuestionBankScreen"
              component={QuestionBankScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
