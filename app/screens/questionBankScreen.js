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

export default function QuestionBankScreen({ navigation }) {
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const categoryRef = createRef(null);
  //handle
  const handleBackPress = () => {
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
          p="1"
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
    <Box
      p={4}
      height={"100%"}
      alignItems="center"
      justifyContent="center"
      borderColor="coolGray.500"
      borderWidth="5"
    >
      <VStack space={1}>
        <Text fontSize="6xl" textAlign="center">
          Question Bank
        </Text>

        <HStack space={8}>
          <VStack>
            <Text fontSize="2xl">Categories</Text>
            <ScrollView>{categoryName}</ScrollView>
          </VStack>
          <Divider orientation="vertical" mx="3" />
          <Box>
            <Carousel
              width={width / 2}
              height={(height - 50) / 2}
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
      </VStack>
    </Box>
  );
}
