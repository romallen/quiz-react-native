import ManualCard from "../components/ManualCard";


import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Text, Box, HStack, VStack } from "native-base";

export default function ManBoardSetupScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [board, setBoard] = useState([]);
  const currGameState = useSelector((state) => state.gameSettings.cardState);
  const numCategories = useSelector((state) => state.gameSettings.numCategories);
  const numQuestions = useSelector((state) => state.gameSettings.numQuestions);
  const dispatch = useDispatch();

  const [gState, setGState] = useState({
    windowWidth: width,
    windowHeight: height,
    data: [],
  });

  gState.data = data1;
  gState.rows = gState.data[0].questions.length;
  gState.cols = data1.length;

  let cardWidth;
  let cardHeight;
  useEffect(() => {
    gState.windowWidth = width;
    gState.windowHeight = height;

    const headerHeight = gState.windowHeight * 0.15;
    cardWidth = gState.windowWidth / gState.cols - gState.cols * 0.7;
    cardHeight = (gState.windowHeight - headerHeight) / gState.rows;

    resize(cardHeight, cardWidth);
  }, [width, height]);

  let headers = []
  let resize = (cardHeight, cardWidth) => {
    let board = [];

    for (let i = 0; i < numCategories; i++) {
      let category = {
        category: "",
        questions: [],
      };

      for (let j = 0; j < numQuestions; j++) {
        // category.questions.push({
        //   question: "",
        //   answer: "",
        //   points: 0,
        // })
        category.questions.push(
          <ManualCard
            key={i + "-" + j}
            question=""
            answer=""
            points={0}
          ></ManualCard>
        );
      }

      board.push(
        <VStack space={0.5} key={categoryIndex}>
          <Header></Header>
          {category}
        </VStack>
      );
    }
    setBoard(board);
  };
  


  return (
    <Box pr={1} pl={1} w={gState.windowWidth} alignItems="center">

      <Box>
        <HStack pt={1} space={0.5} alignItems="center">
          {board}
        </HStack>
      </Box>
    </Box>
  );
}
