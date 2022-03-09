import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from 'react-redux' 


export default function Footer(props) {
    const teamsStore = useSelector(state => state.teams.value)
    let teams = []
  
    for(let team in teamsStore){
     teams.push(<Text adjustsFontSizeToFit={true} style={{
        padding: 10,
        border: 1,
        //width: 1000,
        textAlignVertical: "center",
        fontSize: 20,
        textAlign:'center',
        alignItems: 'center'
    }} key={team}>{team  + " "+ teamsStore[team] }</Text>)}
    return (
    <View  style={[styles.container, {width: props.windowWidth}]}>
        <View  style={styles.menu}>
          {"MENU"}
        </View>
        <View  style={styles.scores}>
          {teams}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    scores: {  
     flexDirection: "row",
      backgroundColor: 'FFC300',
      alignItems: 'right',
      justifyContent: "right",
    // padding: 10,
}
})