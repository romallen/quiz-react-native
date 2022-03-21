import React from "react";
import { Text, Box, Button, Container, VStack } from "native-base";

export default function HomeScreen({ navigation }) {
  const handlePlayPress = () => {
    console.log("Go to handlePlayGamePress");
    navigation.navigate("SetupScreen");
  };
  const handleQuestionBankPress = () => {
    console.log("Go to QuestionBankPress");
    navigation.navigate("QuestionBankScreen");
  };

  return (
    <Box
      p={50}
      w={"100%"}
      height={"100%"}
      alignItems="center"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
    >
      <VStack space={4}>
        <Text fontSize="6xl">QuizApp</Text>

        <Button onPress={handlePlayPress} size="lg">
          PLAY
        </Button>

        <Button onPress={handleQuestionBankPress} size="lg">
          Question Bank
        </Button>
      </VStack>
    </Box>
  );
}
