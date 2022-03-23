import ManualCard from "../components/manualCard";

import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Text, Button, Input, Box, HStack, Heading, VStack } from "native-base";
import { clearBoard, makeGameboardCat } from "../redux/gameSettingsSlice";

export default function ManBoardSetupScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [board, setBoard] = useState([]);
  const [cat, setCat] = useState(new Array(numCategories));

  const numCategories = useSelector(
    (state) => state.gameSettings.numCategoriesStore
  );
  const numQuestions = useSelector(
    (state) => state.gameSettings.numQuestionsStore
  );

  const dispatch = useDispatch();

  const [gState, setGState] = useState({
    windowWidth: width,
    windowHeight: height,
    data: [],
  });

  gState.rows = numQuestions;
  gState.cols = numCategories;

  let cardWidth;
  let cardHeight;
  useEffect(() => {
    let blankData = new Array(numCategories).fill({
      category: "",
      questions: [],
    });
    dispatch(clearBoard(blankData));
  }, []);

  useEffect(() => {
    gState.windowWidth = width;
    gState.windowHeight = height;

    const headerHeight = gState.windowHeight * 0.15;
    cardWidth = (gState.windowWidth * 0.96)/ gState.cols;
    cardHeight = (gState.windowHeight - headerHeight) / gState.rows;

    resize(cardHeight, cardWidth);
  }, [width, height]);

  let resize = (cardHeight, cardWidth) => {
    let emptyBoard = [];

    for (let i = 0; i < numCategories; i++) {
      let category = [
        <Input
          key={i}
          index={i}
          value={cat[i]}
          onChangeText={(text) =>
            dispatch(makeGameboardCat({ value: text, index: i }))
          }
          size="lg"
          placeholder={"Category: " + (i + 1)}
          isRequired={true}
          width={cardWidth}
        />,
      ];

      for (let j = 0; j < numQuestions; j++) {
        category.push(
          <ManualCard
            key={i + "-" + j}
            index={i}
            height={cardHeight}
            width={cardWidth}
            cat={cat[i]}
            points={(j + 1) * 100}
          ></ManualCard>
        );
      }

      emptyBoard.push(
        <VStack space={1.5} key={i}>
          {category}
        </VStack>
      );
    }
    setBoard(emptyBoard);
  };

  const handleBackPress = () => {
    navigation.navigate("SetupScreen");
  };

  const handlePlayPress = () => {
    navigation.navigate("PlayScreen");
  };

  return (
    <Box p={2} w={width} h={height} alignItems="center" bg="primary.900">
      <VStack space={2}>
        <HStack pt={1} space={1.5} alignItems="center" alignSelf="center">
          {board}
        </HStack>

        <HStack space={4} justifyContent="space-around">
          <Button onPress={handleBackPress} size="lg" w={"40%"}>
            BACK TO SETTINGS
          </Button>
          <Button onPress={handlePlayPress} size="lg" w={"40%"}>
            PLAY
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
