import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Text, Box, Container } from 'native-base';

import HomeScreen from './app/screens/homeScreen';
import PlayScreen from './app/screens/playScreen'
import SetupScreen from './app/screens/setupScreen'
import QuestionBankScreen from './app/screens/QuestionBankScreen'

import { Provider } from 'react-redux'
import store from './app/redux/store'


const Stack = createNativeStackNavigator();

export default function App() {

  


  return (
    <NativeBaseProvider>
       {/* <Container> */}
      <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PlayScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SetupScreen" component={SetupScreen} options={{ title: 'Setup' }}/>
        <Stack.Screen name="PlayScreen" component={PlayScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="QuestionBankScreen" component={QuestionBankScreen} options={{title: 'Question Bank' }}/>
      </Stack.Navigator>
          
          
      </NavigationContainer>
      </Provider>
       
        {/* </Container> */}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
