import {useState} from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

export default function SetupScreen(props) {
  
    const [isSelected, setSelection] = useState([]);

  
    console.log("This is setup", );
    console.log("This is selected", isSelected);
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
        <Text style={styles.greeting}>Setup a New Game!!!</Text>
        <Text style={styles.selectCat}>Teams:</Text>
        <Text style={styles.selectCat}></Text>
        <Text style={styles.selectCat}>Select Categories!!!</Text>
        <Text style={styles.selectCat}>Select Categories!!!</Text>
        {/* <SelectMultiple
          items={Object.keys(props.categories)}
          selectedItems={isSelected}
          onSelectionsChange={setSelection}
        /> */}
        
        
        
        
        
        <Button
          onPress={handleBackPress}
          title="RETURN TO WELCOME SCREEN"
          color="#841584"
          accessibilityLabel="GO BACK!"
        />
  
        <Button
          onPress={handleStartGamePress}
          title="Start the Game"
          color="#841584"
          accessibilityLabel="Questions"
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      //backgroundColor: "#ddf",
    },
    greeting: {
      flex: 1,
      fontSize: 60,
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