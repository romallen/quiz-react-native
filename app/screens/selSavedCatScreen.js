import React, { useState, useEffect, createRef } from "react";
import { useWindowDimensions } from "react-native";
import {
  Text,
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  Slider,
  Stack,
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
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function SelSavedCatScreen({ navigation }) {
  //state
  const [board, setBoard] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selected, setSelected] = useState(0);

  const numCategories = useSelector(
    (state) => state.gameSettings.numCategoriesStore
  );
  const numQuestions = useSelector(
    (state) => state.gameSettings.numQuestionsStore
  );
  //const gameData = useSelector((state) => state.gameSettings.gameboard);
  //const gameData = useSelector((state) => state.questions.categories);
  const gameData = data1;

  useEffect(() => {
    let skeletons = [];
    for (let i = selected; i < numCategories; i++) {
      let skeletonRow = [];
      for (let j = 0; j < numQuestions; j++) {
        skeletonRow.push(
          <Skeleton
            key={j}
            style={{
              width: (width * 0.7) / numCategories,
              height:
                height > width
                  ? (height * 0.5) / numQuestions
                  : (height * 0.7) / numQuestions,
              borderRadius: 4,
            }}
          />
        );
      }

      skeletons.push(
        <VStack space={1} key={i}>
          <Skeleton
            startColor={"primary.100"}
            style={{
              width: (width * 0.7) / numCategories,
              height: height * 0.05,
              borderRadius: 10,
            }}
          />
          {skeletonRow}
        </VStack>
      );
    }
    setBoard(skeletons);
  }, [selected]);

  const categoryName = [];
  gameData.forEach((el, index) =>
    categoryName.push(
      <Pressable onPress={(e) => handleClick(el, index)} key={index}>
        <Text
          fontSize="md"
          color="primary.50"
          bg={(index + 2) % 2 === 0 ? "primary.700" : null}
        >
          {el.category}
        </Text>
      </Pressable>
    )
  );

  const handleClick = (val, index) => {
    let questions = [];

    val.questions.forEach((element, index) => {
      questions.push(
        <Box
          key={index}
          size="sm"
          w={(width * 0.7) / numCategories}
          h={
            height > width
              ? (height * 0.5) / numQuestions
              : (height * 0.7) / numQuestions
          }
          borderWidth="1"
          borderColor="coolGray.300"
          shadow="3"
          bg="primary.600"
          p="1"
          rounded="4"
        >
          <Text color="primary.50" mt="1" fontSize="sm" noOfLines={3}>
            Question: {element["question"]}
          </Text>
          {/* <Spacer />
            <Text mt="2" fontSize="md" color="primary.50">
              Answer: {element["answer"]}
            </Text> */}
          {/* <Spacer />
            <Flex>
              <Button
                alignSelf={"end"}
                mt="1"
                fontSize={"sm"}
                fontWeight="medium"
                color="primary.50"
              >
                Edit
              </Button>
            </Flex> */}
        </Box>
      );
    });

    let cat = (
      <VStack space={1}>
        <Text
          fontSize={"sm"}
          textAlign="center"
          w={(width * 0.7) / numCategories}
          isTruncated={true}
          color="primary.50"
        >
          {val.category}
        </Text>

        <VStack space={1}>{questions}</VStack>
      </VStack>
    );
    console.log("test", val.category in selectedCategory);
    if (val.category in selectedCategory) {
      let tmp = selectedCategory;
      delete tmp[val.category];
      setSelectedCategory(tmp);
      setSelected(selected - 1);
    } else if (selected < numCategories) {
      let tmp = selectedCategory;
      tmp[val.category] = cat;
      setSelectedCategory(tmp);
      setSelected(selected + 1);
    }
  };

  const handleBackPress = () => {
    navigation.navigate("CreateBoardScreen");
  };

  return (
    <Box
      p={2}
      h={height}
      alignItems="center"
      borderColor="coolGray.500"
      borderWidth="1"
      bg={"primary.900"}
    >
      <VStack space={4} alignItems="center">
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          w="100%"
          space={1}
        >
          <VStack space={1} borderColor="primary.300">
            <Text fontSize="3xl" textAlign={"center"} color="primary.50">
              Categories
            </Text>
            <Divider />
            <ScrollView
              maxH={height > width ? height * 0.2 : height * 0.6}
              persistentScrollbar={true}
            >
              {categoryName}
            </ScrollView>
            {/* <Divider /> */}
          </VStack>
          {/* <Divider orientation="vertical" mx="1" background="primary.300" /> */}
          {/* <Box alignItems="center">
            {selectedCategory.length >1  ? (
              selectedCategory
            ) : (
              )}
          </Box> */}
          
          <HStack space={1}>
            {Object.values(selectedCategory)}
            {board}
          </HStack>
        </Stack>

        <Button onPress={handleBackPress} size="md">
          BACK
        </Button>
      </VStack>
    </Box>
  );
}
