import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { createTeams } from "../redux/teamsSlice";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Text,
  Box,
  Button,
  Container,
  Slider,
  VStack,
  HStack,
  Stack,
  Radio
} from "native-base";

export default function SetupScreen({ navigation }) {
  const [onSlChangeValue, setOnSlChangeValue] = useState(1);
  const [onSlChangeEndValue, setOnSlChangeEndValue] = useState(1);
  const dispatch = useDispatch();

  const handleBackPress = () => {
    console.log("Go to Welcome");
    navigation.navigate("HomeScreen");
  };

  const handleStartGamePress = () => {
    dispatch(createTeams(onSlChangeEndValue));
    navigation.navigate("PlayScreen");
  };

  return (
    <Box p={10} alignItems="center">
      <VStack space={4}>
        <Text fontSize="5xl" textAlign="center">Setup</Text>

        <HStack space={10}  alignItems="left">
          <Text textAlign="left" fontSize="xl">
            Teams: {onSlChangeValue}   
          </Text>
          <Slider
            size="lg"
            w="3/4" maxW="300" 
            defaultValue={1}
            minValue={1}
            maxValue={6}
            colorScheme="cyan"
            onChange={(v) => {
              setOnSlChangeValue(Math.floor(v));
            }}
            onChangeEnd={(v) => {
              v && setOnSlChangeEndValue(Math.floor(v));
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </HStack>

        <Box>{/* <Text>Timer:</Text> */}</Box>

        <Box>
        <Text>Number of Categories:</Text> 
        <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
      <Stack direction={{
      base: "column",
      md: "row"
    }} alignItems="center" space={4} w="75%" maxW="300px">
        <Radio value="1" colorScheme="red" size="sm" my={1}>
          Small
        </Radio>
        <Radio value="2" colorScheme="green" size="md" my={1}>
          Medium
        </Radio>
        <Radio value="3" colorScheme="yellow" size="lg" my={1}>
          Large
        </Radio>
      </Stack>
    </Radio.Group>;
        <Text>Number of Questions:</Text> 

        </Box>

        <Button onPress={handleStartGamePress} size="lg">
          Start the Game
        </Button>
        <Button onPress={handleBackPress} size="lg">
          RETURN TO HOME SCREEN
        </Button>
      </VStack>
    </Box>
  );
}

