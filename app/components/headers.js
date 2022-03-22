import React from "react";
import { HStack, Heading } from "native-base";
import { useWindowDimensions } from "react-native";

export default function Header(props) {
  const { height, width } = useWindowDimensions();
  let headers = props.data.map((category, index) => (
    <Heading
      key={index}
      w={props.headerWidth}
      size={"lg"}
      textAlign="center"
      alignSelf="center"
      bold
    >
      {category.category}
    </Heading>
  ));

  return (
    <HStack width={width} backgroundColor={"tertiary.500"}>
      {headers}
    </HStack>
  );
}
