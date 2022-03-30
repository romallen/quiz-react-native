import React, {useState} from "react";
import { Divider, HStack, Heading, Box } from "native-base";
import { useWindowDimensions } from "react-native";

export default function Header(props) {
  const { height, width } = useWindowDimensions();


  let headers = props.data.map((category, index) => (
    <Box key={index} bg="primary.800">
      {/* <Divider orientation="vertical"  backgroundColor={"primary.600"}/> */}
  
      <Heading
        w={props.headerWidth - 0.01}
        fontSize={width < 400 ? "xs":"xl"}
        textAlign="center"
        alignSelf="center"

        numberOfLines={2}
        bold
        color="primary.50"
      >
        {category.category}
      </Heading>
    </Box>
  ));

  return (
    <HStack  backgroundColor={"primary.800"}>
      {headers}
    </HStack>
  );
}
