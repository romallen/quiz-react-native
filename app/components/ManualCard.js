import { React, useState, createRef } from "react";
import { useWindowDimensions } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { makeGameboardQues } from "../redux/gameSettingsSlice";

import {
  Text,
  Box,
  Button,
  Pressable,
  Center,
  Slider,
  Modal,
  Heading,
  WarningOutlineIcon,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Stack,
} from "native-base";

export default function ManualCard(props) {
  const { height, width } = useWindowDimensions();
  const [cardState, setCardState] = useState({
    view: "points",
    completed: false,
  });
  const cardRef = createRef(null);
  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const dispatch = useDispatch();

  const handleClick = () => {
    cardState.completed = true;
    setVisible(!visible);
    // if (!cardState.completed) {}
  };

  const handleSavePress = () => {
    dispatch(
      makeGameboardQues({
        value: {
          question: question,
          answer: answer,
          points: props.points,
        },
        index: props.index,
      })
    );

    setVisible(!visible);
  };

  const handleCancelPress = () => {
    setVisible(!visible);
  };
  let cardH;
  if (height < 450) {
    cardH = props.height * 0.81;
  } else if (height < 700) {
    cardH = props.height * 0.9;
  } else {
    cardH = props.height;
  }

  let front = cardState.completed ? (
    <Heading size={"sm"} bold>
      {question}
    </Heading>
  ) : (
    <Heading size={"lg"} bold>
      Add Question
    </Heading>
  );

  return (
    <Pressable ref={cardRef} key={props.keys} onPress={handleClick}>
      <Center borderRadius="md" borderWidth={1} w={props.width} h={cardH}>
        {front}
      </Center>

      <Modal
        isOpen={visible}
        onClose={() => setVisible(!visible)}
        closeOnOverlayClick={false}
        m="sm"
        size="xl"
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
                  <FormControl>
                    <FormControl.Label>Question</FormControl.Label>
                    <Input
                      value={question}
                      w="75%"
                      maxW="300px"
                      onChangeText={(text) => setQuestion(text)}
                      placeholder="Question"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Something is wrong.
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormControl.Label>Answer</FormControl.Label>
                    <Input
                      value={answer}
                      w="75%"
                      maxW="300px"
                      onChangeText={(text) => setAnswer(text)}
                      placeholder="Answer"
                    />
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
                onPress={handleCancelPress}
              >
                CANCEL
              </Button>
              <Button onPress={handleSavePress}>SAVE</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Pressable>
  );
}
