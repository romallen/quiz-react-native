import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeScreen({ navigation }) {
  const handlePlayPress = () => {
    console.log("Go to handlePlayGamePress");
    navigation.navigate("SetupScreen")
    //props.setCurrentView("PlayGame");
  };
  const handleQuestionBankPress = () => {
    console.log("Go to QuestionBankPress");
    navigation.navigate("QuestionBankScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome to Quiz React!!!</Text>

      <Button
        style={styles.button}
        onPress={handlePlayPress}
        title="PLAY"
        color="#841584"
        accessibilityLabel="Setup the game!"
      />

      <Button
        style={styles.button}
        onPress={handleQuestionBankPress}
        title="Question Bank"
        color="#841584"
        accessibilityLabel="Get, delete, edit and create questions"
      />
    </View>
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
