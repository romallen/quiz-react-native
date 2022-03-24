import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createTeams } from "../redux/teamsSlice";
import {
  gameState,
  numCategoriesStore,
  numQuestionsStore,
} from "../redux/gameSettingsSlice";
import {
  Text,
  Box,
  Button,
  Slider,
  VStack,
  HStack,
  Select,
  Divider,
  ScrollView,
  Spacer,
  Pressable,
  Stack,
  Radio,
  Switch,
} from "native-base";
import { realmApp } from "../realm/realm";

export default function SelectSavedBoardScreen({ navigation }) {
    const { height, width } = useWindowDimensions();
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState([]);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const client = realmApp.currentUser.mongoClient("mongodb-atlas");
  useEffect(async () => {
    const gameBoards = await client
      .db("quizapp")
      .collection("gameBoard")
      .find({}, { projection: { _id: false } });

    setBoards(gameBoards);
  }, []);

  let getCategory = async (catID) => {
    const cat = await client
      .db("quizapp")
      .collection("categories")
      .find({ _id: catID }, { projection: { _id: false } });

    return cat;
  };
  const boardName = [];
  boards.forEach((el, index) =>
    boardName.push(
      <Pressable onPress={(e) => handleClick(el)} key={index}>
        <Text fontSize="lg" color="primary.50">
          {el.name}
        </Text>
        <Divider orientation="horizontal" />
      </Pressable>
    )
  );

  const handleClick = (val) => {
    // setVisible(!visible);
    setSelected(val);

    let questions = [];
    val.categories.forEach((element, index) => {
      let catName = getCategory(element);

      questions.push(
        <Box
     
          key={index}
          size="md"
          w={width * 0.1}
          h={height * 0.3}
          borderWidth="1"
          borderColor="coolGray.300"
          shadow="3"
          bg="coolGray.100"
          p="3"
          rounded="8"
        >
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            {catName.category}
          </Text>
          <Spacer />
        </Box>
      );
    });

    setSelectedBoard(questions);
  };

  const handleStartGamePress = () => {
    navigation.navigate("PlayScreen");
  };

  const handleBackPress = () => {
    navigation.navigate("CreateBoardScreen");
  };

  return (
    <Box
      p={5}
      height={"100%"}
      // alignItems="center"
      bg={"primary.900"}
      borderColor="coolGray.500"
      borderWidth="1"
    >
      <VStack space={4} alignItems="center">
        <Text fontSize="7xl" textAlign="center" color="primary.50">
          Setup
        </Text>

        {selected ? (
          <Text fontSize="xl" color="primary.50">
            {selected}
          </Text>
        ) : (
          <Text fontSize="xl" color="primary.50">
            Select a Board
          </Text>
        )}
        <HStack space={1}>
          <VStack space={4}>
            <Text fontSize="3xl" color="primary.50">
              Boards
            </Text>
            <ScrollView>{boardName}</ScrollView>
          </VStack>
          <Divider orientation="vertical" mx="1" background="primary.300" />
          <Box alignItems="center">
           <HStack>
            {selectedBoard}
           </HStack>
           </Box>
        </HStack>

        <Button onPress={handleStartGamePress} size="lg" w="40%">
          START THE GAME
        </Button>

        <Button onPress={handleBackPress} size="lg" w="40%">
          Back
        </Button>
      </VStack>
    </Box>
  );
}
