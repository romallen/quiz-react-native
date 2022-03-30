import Card from "../components/card";
import Header from "../components/headers";
import Sidebar from "../components/sidebar";
import { useState, useEffect, useRef } from "react";
import { useWindowDimensions } from "react-native";
// import data1 from "../data";
import { useSelector, useDispatch } from "react-redux";
import { resetTeams } from "../redux/teamsSlice";
// import { gameState } from "../redux/gameSettingsSlice";
import {
  Text,
  Button,
  Center,
  AlertDialog,
  Box,
  HStack,
  VStack,
  Skeleton,
  Divider,
} from "native-base";
import arrayShuffle from "array-shuffle";
import ConfettiCannon from "react-native-confetti-cannon";

export default function PlayScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [cards, setCards] = useState([]);
  const [catData, setCatData] = useState();
  const currGameState = useSelector((state) => state.gameSettings.cardState);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const onClose = () => setIsOpen(false);

  const dispatch = useDispatch();
  const numCategories = useSelector(
    (state) => state.gameSettings.numCategoriesStore
  );
  const numQuestions = useSelector(
    (state) => state.gameSettings.numQuestionsStore
  );
  const gameData = useSelector((state) => state.gameSettings.gameboard);
  const turn = useSelector((state) => state.teams.turn);
  const teamScores = useSelector((state) => state.teams.value);
  const topScore = Math.max(...Object.values(teamScores));
  const winnerArr = Object.keys(teamScores).filter((team) => {
    return teamScores[team] === topScore;
  });
  let winnerResult = "";
  if (winnerArr.length === 1) {
    winnerResult = winnerArr[0] + " wins!!!";
  } else if(winnerArr.length === 2) {
    winnerResult = "It's a tie between " + winnerArr.join(" & ") + "!";
  }
  else{
    winnerResult = "It's a tie between more than 2 teams!";
  }
  useEffect(async () => {
    if (loading) {
      let shuffledData = arrayShuffle(gameData).splice(0, numCategories);
      setCatData(shuffledData);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
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
            height={(height * 0.85) / numQuestions}
            width={(width - 95) / numCategories}
            numCat={numCategories}
            numQues={numQuestions}
            question={catData[categoryIndex].questions[questionIndex].question}
            answer={catData[categoryIndex].questions[questionIndex].answer}
            points={(questionIndex + 1) * 100}
            type={catData[categoryIndex].questions[questionIndex].type}
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
      {turn === numCategories * numQuestions ? (
        <Center>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
            alignSelf="center"
            m="sm"
            size="full"
          >
            <AlertDialog.Content>
              <AlertDialog.Header fontSize="5xl" textAlign="center">CONGRATULATIONS!!!</AlertDialog.Header>
              <AlertDialog.Body>
                <Text fontSize="5xl" textAlign="center">
                  {winnerResult}
                </Text>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={() => {
                      onClose();
                      dispatch(resetTeams());
                    }}
                    ref={cancelRef}
                  >
                    Dismiss
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      onClose();
                      dispatch(resetTeams());
                      navigation.navigate("HomeScreen");
                    }}
                  >
                    Exit Game
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
          <ConfettiCannon
            count={500}
            origin={{ x: 0, y: 0 }}
            fallSpeed={4000}
            autoStartDelay={300}
            explosionSpeed={600}
            onAnimationStart={() => setIsOpen(!isOpen)}
          />
        </Center>
      ) : null}
    </Box>
  );
}
