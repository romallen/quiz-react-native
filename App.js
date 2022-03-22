import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";

import HomeScreen from "./app/screens/homeScreen";
import PlayScreen from "./app/screens/playScreen";
import SetupScreen from "./app/screens/setupScreen";
import ManBoardSetupScreen from "./app/screens/manBoardSetupScreen";
import QuestionBankScreen from "./app/screens/QuestionBankScreen";
import SignInScreen from "./app/screens/signInScreen";
import SignUpScreen from "./app/screens/signUpScreen";

import { Provider } from "react-redux";
import store from "./app/redux/store";

import * as Realm from "realm-web";
import { realmApp } from "./app/realm/realm";

const Stack = createNativeStackNavigator();

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  // useEffect(async () => {
  //   if (loading) {
  //     try {
     
  //       const client = realmApp.currentUser.mongoClient("mongodb-atlas");
  //       const cat = client.db("quizapp").collection("categories");
  //     } catch (err) {
  //       console.error("Failed to log in", err);
  //     }

  //     setData(await cat.find());
  //     setLoading(false);
  //   }
  // }, [loading]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignInScreen">
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
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
