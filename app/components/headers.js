import React from "react";
import { Box, HStack, Heading } from "native-base";
import { useWindowDimensions } from "react-native";

export default function Header(props) {
  const { height, width } = useWindowDimensions();
  let headers = props.data.map((category, index) => (
    <Box key={index} alignItems="center" w={props.headerWidth}>
      <Heading size={"lg"} textAlign="center" bold>
        {category.category}
      </Heading>
    </Box>
  ));

  return (
    <HStack width={width} backgroundColor={"tertiary.500"}>
      {headers}
    </HStack>
  );
}
