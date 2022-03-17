import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import {
  Text,
  Box,
  Button,
  Container,
  Center,
  HStack,
  Heading,
} from "native-base";

export default function Header(props) {
 
  let headers = props.data.map((category, index) => (
    <Center key={index} w={props.headerWidth} >
      <Heading size={"lg"} textAlign="center" bold>
        {category.category}
      </Heading>
    </Center>
  ));

  return (
    <HStack width={props.width} backgroundColor={"tertiary.500"}>{headers}</HStack>
  );
}

