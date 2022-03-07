import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

let w
export default function Header(props) {
  
    let headers = props.data.map((category, index) => <Text adjustsFontSizeToFit={true} style={{
        padding: 10,
        border: 1,
        width:1000,
        textAlignVertical: "center",
        fontSize: 40,
        textAlign:'center',
        alignItems: 'center'
    }} key={index}>{category.category}</Text>)
  
    return (
    <View className='headers' style={[styles.headers, {width: props.windowWidth, justifyContent: "center",alignItems: "center"}]}>
        {headers}
    </View>
  );
}

const styles = StyleSheet.create({
    headers: {  
     flexDirection: "row",
      backgroundColor: 'FFC300',
    // padding: 10,
}
})