
import Card from "../components/card"
import {useState} from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function PlayScreen(props) {
  
    const [isSelected, setSelection] = useState([]);

  

    console.log("This is the Game" );

    const handleBackPress = () => {
      console.log("Go to Welcome");
      props.setCurrentView("WelcomeScreen");
    };
    const handleStartGamePress = () => {
      console.log("Start the Game");
  
      props.setGameSettings({ categories: isSelected.map((sel) => sel.value) });
      props.setCurrentView("PlayGame");
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Play GAme!!!</Text>
       
        <Button
          onPress={handleStartGamePress}
          title="Start the Game"
          color="#841584"
          accessibilityLabel="Questions"
        />
        <Button
          onPress={handleBackPress}
          title="RETURN TO HOME SCREEN"
          color="#841584"
          accessibilityLabel="GO BACK!"
        />
  
      
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      //backgroundColor: "#ddf",
    },
    title: {
      fontSize: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    teams: {
      fontSize: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      fontSize: 40,
      paddingBottom: 20,
       alignItems: "center",
      justifyContent: "center",
    },
  });