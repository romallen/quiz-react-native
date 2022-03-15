import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Text, Box, Button, Container, VStack } from 'native-base';

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
    <Box p={50} w={"100%"} height={"100%"} alignItems="center" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
    <VStack space={4}>
  
      <Text fontSize="6xl">QuizApp</Text>

  

      <Button onPress={handlePlayPress} size="lg"  > 
      PLAY
       </Button>

      <Button  onPress={handleQuestionBankPress} size="lg" >
         Question Bank
         </Button>
    </VStack>
  
  </Box>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     //backgroundColor: "#ddf",
//   },
//   greeting: {
//     flex: 1,
//     fontSize: 60,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   button: {
//     fontSize: 40,
//     paddingBottom: 20,
//      alignItems: "center",
//     justifyContent: "center",
//   },
// });
