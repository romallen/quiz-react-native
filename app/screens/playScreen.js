import Card from "../components/card";
import Header from "../components/headers";
import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
// import data1 from "../data";
import { useSelector, useDispatch } from "react-redux";
// import { gameState } from "../redux/gameSettingsSlice";
import { Text, Box, HStack, VStack, Skeleton, Divider } from "native-base";
import arrayShuffle from "array-shuffle";
export default function PlayScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [cards, setCards] = useState([]);
  const [catData, setCatData] = useState();
  const currGameState = useSelector((state) => state.gameSettings.cardState);
  const [loading, setLoading] = useState(true);
  const numCategories = useSelector(
    (state) => state.gameSettings.numCategoriesStore
  );
  const numQuestions = useSelector(
    (state) => state.gameSettings.numQuestionsStore
  );
  const gameData = useSelector((state) => state.gameSettings.gameboard);
  console.log(gameData);
  useEffect(async () => {
    if (loading) {
      let shuffledData = arrayShuffle(gameData).splice(0, numCategories);
      setCatData(shuffledData);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(catData);
    if (!loading) {
      makeCards();
    }
  }, [loading, height, width]);

  let makeCards = () => {
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
            height={(height * 0.9) / numQuestions}
            width={(width - 95) / numCategories}
            question={catData[categoryIndex].questions[questionIndex].question}
            answer={catData[categoryIndex].questions[questionIndex].answer}
            points={(questionIndex + 1) * 100}
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
      {loading ? (
        <HStack>
          <VStack flex="3" space="4">
            <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
            <Skeleton startColor="amber.300" />
          </VStack>
          <VStack flex="3" space="4">
            <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
            <Skeleton startColor="amber.300" />
          </VStack>
          <VStack flex="3" space="4">
            <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
            <Skeleton startColor="amber.300" />
          </VStack>
        </HStack>
      ) : (
        <HStack>
          <Sidebar footerWidth={70} footerHeight={height} />

          <Box width={width - 70}>
            <Header data={catData} headerWidth={(width - 70) / numCategories} />
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
      )}
    </Box>
  );
}
