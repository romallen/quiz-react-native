import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";

import HomeScreen from "./app/screens/homeScreen";
import PlayScreen from "./app/screens/playScreen";
import SetupScreen from "./app/screens/setupScreen";
import CreateBoardScreen from "./app/screens/createBoardScreen";
import ManBoardSetupScreen from "./app/screens/manBoardSetupScreen";
import SelSavedCatScreen from "./app/screens/selSavedCatScreen";
import SignInScreen from "./app/screens/signInScreen";
import SignUpScreen from "./app/screens/signUpScreen";

import { Provider } from "react-redux";
import store from "./app/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = {
    colors: {
      primary: "#00aaff",
    },
  };

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{ headerShown: false, title: "Sign In" } }
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false, title: "Sign  Up" } }
            />
            <Stack.Screen
              name="SetupScreen"
              component={SetupScreen}
              options={{ headerShown: false , title: "Setup" }}
            />
              <Stack.Screen
              name="CreateBoardScreen"
              component={CreateBoardScreen}
              options={{ headerShown: false, title: "Setup" } }
            />
             <Stack.Screen
              name="SelSavedCatScreen"
              component={SelSavedCatScreen}
              options={{ headerShown: false, title: "Setup" } }
            />
            <Stack.Screen
              name="ManBoardSetupScreen"
              component={ManBoardSetupScreen}
              options={{ headerShown: false, title: "Setup" } }
            />
            <Stack.Screen
              name="PlayScreen"
              component={PlayScreen}
              options={{ headerShown: false, title: "Play" } }
            />
        
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
