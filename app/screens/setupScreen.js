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
  const [onChangeTeamValue, setOnChangeTeamValue] = useState(1);
  const [timer, setTimer] = useState(30);
  const [numCategories, setNumCategories] = useState(4);
  const [onChangeNumCategoriesValue, setOnChangeNumCategoriesValue] =
    useState(4);
  const [numQuestions, setNumQuestions] = useState(5);
  const [onChangeNumQuestionsValue, setOnChangeNumQuestionsValue] = useState(5);
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
      height={"100%"}
      alignItems="center"
      bg={"primary.900"}
      borderColor="coolGray.500"
      borderWidth="1"
    >
      <VStack space={4}>
        <Text fontSize="6xl" textAlign="center" color="primary.50">
          Setup
        </Text>

        <HStack space={5} justifyContent="space-between">
          <Text textAlign="left" fontSize="xl" color="primary.50">
            Number of Teams: {onChangeTeamValue}
          </Text>

          <Slider
            w="45%"
            defaultValue={numTeams}
            minValue={1}
            maxValue={6}
            colorScheme="cyan"
            onChange={(v) => {
              setOnChangeTeamValue(Math.floor(v));
            }}
            onChangeEnd={(v) => {
              v && setNumTeams(Math.floor(v));
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>

          {/* <Radio.Group
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
          </Radio.Group> */}
        </HStack>

        <HStack space={5} justifyContent="space-between">
          <Text textAlign="left" fontSize="xl" color="primary.50">
            Number of Categories: {onChangeNumCategoriesValue}
          </Text>

          <Slider
            w="45%"
            defaultValue={numCategories}
            minValue={1}
            maxValue={6}
            colorScheme="cyan"
            onChange={(v) => {
              setOnChangeNumCategoriesValue(Math.floor(v));
            }}
            onChangeEnd={(v) => {
              v && setNumCategories(Math.floor(v));
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </HStack>

        <HStack space={5} justifyContent="space-between">
          <Text textAlign="left" fontSize="xl" color="primary.50">
            Number of Questions: {onChangeNumQuestionsValue}
          </Text>

          <Slider
            w="45%"
            defaultValue={numQuestions}
            minValue={1}
            maxValue={6}
            colorScheme="cyan"
            onChange={(v) => {
              setOnChangeNumQuestionsValue(Math.floor(v));
            }}
            onChangeEnd={(v) => {
              v && setNumQuestions(Math.floor(v));
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </HStack>

        <HStack space={10} justifyContent="space-between">
          <Text textAlign="left" fontSize="xl" color="primary.50">
            Create Board:
          </Text>
          <HStack alignItems="center" space={4}>
            <Text fontSize="lg" color="primary.50">
              {createB ? "Automatic" : "Manual"}{" "}
            </Text>
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
