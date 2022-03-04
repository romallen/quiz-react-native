import {useState} from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
// import NumericInput from 'react-native-numeric-input'
// import InputNumber from 'rc-input-number';
import {Picker} from '@react-native-picker/picker';

export default function SetupScreen(props) {
  
    const [isSelected, setSelection] = useState([]);
    const [teamnum,setTeamNum] = useState(1)
  
    console.log("This is setup", );
    console.log("This is selected", isSelected);
    const handleBackPress = () => {
      console.log("Go to Welcome");
      props.setCurrentView("WelcomeScreen");
    };
    const handleStartGamePress = () => {
      console.log("Start the Game");
  
      // props.setGameSettings({ categories: isSelected.map((sel) => sel.value) });
      props.setCurrentView("PlayScreen");
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Setup a New Game!!!</Text>
        <div >
          <Text>Teams:</Text>
          <Picker
            teamnum={teamnum}
            onValueChange={(itemValue, itemIndex) =>
              setTeamNum(Number(itemValue))
            }>
            <Picker.Item label="1" value= "1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value= "3" />
            <Picker.Item label="4" value="4" />
          </Picker>
        </div>
       <div style={styles.selectTime}>
       <Text>Timer:</Text>
       </div>
          
          {/* <Text style={styles.selectCat}>Select Categories!!!</Text>
          <Text style={styles.selectCat}>Select Categories!!!</Text> */}
        {/* <SelectMultiple
          items={Object.keys(props.categories)}
          selectedItems={isSelected}
          onSelectionsChange={setSelection}
        /> */}
     
  
        <Button
          onPress={handleStartGamePress}
          title="Start the Game"
          color="#841584"
          accessibilityLabel="Questions"
        />
        <Button
          onPress={handleBackPress}
          title="RETURN TO WELCOME SCREEN"
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