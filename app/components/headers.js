import React from "react";
import { Divider, HStack, Heading, Box } from "native-base";
import { useWindowDimensions } from "react-native";

export default function Header(props) {
  const { height, width } = useWindowDimensions();
  let headers = props.data.map((category, index) => (
    <HStack key={index} bg="primary.800">
      {/* <Divider orientation="vertical"  backgroundColor={"primary.600"}/> */}
      <Heading
        w={props.headerWidth}
        size={"lg"}
        textAlign="center"
        alignSelf="center"
        bold
        color="primary.50"
      >
        {category.category}
      </Heading>
    </HStack>
  ));

  return (
    <HStack width={width * 0.93} backgroundColor={"primary.600"}>
      {headers}
    </HStack>
  );
}
