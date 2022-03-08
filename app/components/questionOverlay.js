import {React, useState, createRef} from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardFlip from 'react-native-card-flip';

export default function QuestionOverlay(props) {
    const cardRef = createRef(null)
  
    const handleClick= () => {
    console.log("card Pressed");
    cardRef.current.flip()
    };



  return (
      
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
  )
}

const styles = StyleSheet.create({
    // container: {
      
    //   backgroundColor: '#F5FCFF',
    // },
    cardContainer: {
      width: 730,
      height: 550,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: 730,
      height: 550,
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
      justifyContent: "center", 
      alignItems: "center",
      fontSize: 50,
      fontFamily: 'System',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });