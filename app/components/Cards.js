import * as audio from "./audio";
import imageRed from "../assets/img/red_x.svg";
import { React, useState, createRef } from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Overlay } from "react-native-elements";
import QuestionOverlay from "../components/questionOverlay";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../redux/teamsSlice";
import { incrementTurn } from "../redux/scoreSlice";
import {
  Text,
  Box,
  Button,
  Container,
  Image,
  PresenceTransition,
  Pressable,
  Center,
  Slider,
  Modal,
  Heading,
  Hidden,
  HStack,
  VStack,
} from "native-base";

export default function Card(props) {
  const [cardState, setCardState] = useState({
    view: "points",
    completed: false,
  });
  const cardRef = createRef(null);
  const [visible, setVisible] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const teamNumber = Object.keys(
    useSelector((state) => state.teams.value)
  ).length;
  const turn = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("card Pressed", cardState.completed);
    if (!cardState.completed) {
      cardState.completed = true;
      setVisible(!visible);
      //   setTimeout(() => {
      //     setVisible(!visible);
      //   }, 400);
    }
  };

  const handleCorrectPress = () => {
    console.log("CORRECT");
    let team = (turn % teamNumber) + 1;
    dispatch(incrementScore({ team: team, points: props.points }));
    dispatch(incrementTurn());
    setVisible(!visible);
  };

  const handleIncorrectPress = () => {
    console.log("INCORRECT");
    dispatch(incrementTurn());
    setVisible(!visible);
  };

  let front = cardState.completed ? (
    // <img src={image} />
    <Image
      size="md"
      resizeMode={"contain"}
      borderRadius={100}
      source={{
        uri: imageRed,
      }}
      alt="Red X"
    />
  ) : (
    <Heading size="lg" bold>
      {props.points}
    </Heading>
  );

  return (
    <Pressable
      ref={cardRef}
      disabled={cardState.completed}
      key={props.keys}
      onPress={handleClick}
    >
      <Center space={1} borderRadius="md" borderWidth={1} w={props.width} h={props.height}>
        {front}
      </Center>

      <Modal isOpen={visible} onClose={() => setVisible(!visible)} m="sm" size="full">
        <Modal.Content >
          <Modal.Body>
            <Center >
            <Heading  p={10} size="3xl">{props.question}</Heading>
              <Button onPress={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </Button>
              <PresenceTransition
                visible={showAnswer}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 2,
                  transition: {
                    duration: 250,
                  },
                }}
              >
                <Heading  p={10} size="2xl">{props.answer}</Heading>
              </PresenceTransition>
            </Center>

          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={handleIncorrectPress}
              >
                INCORRECT
              </Button>
              <Button onPress={handleCorrectPress}>CORRECT</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Pressable>
  );
}

// const styles = StyleSheet.create({
//   card: {
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//     backgroundSize: "100% 100%",
//     backgroundRepeat: "no-repeat",
//     border: "solid 3px #ECECEC",
//     borderRadius: "6px",
//     backgroundColor: "#5463FF",
//     fontSize: "54px",
//   },
// });
