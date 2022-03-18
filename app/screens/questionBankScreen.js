import React, { useState, useEffect, createRef } from "react";
import { useWindowDimensions } from "react-native";
import {
  ListItem,
  Avatar,
  Overlay,
  FAB,
  SpeedDial,
} from "react-native-elements";
import {
  Text,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Slider,
  VStack,
  Spacer,
  Pressable,
  HStack,
  ScrollView,
} from "native-base";
import axios from "axios";
import data1 from "../data";
// import ViewCategoryOverlay from "../components/viewCatOverlay";

export default function QuestionBankScreen(props) {
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryRef = createRef(null);
  //handle
  const handleBackPress = () => {
    console.log("Go to Welcome");
    props.setCurrentView("WelcomeScreen");
  };
  const handleViewQuestionsPress = () => {
    console.log("Go to QuestionBankPress");
    props.setCurrentView("QuestionBank");
  };

  const createQuestions = async () => {
    return await axios.post("", {});
  };

  const categoryName = [];
  data1.forEach((el, index) =>
    categoryName.push(
      <Pressable onPress={(e) => handleClick(el.questions)} key={index}>
        <Box>{el.category}</Box>
      </Pressable>
    )
  );


  const handleClick = (val) => {
    // setVisible(!visible);
    console.log(val);
    let questions = [];
    val.forEach((element) => {
      questions.push(
        <Box
        maxW="96" 
          borderWidth="1"
          borderColor="coolGray.300"
          shadow="3"
          bg="coolGray.100"
          p="5"
          rounded="8"
        >
          <HStack alignItems="center">
            <Spacer />
            <Text fontSize={10} color="coolGray.800">
              Points: {element["points"]}
            </Text>
          </HStack>
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            Question: {element["question"]}
          </Text>
          <Text mt="2" fontSize="sm" color="coolGray.700">
            Answer: {element["answer"]}
          </Text>
          <Flex>
            <Button mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
              Edit
            </Button>
          </Flex>
        </Box>
      );
    });

    setSelectedCategory(questions);
  };



  return (
    <Box p={5}>
      <Text fontSize="5xl" textAlign="center">
        Question Bank
      </Text>

      <HStack space={8}>
        <Box>
          <Text fontSize="2xl" textAlign="center">
            Categories
          </Text>
          <ScrollView>{categoryName}</ScrollView>
        </Box>
        <Box>

          <ScrollView h={height*.8}>

         {selectedCategory}
          </ScrollView>
          

        </Box>
      </HStack>
    </Box>
    
  );
}
