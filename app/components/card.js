import React from 'react';
import * as audio from './audio';
import {React, useState, useRef} from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button,Card } from "react-native-elements";
import CardFlip from 'react-native-card-flip';

export default function QuestionCard(props) {
    const [cardState, setCardState] = useState({view: 'points', completed: false})
    const cardRef = useRef()
  
    const handleClick= () => {
    console.log("card Pressed");
    if (cardState.view === 'points') {
        audio.play("flip");
        setTimeout(() => {
            if (cardState.view === "question") {
                audio.play("countdown");
            }
        }, 1800);
        setCardState({view: 'question', flipping: true});
    } 
    else if (cardState.view === 'question') {
        audio.stop("countdown");
        setCardState({view: 'answer'});
    } else {
        audio.play("flipBack");
        setCardState({view: 'points', completed: true, flipping: true});
    }
  };




  return (
    <View style={styles.container}>
        <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
    <TouchableOpacity style={styles.card} onPress={() => cardRef.flip()} ><Text>AB</Text></TouchableOpacity>
    <TouchableOpacity style={styles.card} onPress={() => cardRef.flip()} ><Text>CD</Text></TouchableOpacity>
  </CardFlip>


    </View>
  )
}