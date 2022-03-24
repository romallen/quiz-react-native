import ManualCard from "../components/manualCard";

import { useState, useEffect, useRef } from "react";
import { useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  AlertDialog,
  Text,
  Button,
  Input,
  Box,
  HStack,
  Heading,
  VStack,
} from "native-base";
import { clearBoard, makeGameboardCat } from "../redux/gameSettingsSlice";
import { realmApp } from "../realm/realm";
export default function ManBoardSetupScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [board, setBoard] = useState([]);
  const [cat, setCat] = useState(new Array(numCategories));
  const [boardName, setBoardName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [insertCatID, setInsertCatID] = useState([]);
  const numCategories = useSelector(
    (state) => state.gameSettings.numCategoriesStore
  );
  const numQuestions = useSelector(
    (state) => state.gameSettings.numQuestionsStore
  );
  const gameData = useSelector((state) => state.gameSettings.gameboard);
  const dispatch = useDispatch();

  const client = realmApp.currentUser.mongoClient("mongodb-atlas");
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const [gState, setGState] = useState({
    windowWidth: width,
    windowHeight: height,
    data: [],
  });

  gState.rows = numQuestions;
  gState.cols = numCategories;

  let cardWidth;
  let cardHeight;
  useEffect(() => {
    let blankData = new Array(numCategories).fill({
      category: "",
      questions: [],
      _partition: "quizapp",
    });
    dispatch(clearBoard(blankData));
  }, []);

  useEffect(() => {
    gState.windowWidth = width;
    gState.windowHeight = height;

    const headerHeight = gState.windowHeight * 0.15;
    cardWidth = (gState.windowWidth * 0.96) / gState.cols;
    cardHeight = (gState.windowHeight - headerHeight) / gState.rows;

    resize(cardHeight, cardWidth);
  }, [width, height]);

  let resize = (cardHeight, cardWidth) => {
    let emptyBoard = [];

    for (let i = 0; i < numCategories; i++) {
      let category = [
        <Input
          key={i}
          index={i}
          value={cat[i]}
          onChangeText={(text) =>
            dispatch(makeGameboardCat({ value: text, index: i }))
          }
          size="lg"
          placeholder={"Category Name "}
          isRequired={true}
          width={cardWidth}
          bg="primary.100"
        />,
      ];

      for (let j = 0; j < numQuestions; j++) {
        category.push(
          <ManualCard
            key={i + "-" + j}
            index={i}
            height={cardHeight}
            width={cardWidth}
            cat={cat[i]}
            points={(j + 1) * 100}
          ></ManualCard>
        );
      }

      emptyBoard.push(
        <VStack space={1.5} key={i}>
          {category}
        </VStack>
      );
    }
    setBoard(emptyBoard);
  };

  const handleBackPress = () => {
    navigation.navigate("SetupScreen");
  };

  const handlePlayPress = () => {
    navigation.navigate("PlayScreen");
  };

  const handleSavePress = async () => {
    let insertCat;
    try {
      const insertCat = await client
        .db("quizapp")
        .collection("categories")
        .insertMany(gameData);

      setInsertCatID(insertCat.insertedIds);
      setIsSaved(true);
    } catch (err) {
      console.error("Failed to log in", err);
    }

    setIsOpen(!isOpen);
  };

  let saveBoard = async () => {
    let id = [];

    insertCatID.forEach((item) => {
      id.push(item.toString());
    });

    try {
      const insertBoard = await client
        .db("quizapp")
        .collection("gameBoard")
        .insertOne({
          name: boardName,
          categories: id,
          _partition: "quizboard",
        });
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Box p={2} w={width} h={height} alignItems="center" bg="primary.900">
      <VStack space={2}>
        <HStack pt={1} space={1.5} alignItems="center" alignSelf="center">
          {board}
        </HStack>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Save Board</AlertDialog.Header>
            <AlertDialog.Body>
              Please give this board a name
              <Input
                value={boardName}
                onChangeText={(text) => setBoardName(text)}
                size="lg"
                placeholder={"Category Name "}
              ></Input>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    onClose();
                    saveBoard();
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <HStack space={4} justifyContent="space-around">
          <Button onPress={handleBackPress} size="lg" w={"40%"}>
            BACK TO SETTINGS
          </Button>
          {isSaved ? (
            <Button onPress={handlePlayPress} size="lg" w={"40%"}>
              {"PLAY"}
            </Button>
          ) : (
            <Button onPress={handleSavePress} size="lg" w={"40%"}>
              {"SAVE"}
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
