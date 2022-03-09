import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";


export default function Header(props) {
  
    let headers = props.data.map((category, index) => <Text adjustsFontSizeToFit numberOfLines={2} style={{
        padding: 1,
        border: 0,
        width: props.windowWidth,
        textAlignVertical: "center",
        fontSize: 20,
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