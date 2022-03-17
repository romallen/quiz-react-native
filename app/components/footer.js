import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Box,
  Actionsheet,
  Button,
  Center,
  Divider,
  HamburgerIcon,
  Pressable,
  Icon,
  HStack,
  Heading,
  useDisclose
} from "native-base";
import { Ionicons, MaterialIcons} from '@expo/vector-icons'
import {Path} from 'react-native-svg'

export default function Footer(props) {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const [showMenu, setShowMenu] = useState(false);
  const teamsStore = useSelector((state) => state.teams.value);
  let teams = [];
  let i = 0;
  for (let team in teamsStore) {
    teams.push(
      <Text fontSize={"xl"} key={i}>
        {team + " " + teamsStore[team]}
      </Text>
    );
    i++;
  }
  return (
    <HStack pb="1" pl="10" width={props.windowWidth}>
      <Box h="80%" w="20%" alignItems="flex-start">
        <Pressable onPress={onOpen}>
          <HamburgerIcon />
        </Pressable>
        <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Menu
              </Text>
            </Box>
   
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={Ionicons}
                  name="play-circle"
                  color="trueGray.400"
                  mr="1"
                  size="6"
                />
              }
            >
              Play
            </Actionsheet.Item>
            <Actionsheet.Item
              p={3}
              startIcon={
                <Icon
                  color="trueGray.400"
                  mr="1"
                  h="24"
                  w="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
                </Icon>
              }
            >
              Quit
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Box>
      <HStack space={8} alignItems={"center"}>
        {teams}
      </HStack>
    </HStack>
  );
}
