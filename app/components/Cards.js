import * as audio from './audio';
import image from "../assets/img/react.svg"
import {React, useState, createRef} from "react";
import { Animated, Easing, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions  } from "react-native";
import { Button, Overlay } from "react-native-elements";
import QuestionOverlay from '../components/questionOverlay';

export default function Card(props) {
    const [cardState, setCardState] = useState({view: 'points', completed: false})
    const cardRef = createRef(null)
    const { height, width } = useWindowDimensions();
    const [visible, setVisible] = useState(false);

    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0];
    const scale = animation.interpolate({inputRange, outputRange});

    const handleClick= () => {
        console.log("card Pressed", cardState.completed );
        if(!cardState.completed ) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
              }).start();
              cardState.completed =true
              props.setVisible
              setVisible(!visible);
              props.setCardOverlay({isVisible: true, question: props.question, answer: props.answer})
        }
  
    };

    //console.log(props)
    let style = {width: props.width, 
                height: props.height, 
                justifyContent: "center",
                transform: [
                    // {
                    //     translateX: animation.interpolate({
                    //         inputRange: [0, 1],
                    //         outputRange: [0, 120]
                    //     })
                    // },
                    // {
                    //     translateY: animation.interpolate({
                    //         inputRange: [0, 1],
                    //         outputRange: [0, 25]
                    //     })
                    // },
                    // {
                    //     scaleX: animation.interpolate({
                    //         inputRange: [0, 1],
                    //         outputRange: [1, 150]
                    //     })
                    // },
                    // {
                    //     scaleY: animation.interpolate({
                    //         inputRange: [0, 1],
                    //         outputRange: [1, 120.5]
                    //     })
                    // }
                ]
            }
  
            const handleCorrectPress = () => {
                console.log("CORRECT");
                setVisible(!visible);
              };
              const handleIncorrectPress = () => {
                console.log("INCORRECT");
                setVisible(!visible);
              };

        let front = cardState.completed ? <img src={image}/> : <Text adjustsFontSizeToFit={true} numberOfLines={1}  style= {{fontSize: 50, textAlignVertical: 'center', textAlign:'center'}} nativeIDs='points'>{props.points}</Text>;
        let className = 'flipper';

        if (cardState.view !== 'points') {
            className = className + ' flipped';
        }
        if (cardState.flipping) {
            className = className + ' flipping';
        }
        //
        return (
            <TouchableOpacity ref={cardRef} disabled={cardState.completed}  nativeID='card' key={props.keys} onPress={handleClick}>
                <Animated.View style={[styles.card, style, {transform: [{scale}], height: props.height}]}>
                        {front}
                </Animated.View>

                <Overlay ModalComponent={Modal} isVisible={visible} onBackdropPress={handleClick}>
                    <QuestionOverlay style={styles.overlay} question = {props.question} answer = {props.answer} width={"90%"}/>
                    <Button
                        style={styles.button}
                        onPress={handleIncorrectPress}
                        title="INCORRECT"
                        color="#841584"
                        accessibilityLabel="Setup the game!"
                    />

                    <Button
                        style={styles.button}
                        onPress={handleCorrectPress}
                        title="CORRECT"
                        color="#841584"
                        accessibilityLabel="Get, delete, edit and create questions"
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
            border: "solid 2px #000000",
            borderRadius: "6px",
            backgroundColor: "#009CDF",
            fontSize: "54px"
    }

});