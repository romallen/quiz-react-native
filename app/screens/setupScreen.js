import {useState} from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import {Picker} from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux'
import {createTeams} from "../redux/teamsSlice";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Box, Button, Container,Slider, VStack } from 'native-base';

export default function SetupScreen({ navigation }) {

    const [onSlChangeValue, setOnSlChangeValue] = useState(1);
    const [onSlChangeEndValue, setOnSlChangeEndValue] = useState(1);
    const dispatch = useDispatch()

    const handleBackPress = () => {
      console.log("Go to Welcome");
      navigation.navigate("HomeScreen");
    };

    const handleStartGamePress = () => {
      dispatch(createTeams(onSlChangeEndValue))
      navigation.navigate("PlayScreen");
    };

    return (

        <Container alignItems="center">
        <Text fontSize="6xl">Setup a New Game!!!</Text>
        
        <VStack space={2} alignItems="left">
          <Box >
            <Text fontSize="3xl" >Teams:  {onSlChangeValue}</Text>
            <Slider defaultValue={1} minValue={1} maxValue={6} colorScheme="cyan" 
            onChange={v => {setOnSlChangeValue(Math.floor(v));}} 
            onChangeEnd={v => {v && setOnSlChangeEndValue(Math.floor(v))}}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
          </Box>
         </VStack>
       
       <Box style={styles.selectTime}>
       {/* <Text>Timer:</Text> */}
       </Box>
          
     
    
      <Button onPress={handleStartGamePress} size="lg"  > 
      Start the Game
       </Button>
       <Button onPress={handleBackPress} size="lg"  > 
       RETURN TO HOME SCREEN
       </Button>
 
    </Container>
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