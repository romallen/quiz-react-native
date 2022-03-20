import Card from "../components/Cards";
import Header from "../components/headers";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
// import data1 from "../data";
import { useSelector, useDispatch } from "react-redux";
// import { gameState } from "../redux/gameSettingsSlice";
import { Text, Box, HStack, VStack } from "native-base";

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

  gState.data = gameData;
  gState.rows = numCategories;
  gState.cols = numQuestions;

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

  let resize = (cardHeight, cardWidth) => {
    let card = [];
    console.log(numCategories, numQuestions);
    for (
      let categoryIndex = 0;
      categoryIndex < numCategories;
      categoryIndex++
    ) {
      // gState.data.forEach((category, categoryIndex) => {
      let column = [];
      for (
        let questionIndex = 0;
        questionIndex < numQuestions;
        questionIndex++
      ) {
        // num.questions.forEach((question, questionIndex) => {

        column.push(
          <Card
            key={categoryIndex + "-" + questionIndex}
            height={cardHeight}
            width={gState.windowWidth / gState.cols - gState.cols * 0.7}
            question={
              gState.data[categoryIndex].questions[questionIndex].question
            }
            answer={gState.data[categoryIndex].questions[questionIndex].answer}
            points={gState.data[categoryIndex].questions[questionIndex].points}
          />
        );
      }
      card.push(
        <VStack space={0.5} key={categoryIndex}>
          {column}
        </VStack>
      );
    }
    setCards(card);
    // dispatch(gameState(card))
  };

  return (
    <Box pr={1} pl={1} w={gState.windowWidth} alignItems="center">
      <Header
        windowWidth={gState.windowWidth - gState.cols * 0.7}
        data={gState.data.slice(0, gState.rows)}
        headerWidth={gState.windowWidth / gState.cols}
      />
      <Box>
        <HStack pt={1} space={0.5} alignItems="center">
          {cards}
        </HStack>
      </Box>
      <Footer windowWidth={gState.windowWidth} />
    </Box>
  );
}
