import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";


export default function WelcomeScreen(props) {
  const handlePlayGamePress = () => {
    console.log("Go to handlePlayGamePress");
    //props.setCurrentView("GameSetup")
    props.setCurrentView("PlayGame");
  };
  const handleQuestionBankPress = () => {
    console.log("Go to QuestionBankPress");
    props.setCurrentView("QuestionBank");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome to Quiz React!!!</Text>

      <Button
        style={styles.button}
        onPress={handlePlayGamePress}
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