import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore, incrementTurn } from "../redux/teamsSlice";
import {
  Text,
  Box,
  Button,
  Actionsheet,
  HamburgerIcon,
  Pressable,
  Icon,
  HStack,
  VStack,
  Menu,
  Heading,
  Center,
  AlertDialog,
  useDisclose,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

export default function Sidebar(props) {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const teamsStore = useSelector((state) => state.teams.value);
  const teamNumber = Object.keys(teamsStore).length;
  const turn = useSelector((state) => state.teams.turn);
  let teamTurn = turn % teamNumber;

  let teams = [];
  let i = 0;

  for (let team in teamsStore) {
    teams.push(
      <VStack
        key={i}
        borderRadius={7}
        bg={teamTurn === i ? "primary.700" : null}
        style={
          teamTurn === i
            ? {
                shadowColor: "#fff",
                shadowOffset: {
                  width: 1.5,
                  height: 1.5,
                },
                shadowOpacity: 0.24,
                shadowRadius: 6.27,
                elevation: 10,
              }
            : null
        }
      >
        <Text fontSize={"xl"} textAlign="center" color="primary.50">
          {teamsStore[team]}
        </Text>
        <Text fontSize={"lg"} textAlign="center" color="primary.50">
          {team}
        </Text>
      </VStack>
    );
    i++;
  }

  const handleQuitClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <VStack
      py="2"
      px={1}
      width={props.footerWidth}
      height={props.footerHeight}
      justifyContent="space-between"
      bg="primary.900"
    >
      <Box h="10%">
        <Menu
          w="190"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <HamburgerIcon />
              </Pressable>
            );
          }}
        >
          <Menu.Item>Toggle Timer</Menu.Item>
          <Menu.Item>Toggle Sound</Menu.Item>
          <Menu.Item onPress={handleQuitClick}>Quit Game</Menu.Item>
        </Menu>

        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Quit Game?</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure you want to quit the game? You will lose all
              progress.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  No
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    onClose;
                    navigation.goBack();
                  }}
                >
                  Yes
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
       
      </Box>
      <Box h="90%" minW={60}>
        <VStack space={4}>{teams}</VStack>
      </Box>
    </VStack>
  );
}
