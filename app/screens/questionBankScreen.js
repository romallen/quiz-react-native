import React, { useState, useEffect, createRef } from "react";
import { useWindowDimensions } from "react-native";
import {
  Text,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Skeleton,
  Slider,
  VStack,
  Spacer,
  Pressable,
  HStack,
  ScrollView,
} from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import data1 from "../data";

export default function QuestionBankScreen({ navigation }) {
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selected, setSelected] = useState("");
  //const gameData = useSelector((state) => state.gameSettings.gameboard);
  const gameData = useSelector((state) => state.questions.categories);
  const categoryRef = createRef(null);
  //handle
  const handleBackPress = () => {
    navigation.navigate("HomeScreen");
  };

  const createQuestions = async () => {
    return await axios.post("", {});
  };

  const categoryName = [];
  gameData.forEach((el, index) =>
    categoryName.push(
      <Pressable onPress={(e) => handleClick(el)} key={index}>
        {/* {({isHovered}) =>{ 
          return 
        } } */}
        <Text fontSize="md">{el.category}</Text>
        <Divider orientation="horizontal" mx="1" />
      </Pressable>
    )
  );

  const handleClick = (val) => {
    // setVisible(!visible);
    setSelected(val.category);
    let questions = [];
    val.questions.forEach((element) => {
      questions.push(
        <Box
          // maxW="lg"
          // maxH="sm"
          size="md"
          w={width * 0.5}
          h={height * 0.3}
          borderWidth="1"
          borderColor="coolGray.300"
          shadow="3"
          bg="coolGray.100"
          p="3"
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
          <Spacer />
          <Text mt="2" fontSize="md" color="coolGray.700">
            Answer: {element["answer"]}
          </Text>
          <Spacer />
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
      borderColor="coolGray.500"
      borderWidth="5"
    >
      <VStack space={2} alignItems="center">
        <Text fontSize="6xl" textAlign="center">
          Question Bank
        </Text>
        {selected ? (
          <Text fontSize="xl">{selected}</Text>
        ) : (
          <Text fontSize="xl">Select a Category</Text>
        )}
        <HStack space={1}>
          <VStack space={4}>
            <Text fontSize="3xl">Categories</Text>
            <ScrollView>{categoryName}</ScrollView>
          </VStack>
          <Divider orientation="vertical" mx="1" />
          <Box alignItems="center">
            <Carousel
              width={(width - 100) / 2}
              height={(height - 200) / 2}
              mode="parallax"
              vertical={true}
              showLength={selectedCategory.length - 1}
              pagingEnabled={true}
              loop={false}
              data={selectedCategory}
              renderItem={({ item }) => item}
            />
          </Box>
        </HStack>
        <Spacer />
        <Button onPress={handleBackPress} w="50%" size="lg">
          RETURN TO HOME SCREEN
        </Button>
      </VStack>
    </Box>
  );
}
