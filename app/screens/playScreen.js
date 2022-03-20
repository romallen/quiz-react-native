import Card from "../components/Cards";
import Header from "../components/headers";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import data1 from "../data";
import { useSelector, useDispatch } from "react-redux";
import { gameState } from "../redux/gameSlice";
import {
  Text,
  Box,
  HStack,
  VStack,
} from "native-base";

export default function PlayScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [cards, setCards] = useState([]);

  const currGameState = useSelector((state) => state.game.cardState);
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

  let resize = (cardHeight, cardWidth) => {
    let card = [];

    gState.data.forEach((category, categoryIndex) => {
      let column = [];
      category.questions.forEach((question, questionIndex) => {
        column.push(
          <Card
            key={categoryIndex + "-" + questionIndex}
            height={cardHeight}
            width={gState.windowWidth / gState.cols - gState.cols * 0.7}
            question={question.question}
            answer={question.answer}
            points={question.points}
          />
        );
      });
      card.push(
        <VStack space={0.5} key={categoryIndex}>
          {column}
        </VStack>
      );
    });
    setCards(card);
    // dispatch(gameState(card))
  };

  return (
    <Box pr={1} pl={1} w={gState.windowWidth} alignItems="center">
      <Header
        windowWidth={gState.windowWidth - gState.cols * 0.7}
        data={gState.data}
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
