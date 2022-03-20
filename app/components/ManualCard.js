import imageRed from "../assets/img/red_x.svg";
import { React, useState, createRef } from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../redux/teamsSlice";

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
  KeyboardAvoidingView,
  Stack
} from "native-base";

export default function ManualCard(props) {
  const { height, width } = useWindowDimensions();
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

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!cardState.completed) {
      cardState.completed = true;
      setVisible(!visible);
    }
  };

  const handleCorrectPress = () => {
    setVisible(!visible);
  };

  const handleIncorrectPress = () => {
    dispatch(incrementTurn());
    setVisible(!visible);
  };
  //   let cardHeight;
  //   if (height < 450) {
  //     cardHeight = props.height * 0.81;
  //   } else if (height < 700) {
  //     cardHeight = props.height * 0.9;
  //   } else {
  //     cardHeight = props.height;
  //   }

  let front = cardState.completed ? (
    <Heading size={"xl"} bold>
      {question}
    </Heading>
  ) : (
    <Heading size={"xl"} bold>
      Add Question
    </Heading>
  );

  return (
    <Pressable
      ref={cardRef}
      disabled={cardState.completed}
      key={props.keys}
      onPress={handleClick}
    >
      <Center borderRadius="md" borderWidth={1}>
        {front}
      </Center>

      <Modal
        isOpen={visible}
        onClose={() => setVisible(!visible)}
        m="sm"
        size="full"
      >
        <Modal.Content>
          <Modal.Body>
            <KeyboardAvoidingView behavior="padding">
             
            
              <Stack
                space={2.5}
                alignSelf="center"
                px="4"
                safeArea
                mt="4"
                w={{
                  base: "100%",
                  md: "25%",
                }}
              >
                <Box>
                  <Text bold fontSize="xl" mb="4">
                    Default
                  </Text>
                  <FormControl mb="5">
                    <FormControl.Label>Project Title</FormControl.Label>
                    <Input />
                    <FormControl.HelperText>
                      Give your project a title.
                    </FormControl.HelperText>
                  </FormControl>
                  <Divider />
                </Box>
                
                <Box>
                  <Text bold fontSize="xl" mb="4">
                    Invalid
                  </Text>
                  <FormControl isInvalid>
                    <FormControl.Label>Project Title</FormControl.Label>
                    <Input placeholder="Title" />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Something is wrong.
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Box>
              </Stack>
            </KeyboardAvoidingView>
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
