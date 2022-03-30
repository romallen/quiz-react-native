import imageRed from "../assets/img/red_x.svg";
import { React, useState, createRef } from "react";
import {  useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore, incrementTurn } from "../redux/teamsSlice";
import {
  Button,
  Box,
  Image,
  PresenceTransition,
  Pressable,
  Center,
  Modal,
  Heading,
} from "native-base";

export default function Card(props) {
  const { height, width } = useWindowDimensions();
  const [cardState, setCardState] = useState({
    completed: false,
  });
  const cardRef = createRef(null);
  const [visible, setVisible] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const teamNumber = Object.keys(
    useSelector((state) => state.teams.value)
  ).length;
  const turn = useSelector((state) => state.teams.turn);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!cardState.completed) {
      cardState.completed = true;
      setVisible(!visible);
    }
  };

  const handleCorrectPress = () => {
    let team = (turn % teamNumber) + 1;
    dispatch(incrementScore({ team: team, points: props.points }));
    dispatch(incrementTurn());
    setVisible(!visible);
  };

  const handleIncorrectPress = () => {
    dispatch(incrementTurn());
    setVisible(!visible);
  };
  let cardH;
  if (height < 450) {
    cardH = props.height * 0.8;
  } else if (height < 700) {
    cardH = props.height * 0.88;
  } else {
    cardH = props.height * 0.96;
  }

  let front = cardState.completed ? (
    <Image
      size="xs"
      resizeMode={"contain"}
      // borderRadius={100}
      source={{
        uri: imageRed,
      }}
      alt="Red X"
    />
  ) : (
    <Heading size={"lg"} bold>
      {props.points}
    </Heading>
  );

  return (
    <Pressable
      ref={cardRef}
      disabled={cardState.completed}
      key={props.keys}
      onPress={handleClick}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      }}
      background="primary.500"
    >
      <Center w={props.width - 1} h={cardH}>
        {front}
      </Center>

      <Modal
        isOpen={visible}
        onClose={() => setVisible(!visible)}
        closeOnOverlayClick={false}
        alignSelf="center"
        m="sm"
        size="full"
     
      >
        <Modal.Content h="100%" background="primary.600">
          <Modal.Body>
            <Box background="primary.600" w="100%" h="100%" alignItems={"center"}>
              {props.type === "text" ? (
                <Heading
                  p={2}
                  size="4xl"
                  color="primary.50"
                  textAlign={"center"}
                >
                  {props.question}
                </Heading>
              ) : (
                <Image
                 
                  size= { height < 450 ? "xl": 330}
                  resizeMode={"contain"}
                  source={{
                    uri: props.question,
                  }}   
                  alt="image"
                />
              )}

              
              <PresenceTransition
                visible={showAnswer}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1.5,
                  translateY: 0,
                  transition: {
                    duration: 300,
                  },
                }}
              >
                <Heading
                  p={0}
                  size="2xl"
                  color="primary.50"
                  textAlign={"center"}
                >
                  {props.answer}
                </Heading>
              </PresenceTransition>
            </Box>
          </Modal.Body>
          <Modal.Footer background="primary.800">
          
            <Button.Group space={2}>
            <Button alignItems={"left"} onPress={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </Button>
              <Button
                variant="subtle"
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
