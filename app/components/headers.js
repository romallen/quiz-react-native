import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Text, Box, Button, Container,Center, HStack, Heading } from 'native-base';

export default function Header(props) {
  console.log(props)
    let headers = props.data.map((category, index) => 
    // <Text 
    // adjustsFontSizeToFit numberOfLines={2} style={{
    //     padding: 1,
    //     border: 0,
    //     width: props.windowWidth,
    //     textAlignVertical: "center",
    //     fontSize: 20,
    //     textAlign:'center',
    //     alignItems: 'center'
    // }} 
    // key={index}>{category.category}</Text>
    <Center w={props.headerWidth}>
        <Heading size="container"  bold>{category.category} </Heading>

    </Center>
    )
  
    return (
        <HStack space={6} width="100%" >
            {headers}
        </HStack>
    // <View className='headers' style={[styles.headers, {width: props.windowWidth, justifyContent: "center",alignItems: "center"}]}>
    //     {headers}
    // </View>
  );
}

const styles = StyleSheet.create({
    headers: {  
     flexDirection: "row",
      backgroundColor: 'FFC300',
    // padding: 10,
}
})