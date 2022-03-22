import React from "react";
import { Text, Box, Button, Container, VStack } from "native-base";

export default function HomeScreen({ navigation }) {
  const handlePlayPress = () => {
    navigation.navigate("SetupScreen");
  };
  const handleQuestionBankPress = () => {
    navigation.navigate("QuestionBankScreen");
  };

  return (
    <Box
      p={10}
      height={"100%"}
      alignItems="center"
      // justifyContent="center"
      borderColor="coolGray.500"
      borderWidth="5"
    >
      <VStack space={4}>
        <Text fontSize="8xl">QuizApp</Text>

        <Button onPress={handlePlayPress} size="lg">
          PLAY
        </Button>

        <Button onPress={handleQuestionBankPress} size="lg">
          QUESTION BANK
        </Button>
      </VStack>
    </Box>
  );
}
