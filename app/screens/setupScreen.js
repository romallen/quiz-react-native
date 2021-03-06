import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTeams } from "../redux/teamsSlice";
import {
  gameState,
  numCategoriesStore,
  numQuestionsStore,
} from "../redux/gameSettingsSlice";
import { Text, Box, Button, Slider, VStack, HStack } from "native-base";

export default function SetupScreen({ navigation }) {
  const [numTeams, setNumTeams] = useState(2);
  const [onChangeTeamValue, setOnChangeTeamValue] = useState(2);
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
    navigation.navigate("CreateBoardScreen");
  };

  const handleStartGamePress = () => {
    dispatch(createTeams(numTeams));
    dispatch(numCategoriesStore(numCategories));
    dispatch(numQuestionsStore(numQuestions));
    navigation.navigate("PlayScreen");
  };
  const handleBackPress = () => {
    navigation.navigate("HomeScreen");
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
        <HStack space={3} w="80%" justifyContent="space-between">
          <Text textAlign="left" fontSize="xl" color="primary.50">
            {"Teams:       "}
          </Text>
          <Text textAlign="left" fontSize="xl" color="primary.50">
            {onChangeTeamValue}
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
        </HStack>
        <HStack space={3} w="80%" justifyContent="space-between">
          <Text textAlign="left" fontSize="xl" color="primary.50">
            {"Categories:"}
          </Text>
          <Text textAlign="left" fontSize="xl" color="primary.50">
            {onChangeNumCategoriesValue}
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
        <HStack space={3} w="80%" justifyContent="space-between">
          <Text textAlign="left" fontSize="xl" color="primary.50">
            {"Questions: "}
          </Text>
          <Text textAlign="left" fontSize="xl" color="primary.50">
            {onChangeNumQuestionsValue}
          </Text>

          <Slider
            w="45%"
            defaultValue={numQuestions}
            minValue={1}
            maxValue={5}
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

        <Button onPress={handleCreateBoardPress} mt="2" w="40%">
          NEXT
        </Button>

        <Button onPress={handleBackPress} mt="2" w="40%">
          BACK
        </Button>
      </VStack>
    </Box>
  );
}
