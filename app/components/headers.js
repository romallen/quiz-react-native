import React, {useState} from "react";
import { Divider, HStack, Heading, Box } from "native-base";
import { useWindowDimensions } from "react-native";

export default function Header(props) {
  const { height, width } = useWindowDimensions();


  console.log()
  let headers = props.data.map((category, index) => (
    <HStack key={index} bg="primary.800">
      {/* <Divider orientation="vertical"  backgroundColor={"primary.600"}/> */}
      {console.log(props.headerWidth)}
      <Heading
        w={props.headerWidth}
        fontSize={width < 400 ? "xs":"lg"}
        textAlign="center"
        alignSelf="center"

        numberOfLines={2}
        bold
        color="primary.50"
      >
        {category.category}
      </Heading>
    </HStack>
  ));

  return (
    <HStack  backgroundColor={"primary.600"}>
      {headers}
    </HStack>
  );
}
