import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

let w
export default function Header(props) {
  
    let headers = props.data.map((category, index) => <Text style={{
        padding: 10,
        fontSize: 40,
        width: props.headerWidth,
    }} key={index}>{category.category}</Text>)
  return (
    <View className='headers' style={styles.headers}>
        {headers}
    </View>
  );
}

const styles = StyleSheet.create({
    headers: {  
     flexDirection: "row",
      backgroundColor: '#51f8ff',
    // padding: 10,
}
})