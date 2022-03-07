import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

let w
export default function Scoreboard(props) {
    console.log("team:" ,props.teamNum)
  
    let teams = []
    for(let i= 0; i < props.teamNum; i++){
     teams.push(<Text adjustsFontSizeToFit={true} style={{
        padding: 10,
        border: 1,
        width: 1000,
        textAlignVertical: "center",
        fontSize: 30,
        textAlign:'center',
        alignItems: 'center'
    }} key={i}>{"TEAM " + (i+1) + " : "}</Text>)
}
    return (
    <View className='teams' style={[styles.headers, {width: props.windowWidth, justifyContent: "center",alignItems: "center"}]}>
        {teams}
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