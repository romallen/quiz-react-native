import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Box,
  Button,
  Container,
  Center,
  HStack,
  Heading,
} from "native-base";

export default function Footer(props) {
  const teamsStore = useSelector((state) => state.teams.value);
  let teams = [];

  for (let team in teamsStore) {
    teams.push(
      <Text
        fontSize={"xl"}
        // style={{
        //   padding: 10,
        //   border: 1,
        //   //width: 1000,
        //   textAlignVertical: "center",
        //   fontSize: 20,
        //   textAlign: "center",
        //   alignItems: "center",
        // }}
        key={team}
      >
        {team + " " + teamsStore[team]}
      </Text>
    );
  }
  return (
    <HStack width={props.windowWidth}>
      <Box >
        <Text>MENU</Text>
      </Box>
      <Box >{teams}</Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  scores: {
    flexDirection: "row",
    backgroundColor: "FFC300",
    alignItems: "right",
    justifyContent: "right",
    // padding: 10,
  },
});
