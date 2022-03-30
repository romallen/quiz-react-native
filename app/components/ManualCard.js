import { React, useState, createRef, useEffect } from "react";
import { useWindowDimensions } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { makeGameboardQues } from "../redux/gameSettingsSlice";

import {
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
  TextArea,
  HStack,
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

  // useEffect(async () => {
  //   try {
  //     const data = await s3Client.send(new ListBucketsCommand({}));
  //     console.log("Success", data.Buckets);
  //     return data; // For unit tests.
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // }, []);


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
   
    setQuestion(base64)
   
  };

  const handleClick = () => {
    cardState.completed = true;
    setVisible(!visible);
  };

  const handleSavePress = () => {
    dispatch(
      makeGameboardQues({
        value: {
          question: question,
          answer: answer,
          points: props.points,
          type: (question.slice(0,10)=== "data:image") ? "image" : "text",
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
    cardH = props.height * 0.8;
  } else if (height < 700) {
    cardH = props.height * 0.88;
  } else {
    cardH = props.height * 0.96;
  }

  let front = cardState.completed ? (
    <Heading p={2} size={"md"} isTruncated="true" bold>
      {question}
    </Heading>
  ) : (
    <Heading size={"md"} bold>
      Add Question
    </Heading>
  );

  return (
    <Pressable
      ref={cardRef}
      key={props.keys}
      onPress={handleClick}
      bg="primary.100"
    >
      <Center borderWidth={1} w={props.width} h={cardH}>
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
                  // md: "25%",
                }}
              >
                <Box>
                  <FormControl>
                    <FormControl.Label>Question</FormControl.Label>
                    <HStack>
                      <TextArea
                        size="lg"
                        
                        isFullWidth={true}
                        value={question}
                        onChangeText={(text) => setQuestion(text)}
                        placeholder="Question"
                      />
                      <input
                        type="file"
                        label="Image"
                        name="myFile"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => handleFileUpload(e)}
                      ></input>
                    </HStack>

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
                    <TextArea
                      value={answer}
                      // w="75%"
                      // maxW="300px"
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
                variant="subtle"
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
