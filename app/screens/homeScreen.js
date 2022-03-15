import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Box, Button, Container } from 'native-base';

export default function HomeScreen({ navigation }) {
  const handlePlayPress = () => {
    console.log("Go to handlePlayGamePress");
    navigation.navigate("SetupScreen")
  };
  const handleQuestionBankPress = () => {
    console.log("Go to QuestionBankPress");
    navigation.navigate("QuestionBankScreen");
  };

  return (
    <Container alignItems="center">
    
      <Text fontSize="6xl">Welcome to Quiz React!!!</Text>

      <Button onPress={handlePlayPress} size="lg"  > 
      PLAY
       </Button>

      <Button  onPress={handleQuestionBankPress} size="lg" >
         Question Bank
         </Button>
  </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //backgroundColor: "#ddf",
  },
  greeting: {
    flex: 1,
    fontSize: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    fontSize: 40,
    paddingBottom: 20,
     alignItems: "center",
    justifyContent: "center",
  },
});
