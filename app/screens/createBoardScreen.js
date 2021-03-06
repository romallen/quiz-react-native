import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTeams } from "../redux/teamsSlice";
import { makeGameboard } from "../redux/gameSettingsSlice";
import {
  gameState,
  numCategoriesStore,
  numQuestionsStore,
} from "../redux/gameSettingsSlice";
import {
  Text,
  Box,
  Button,
  Slider,
  VStack,
  HStack,
  Select,
  CheckIcon,
  Stack,
  Radio,
  Switch,
} from "native-base";
import arrayShuffle from "array-shuffle";

export default function CreateBoardScreen({ navigation }) {
  const [method, setMethod] = useState("auto");
  const gameData = useSelector((state) => state.questions.categories);
  
  const dispatch = useDispatch();
  const numCategories = useSelector(
    (state) => state.gameSettings.numCategoriesStore
  );
  
  const handleStartGamePress = () => {
    dispatch(makeGameboard( arrayShuffle(gameData).splice(0, numCategories)))
    navigation.navigate("PlayScreen");
  };

  const handleCreateSBoardPress = () => {
    navigation.navigate("SelectSavedBoardScreen");
  };

  const handleSavedCatPress = () => {
    navigation.navigate("SelSavedCatScreen");
  };

  const handleCreateBoardPress = () => {
    navigation.navigate("ManBoardSetupScreen");
  };
  const handleBackPress = () => {
    navigation.navigate("SetupScreen");
  };

  return (
    <Box
      p={3}
      height={"100%"}
      bg={"primary.900"}
      borderColor="coolGray.500"
      borderWidth="1"
    >
      <VStack space={2} alignItems="center">
        <Text fontSize="7xl" textAlign="center" color="primary.50">
          Setup
        </Text>

        <Text textAlign="left" fontSize="xl" color="primary.50">
          Select Board Creation Method:
        </Text>

        <Radio.Group
          name="createBoardGroup"
          defaultValue="auto"
          accessibilityLabel="pick a creation method"
          onChange={(itemValue) => setMethod(itemValue)}
        >
          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            alignItems="left"
            space={3}
            w="100%"
          >
            <Radio value="auto" size="md" my={1}>
              <Text pl={2} fontSize="md" color="primary.50">
                Automatic
              </Text>
            </Radio>
            <Radio value="blank" size="md" my={1}>
              <Text pl={2} fontSize="md" color="primary.50">
                Blank Slate
              </Text>
            </Radio>
            <Radio value="savedC" size="md" my={1}>
              <Text pl={2} fontSize="md" color="primary.50">
                Saved Categories
              </Text>
            </Radio>
          </Stack>
        </Radio.Group>

        {method === "auto" ? (
          <Button onPress={handleStartGamePress} size="lg" w="40%">
            PLAY
          </Button>
        ) : null}
        {/* {method === "savedB" ? (
          <Button onPress={handleCreateSBoardPress} size="lg" w="40%">
            NEXT
          </Button>
        ) : null} */}
        {method === "blank" ? (
          <Button onPress={handleCreateBoardPress} size="lg" w="40%">
            NEXT
          </Button>
        ) : null}
        {method === "savedC" ? (
          <Button onPress={handleSavedCatPress} size="lg" w="40%">
            NEXT
          </Button>
        ) : null}
        <Button onPress={handleBackPress} size="lg" w="40%">
          Back
        </Button>
      </VStack>
    </Box>
  );
}
