import * as audio from './audio';
import image from "../assets/img/react.svg"
import {React, useState, createRef} from "react";
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions  } from "react-native";
import { Button, Overlay } from "react-native-elements";
import QuestionOverlay from '../components/questionOverlay';

export default function Card(props) {
    const [cardState, setCardState] = useState({view: 'points', completed: false})
    const cardRef = createRef(null)
    const { height, width } = useWindowDimensions();
    const [visible, setVisible] = useState(false);


    const handleClick= () => {
        console.log("card Pressed", cardState.completed );
        if(!cardState.completed ) {
              cardState.completed =true  
              setTimeout(() => {
                setVisible(!visible);
            }, 500);
        }
  
    };

  
            const handleCorrectPress = () => {
                console.log("CORRECT");
                setVisible(!visible);
              };
              const handleIncorrectPress = () => {
                console.log("INCORRECT");
                setVisible(!visible);
              };

        let front = cardState.completed ? <img src={image}/> : <Text adjustsFontSizeToFit={true} numberOfLines={1}  style= {{fontSize: 50, textAlignVertical: 'center', textAlign:'center'}} nativeIDs='points'>{props.points}</Text>;


        return (
            <TouchableOpacity ref={cardRef} disabled={cardState.completed}  nativeID='card' key={props.keys} onPress={handleClick}>
                <View style={[styles.card,  { width: props.width, height: props.height, justifyContent: "center",}]}>
                        {front}
                </View>

                <Overlay ModalComponent={Modal} isVisible={visible} onBackdropPress={handleClick}>
                    <QuestionOverlay style={styles.overlay} question = {props.question} answer = {props.answer} width={"100%"}/>
                    <Button
                        style={styles.button}
                        onPress={handleIncorrectPress}
                        title="INCORRECT"
                        color="#841584"
                        accessibilityLabel="INCORRECT"
                    />

                    <Button
                        style={styles.button}
                        onPress={handleCorrectPress}
                        title="CORRECT"
                        color="#841584"
                        accessibilityLabel="CORRECT"
                    />
                </Overlay>
            </TouchableOpacity>
        );
    }


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