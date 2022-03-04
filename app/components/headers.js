import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

let w
export default function Header(props) {
    w =props.headerWidth
    let headers = props.data.map((category, index) => <Text style={styles.text} key={index}>{category.category}</Text>)
  return (
    <View className='headers' style={styles.headers}>
        {headers}
    </View>
  );
}

const styles = StyleSheet.create({
    text: {
        width: w,
        fontSize: 40,
    }
    })