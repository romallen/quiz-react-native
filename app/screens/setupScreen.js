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
  Stack,
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
    <Box p={50} w={"100%"} height={"100%"} alignItems="center">
      <VStack space={4}>
        <Text fontSize="5xl" textAlign="center">Setup</Text>

        <Stack direction="column">
          <Text textAlign="center" fontSize="2xl">
            Teams: {onSlChangeValue}{" "}
          </Text>
          <Slider
            size="lg"
            w={"100%"}
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
        </Stack>

        <Box>{/* <Text>Timer:</Text> */}</Box>

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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //backgroundColor: "#ddf",
  },
  title: {
    fontSize: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  teams: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    fontSize: 40,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
