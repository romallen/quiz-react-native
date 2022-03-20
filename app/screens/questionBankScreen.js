import React, { useState, useEffect, createRef } from "react";
import { useWindowDimensions } from "react-native";
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
import Carousel from "react-native-reanimated-carousel";
import axios from "axios";
import data1 from "../data";
// import ViewCategoryOverlay from "../components/viewCatOverlay";

export default function QuestionBankScreen({ navigation }) {
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const categoryRef = createRef(null);
  //handle
  const handleBackPress = () => {
    console.log("Go to Welcome");
    navigation.navigate("HomeScreen");
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
          maxW="md"
          maxH="sm"
          borderWidth="1"
          borderColor="coolGray.300"
          shadow="3"
          bg="coolGray.100"
          p="5"
          rounded="8"
        >
          <HStack>
            <Spacer />
            <Text fontSize={"sm"} color="coolGray.800">
              Points: {element["points"]}
            </Text>
          </HStack>
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            Question: {element["question"]}
          </Text>
          <Text mt="2" fontSize="md" color="coolGray.700">
            Answer: {element["answer"]}
          </Text>
          <Flex>
            <Button
              alignSelf={"end"}
              mt="2"
              fontSize={"md"}
              fontWeight="medium"
              color="darkBlue.600"
            >
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

      <HStack space={10}>
        <VStack>
          <Text fontSize="2xl" textAlign="left">
            Categories
          </Text>
          <ScrollView>{categoryName}</ScrollView>
        </VStack>
        <Box pl={1} w={width} justifyItems="center">
          <Carousel
            width={450}
            height={500}
            mode="parallax"
            loop={false}
            data={selectedCategory}
            renderItem={({ item }) => item}
          />
        </Box>
      </HStack>
      <Button onPress={handleBackPress} size="lg">
        RETURN TO HOME SCREEN
      </Button>
    </Box>
  );
}
