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
  console.log(props);
  let headers = props.data.map((category, index) => (
    <Center key={index} w={props.headerWidth}>
      <Heading size="xl" textAlign="center" bold>
        {category.category}
      </Heading>
    </Center>
  ));

  return (
    <HStack width="100%">{headers}</HStack>

  );
}

// const styles = StyleSheet.create({
//   headers: {
//     flexDirection: "row",
//     backgroundColor: "FFC300",
//     // padding: 10,
//   },
// });
