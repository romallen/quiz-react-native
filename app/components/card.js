
import * as audio from './audio';
import {React, useState, createRef} from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button} from "react-native-elements";
import CardFlip from 'react-native-card-flip';

export default function QuestionCard(props) {
    const [cardState, setCardState] = useState({view: 'points', completed: false})
    const cardRef = createRef(null)
  
    const handleClick= () => {
    console.log("card Pressed");
    cardRef.current.flip()
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
      <CardFlip style={styles.cardContainer} ref={card => (cardRef.current = card)}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card1]}
          onPress={handleClick}>
          <Text style={styles.label}>{props.question}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card2]}
          onPress={handleClick}>
          <Text style={styles.label}>{props.answer}</Text>
        </TouchableOpacity>
      </CardFlip>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    cardContainer: {
      width: 230,
      height: 150,
    },
    card: {
      width: 230,
      height: 150,
      backgroundColor: '#FE474C',
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.5,
    },
    card1: {
      backgroundColor: '#FE474C',
    },
    card2: {
      backgroundColor: '#FEB12C',
    },
    label: {
      lineHeight: 47,
      textAlign: 'center',
      fontSize: 15,
      fontFamily: 'System',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });