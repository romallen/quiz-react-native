import ManualCard from "../components/manualCard";

import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Text, Input, Box, HStack, Heading, VStack } from "native-base";
import { clearBoard, makeGameboardCat } from "../redux/gameSettingsSlice";
import { Button } from "react-native-elements";

export default function ManBoardSetupScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [board, setBoard] = useState([]);

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

  const [cat, setCat] = useState(new Array(numCategories));

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
    // for (let i = 0; i < numCategories; i++) {
    // }
    //   dispatch(makeGameboardCat(blankData));
  }, []);

  useEffect(() => {
    gState.windowWidth = width;
    gState.windowHeight = height;

    const headerHeight = gState.windowHeight * 0.15;
    cardWidth = gState.windowWidth / gState.cols - gState.cols * 0.7;
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
        />,
      ];

      for (let j = 0; j < numQuestions; j++) {
        category.push(
          <ManualCard
            key={i + "-" + j}
            index={i}
            height={cardHeight}
            width={gState.windowWidth / gState.cols - gState.cols * 0.7}
            cat={cat[i]}
            points={(j + 1) * 100}
          ></ManualCard>
        );
      }

      emptyBoard.push(
        <VStack space={0.5} key={i}>
          {category}
        </VStack>
      );
    }
    setBoard(emptyBoard);
  };
  const handlePlayPress = () => {
    navigation.navigate("PlayScreen");
  };
  return (
    <Box pr={1} pl={1} w={gState.windowWidth} alignItems="center">
      <Box>
        <HStack pt={1} space={0.5} alignItems="center">
          {board}
        </HStack>
      </Box>
      <HStack>
        <Button onPress={handlePlayPress}>{"Save & Play"}</Button>
      </HStack>
    </Box>
  );
}
