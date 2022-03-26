import Card from "../components/card";
import Header from "../components/headers";
import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
// import data1 from "../data";
import { useSelector, useDispatch } from "react-redux";
// import { gameState } from "../redux/gameSettingsSlice";
import { Text, Box, HStack, VStack, Divider } from "native-base";
import arrayShuffle from 'array-shuffle'
export default function PlayScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [cards, setCards] = useState([]);

  const currGameState = useSelector((state) => state.gameSettings.cardState);
  const numCategories = useSelector(
    (state) => state.gameSettings.numCategoriesStore
  );
  const numQuestions = useSelector(
    (state) => state.gameSettings.numQuestionsStore
  );
  const gameData = useSelector((state) => state.gameSettings.gameboard);
  const dispatch = useDispatch();

  const [gState, setGState] = useState({
    windowWidth: width,
    windowHeight: height,
    data: [],
  });

  gState.data = arrayShuffle(gameData);
  gState.rows = numQuestions;
  gState.cols = numCategories;

  let cardWidth;
  let cardHeight;
  useEffect(() => {
    gState.windowWidth = width;
    gState.windowHeight = height;

    const headerHeight = height * 0.1;
    cardWidth = (gState.windowWidth * 0.9) / gState.cols;
    cardHeight = (height - headerHeight) / gState.rows;

    resize(cardHeight, cardWidth);
  }, [width, height]);

  let resize = (cardHeight, cardWidth) => {
    let card = [];

    for (
      let categoryIndex = 0;
      categoryIndex < numCategories;
      categoryIndex++
    ) {
      let column = [];
      for (
        let questionIndex = 0;
        questionIndex < numQuestions;
        questionIndex++
      ) {
        column.push(
          <Card
            key={categoryIndex + "-" + questionIndex}
            height={cardHeight}
            width={cardWidth}
            question={
              gState.data[categoryIndex].questions[questionIndex].question
            }
            answer={gState.data[categoryIndex].questions[questionIndex].answer}
            points={gState.data[categoryIndex].questions[questionIndex].points}
          />
        );
      }
      card.push(
        <VStack space={1.5} key={categoryIndex}>
          {column}
        </VStack>
      );
    }
    setCards(card);
  };

  return (
    <Box
      pr={1}
      pl={1}
      w={width}
      h={height}
      alignItems="center"
      bg="primary.600"
    >
      <HStack>
        <Sidebar footerWidth={70} footerHeight={height} />

        <Box width={width -70}>
          <Header
            data={gState.data.slice(0, gState.cols)}
            headerWidth={(width-70) / gState.cols}
          />
          <HStack
            pt={1}
            space={1.5}
            alignItems="center"
            justifyContent="center"
          >
            {cards}
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}
