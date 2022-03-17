import Card from "../components/Cards";
import Header from "../components/headers";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import data1 from "../data";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Box,
  Button,
  Container,
  Pressable,
  Slider,
  HStack,
  VStack,
} from "native-base";

export default function PlayScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [cards, setCards] = useState([]);

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
        let keys = categoryIndex + "-" + questionIndex;
        column.push(
          <Card
            key={keys}
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
  };

  return (
    <Box m={1}>
      <Header
        windowWidth={gState.windowWidth}
        data={gState.data}
        headerWidth={gState.windowWidth / gState.cols}
      />
      <Box justifyContent="space-between">
        <HStack space={0.5} alignItems="center">
          {cards}
        </HStack>
      </Box>
      <Footer windowWidth={gState.windowWidth} />
    </Box>
  );
}
