import React, { useEffect, useState, useRef } from "react";
import { Text, Box, Button, Container, VStack } from "native-base";

import * as Realm from "realm-web";
import { realmApp } from "../realm/realm";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions } from "../redux/questionsSlice";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (loading) {
      try {
        const client = realmApp.currentUser.mongoClient("mongodb-atlas");
        const cat =  await client.db("quizapp").collection("categories").find({},{projection:{ _id: false }});
        
        setData(cat);
      } catch (err) {
        console.error("Failed to log in", err);
      }

      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    console.log("data ", data);
    dispatch(getQuestions(data));
  }, [data]);

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
