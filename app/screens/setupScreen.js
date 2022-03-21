import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTeams } from "../redux/teamsSlice";
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
  Stack,
  Radio,
  Switch,
} from "native-base";

export default function SetupScreen({ navigation }) {
  const [numTeams, setNumTeams] = useState(1);
  const [timer, setTimer] = useState(30);
  const [numCategories, setNumCategories] = useState(4);
  const [numQuestions, setNumQuestions] = useState(5);
  const [createB, setCreateB] = useState(true);

  const dispatch = useDispatch();

  const handleCreateBoardPress = () => {
    dispatch(createTeams(numTeams));
    dispatch(numCategoriesStore(numCategories));
    dispatch(numQuestionsStore(numQuestions));
    navigation.navigate("ManBoardSetupScreen");
  };

  const handleStartGamePress = () => {
    dispatch(createTeams(numTeams));
    dispatch(numCategoriesStore(numCategories));
    dispatch(numQuestionsStore(numQuestions));
    navigation.navigate("PlayScreen");
  };
  const handleBackPress = () => {
    console.log("Go to Welcome");
    navigation.navigate("HomeScreen");
  };

  return (
    <Box
      p={5}
      // w={"100%"}
      height={"100%"}
      alignItems="center"
      justifyContent="center"
      //overflow="hidden"
      borderColor="coolGray.500"
      borderWidth="5"
    >
      <VStack space={4}>
        <Text fontSize="6xl" textAlign="center">
          Setup
        </Text>

        <HStack space={5} justifyContent="space-between">
          <Text textAlign="left" fontSize="xl">
            Number of Teams:
          </Text>
          <Radio.Group
            name="selectNumTeams"
            defaultValue={numTeams}
            accessibilityLabel="pick number of teams"
            onChange={(value) => setNumTeams(value)}
          >
            <Stack
              direction={{
                base: "column",
                sm: "row",
              }}
              space={1}
              w="65%"
              maxW="200px"
            >
              <Radio value={1} colorScheme="green" size="sm" my={1}>
                1
              </Radio>
              <Radio value={2} colorScheme="green" size="sm" my={1}>
                2
              </Radio>
              <Radio value={3} colorScheme="green" size="sm" my={1}>
                3
              </Radio>
              <Radio value={4} colorScheme="green" size="sm" my={1}>
                4
              </Radio>
              <Radio value={5} colorScheme="green" size="sm" my={1}>
                5
              </Radio>
              <Radio value={6} colorScheme="green" size="sm" my={1}>
                6
              </Radio>
            </Stack>
          </Radio.Group>
        </HStack>

        <HStack space={5} justifyContent="space-between">
          <Text textAlign="left" fontSize="xl">
            Number of Categories:
          </Text>
          <Radio.Group
            name="selectNumCategories"
            defaultValue={numCategories}
            accessibilityLabel="pick number of categories"
            onChange={(value) => setNumCategories(value)}
          >
            <Stack
              direction={{
                base: "column",
                sm: "row",
              }}
              alignItems="right"
              space={1}
              w="65%"
              maxW="200px"
            >
              <Radio value={1} colorScheme="green" size="sm" my={1}>
                1
              </Radio>
              <Radio value={2} colorScheme="green" size="sm" my={1}>
                2
              </Radio>
              <Radio value={3} colorScheme="green" size="sm" my={1}>
                3
              </Radio>
              <Radio value={4} colorScheme="green" size="sm" my={1}>
                4
              </Radio>
              <Radio value={5} colorScheme="green" size="sm" my={1}>
                5
              </Radio>
              <Radio value={6} colorScheme="green" size="sm" my={1}>
                6
              </Radio>
            </Stack>
          </Radio.Group>
        </HStack>

        <HStack space={5} justifyContent="space-between">
          <Text textAlign="left" fontSize="xl">
            Number of Questions:
          </Text>
          <Radio.Group
            name="selectNumTeams"
            defaultValue={numQuestions}
            accessibilityLabel="pick number of questions"
            onChange={(value) => setNumQuestions(value)}
          >
            <Stack
              direction={{
                base: "column",
                sm: "row",
              }}
              alignItems="right"
              space={1}
              w="65%"
              maxW="200px"
            >
              <Radio value={1} colorScheme="green" size="sm" my={1}>
                1
              </Radio>
              <Radio value={2} colorScheme="green" size="sm" my={1}>
                2
              </Radio>
              <Radio value={3} colorScheme="green" size="sm" my={1}>
                3
              </Radio>
              <Radio value={4} colorScheme="green" size="sm" my={1}>
                4
              </Radio>
              <Radio value={5} colorScheme="green" size="sm" my={1}>
                5
              </Radio>
              <Radio value={6} colorScheme="green" size="sm" my={1}>
                6
              </Radio>
            </Stack>
          </Radio.Group>
        </HStack>

        <HStack space={10} justifyContent="space-between">
          <Text textAlign="left" fontSize="xl">
            Create Board:
          </Text>
          <HStack alignItems="center" space={4}>
            <Text fontSize="lg">{createB ? "Automatic" : "Manual"} </Text>
            <Switch
              size="sm"
              onToggle={() => setCreateB(!createB)}
              defaultIsChecked={true}
              isChecked={createB}
            />
          </HStack>
        </HStack>

        {createB ? (
          <Button onPress={handleStartGamePress} size="lg">
            START THE GAME
          </Button>
        ) : (
          <Button onPress={handleCreateBoardPress} size="lg">
            CREATE BOARD
          </Button>
        )}

        <Button onPress={handleBackPress} size="lg">
          RETURN TO HOME SCREEN
        </Button>
      </VStack>
    </Box>
  );
}
