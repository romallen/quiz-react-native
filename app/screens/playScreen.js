import Card from "../components/Cards";
import Header from "../components/headers";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { FlatGrid } from "react-native-super-grid";
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
  let footerHeight;
  useEffect(() => {
    gState.windowWidth = width;
    gState.windowHeight = height;

    const headerHeight = gState.windowHeight * 0.15;
    footerHeight = gState.windowHeight * 0.1;
    cardWidth = gState.windowWidth / gState.cols;
    //  let cardHeight = ((gState.windowHeight - headerHeight) / gState.rows);
    let cardHeight = (gState.windowHeight - headerHeight) / gState.rows;

    handleResize(cardHeight, cardWidth);
  }, [width, height]);

  let handleResize = (cardHeight, cardWidth) => {
    let card = [];

    gState.data.forEach((category, categoryIndex) => {
      let column = [];
      category.questions.forEach((question, questionIndex) => {
        let keys = categoryIndex + "-" + questionIndex;
        column.push(
          <Card
            key={keys}
            height={cardHeight}
            width={cardWidth}
            question={question.question}
            answer={question.answer}
            points={question.points}
          />
        );
      });
      card.push(<VStack key={categoryIndex}>{column}</VStack>);
    });

    setCards(card);
  };

  return (
    <Box >
      <Header
       
        windowWidth={gState.windowWidth}
        data={gState.data}
        headerWidth={gState.windowWidth / gState.cols}
      />
      <HStack alignItems="center">{cards}</HStack>
      <Footer  windowWidth={gState.windowWidth} />
    </Box>
  );
}


