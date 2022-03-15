import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Box,
  Button,
  Container,
  Center,
  Divider,
  HamburgerIcon,
  Pressable,
  Menu,
  HStack,
  Heading,
} from "native-base";

export default function Footer(props) {
  const teamsStore = useSelector((state) => state.teams.value);
  let teams = [];
  let i = 0
  for (let team in teamsStore) {
    teams.push(
      <Text fontSize={"xl"} key={i}>
        {team + " " + teamsStore[team]}
      </Text>
    );
    i++
  }
  return (
    <HStack pb="1" pl="10" width={props.windowWidth}>
      <Box h="80%" w="20%" alignItems="flex-start">
        <Menu
          w="190"
          closeOnSelect={false}
          onOpen={() => console.log("opened")}
          onClose={() => console.log("closed")}
          trigger={(triggerProps) => {
            return (
              <Pressable {...triggerProps}>
                <HamburgerIcon />
              </Pressable>
            );
          }}
        >
   
        </Menu>
      </Box>
      <HStack space={2} alignItems={"center"}>{teams}</HStack>
    </HStack>
  );
}


