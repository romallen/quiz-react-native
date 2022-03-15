import * as audio from './audio';
import image from "../assets/img/react.svg"
import {React, useState, createRef} from "react";
import { Modal, StatusBar, StyleSheet, TouchableOpacity, View, useWindowDimensions  } from "react-native";
import {  Overlay } from "react-native-elements";
import QuestionOverlay from '../components/questionOverlay';
import { useSelector, useDispatch } from 'react-redux' 
import {incrementScore} from "../redux/teamsSlice";
import {incrementTurn} from "../redux/scoreSlice";
import { Text, Box, Button, Container,Pressable, Center, Slider,Heading, HStack, VStack } from 'native-base';

export default function Card(props) {
    const [cardState, setCardState] = useState({view: 'points', completed: false})
    const cardRef = createRef(null)
    const [visible, setVisible] = useState(false);
    const teamNumber = Object.keys(useSelector(state => state.teams.value)).length
    const turn = useSelector(state => state.score.value)
    const dispatch = useDispatch()

    const handleClick= () => {
        console.log("card Pressed", cardState.completed );
        if(!cardState.completed ) {
              cardState.completed =true  
              setTimeout(() => {
                setVisible(!visible);
            }, 400);
        }
  
    };

    const handleCorrectPress = () => {
        console.log("CORRECT");
        let team = (turn% teamNumber) + 1
        dispatch(incrementScore({team: team, points: props.points}))   
        dispatch(incrementTurn())  
        setVisible(!visible);
    };

    const handleIncorrectPress = () => {
        console.log("INCORRECT");
        dispatch(incrementTurn())
        setVisible(!visible);
    };

    let front = cardState.completed ? <img src={image}/> : <Heading size="lg"  bold>{props.points}</Heading>


return (
    <Pressable ref={cardRef} disabled={cardState.completed}  nativeID='card' key={props.keys} onPress={handleClick}>
        <Center w={props.width} h={props.height} >
                {front}
        </Center>

        <Overlay ModalComponent={Modal} isVisible={visible} onBackdropPress={handleClick}>
            <QuestionOverlay style={styles.overlay} question = {props.question} answer = {props.answer} width={"100%"}/>
            <Button
                style={styles.button}
                onPress={handleIncorrectPress}
                color="#841584"
                accessibilityLabel="INCORRECT"
            >INCORRECT</Button>

            <Button
                style={styles.button}
                onPress={handleCorrectPress}            
                color="#841584"
                accessibilityLabel="CORRECT"
            >CORRECT</Button>
        </Overlay>
    </Pressable>
)}


    const styles = StyleSheet.create({ 
        card: {
            justifyContent: "center", 
            alignItems: "center",
            overflow: "hidden",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            border: "solid 3px #ECECEC",
            borderRadius: "6px",
            backgroundColor: "#5463FF",
            fontSize: "54px"
    }

});