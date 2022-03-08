import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from 'react-redux' 


export default function Scoreboard(props) {
    const teamsStore = useSelector(state => state.teams.value)
    let teams = []
  
    for(let team in teamsStore){
     teams.push(<Text adjustsFontSizeToFit={true} style={{
        padding: 10,
        border: 1,
        width: 1000,
        textAlignVertical: "center",
        fontSize: 30,
        textAlign:'center',
        alignItems: 'center'
    }} key={team}>{team  + " "+ teamsStore[team] }</Text>)
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