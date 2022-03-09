import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default carouselCard = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>ANSWER: {item.answer}</Text>
      <Text style={styles.points}>POINTS: {item.points}</Text>
      <Text style={styles.difficulty}>DIFFICULTY: {item.difficulty}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH / 2.1,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  question: {
    color: "#222",
    fontSize: 48,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  answer: {
    color: "#222",
    fontSize: 25,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  points: {
    color: "#222",
    fontSize: 25,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  difficulty: {
    color: "#222",
    fontSize: 25,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});


