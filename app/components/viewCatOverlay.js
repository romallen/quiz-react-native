import React, { useState, useEffect, useRef } from "react";
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import questionsCard, { SLIDER_WIDTH, ITEM_WIDTH } from "./carousel";
import axios from "axios";
import { Button, Card, Icon, Input, Overlay } from "react-native-elements";
import { set } from "lodash";
import data1 from "../data";

export default function ViewCategoryOverlay(props) {
  let postObj = {};
  //state
  //InputOverlay
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [newQuestion, setNewQuestion] = useState(
    (postObj.category = "FOOD")
  );
  //hook

  //handle
  const handleBackPress = () => {
    console.log("Go to Welcome");
    props.setCurrentView("WelcomeScreen");
  };
  const handleViewQuestionsPress = () => {
    console.log("Go to QuestionBankPress");
    props.setCurrentView("QuestionBank");
  };

  const handleTextInput = (field, value) => {
    postObj[field] = value;
  };

  const handleAddPress = () => {
    setNewQuestion(postObj);
    createQuestions();
  };
  let jsonData = {
    question: newQuestion.question,
    answer: newQuestion.answer,
    category: newQuestion.category,
    points: newQuestion.points,
    difficulty: newQuestion.difficulty,
  };
  const createQuestions = async () => {
    try {
      await axios({
        method: "post",
        url: "https://ccp2-quiz-api.herokuapp.com/api/question",
        data: JSON.stringify(newQuestion),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditPress = () => {
    setNewQuestion(postObj);
    editQuestion();
  };

  const editQuestion = async () => {
    try {
      await axios({
        method: "patch",
        url: "https://ccp2-quiz-api.herokuapp.com/api/question",
        data: JSON.stringify(newQuestion),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(newQuestion);

  const categoryName = data1.map((el) => el.category);

  const isCarousel = useRef(null);

  //console.log("carousel", isCarousel);
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {props.selectedCategory.toLocaleUpperCase()}{" "}
      </Text>
      <View style={styles.carouselContainer}>
        <Carousel
          layout={"stack"}
          //layoutCardOffset={9}
          ref={isCarousel}
          data={props.categories[props.selectedCategory]}
          renderItem={questionsCard}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />

        <Icon
          reverse
          name="ios-create"
          type="ionicon"
          color="#517fa4"
          Component={TouchableHighlight}
          onPress={() => setEditVisible(!editVisible)}
        />

        <View style={styles.editOverlay}>
          <Overlay
            isVisible={editVisible}
            onBackdropPress={() => {
              setEditVisible(!editVisible);
            }}
          >
            <Text>Edit this question</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Question"
              maxLength={200}
              onBlur={Keyboard.dismiss}
              onChangeText={(value) => handleTextInput("question", value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Answer"
              maxLength={200}
              onBlur={Keyboard.dismiss}
              onChangeText={(value) => handleTextInput("answer", value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Points"
              onBlur={Keyboard.dismiss}
              onChangeText={(value) => handleTextInput("points", value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Difficulty"
              onBlur={Keyboard.dismiss}
              onChangeText={(value) => handleTextInput("difficulty", value)}
            />
            <Button
              onPress={handleAddPress}
              title="SUBMIT"
              color="#841584"
              accessibilityLabel="SUBMIT!"
            />
          </Overlay>
        </View>
      </View>

      <Icon
        reverse
        name="ios-add"
        type="ionicon"
        color="#517fa4"
        Component={TouchableHighlight}
        onPress={() => setAddVisible(!addVisible)}
      />
      <View style={styles.addOverlay}>
        <Overlay
          isVisible={addVisible}
          onBackdropPress={() => {
            setAddVisible(!addVisible);
          }}
        >
          <Text>Add a new question to this category</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Question"
            maxLength={200}
            onBlur={Keyboard.dismiss}
            onChangeText={(value) => handleTextInput("question", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Answer"
            maxLength={200}
            onBlur={Keyboard.dismiss}
            onChangeText={(value) => handleTextInput("answer", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Points"
            onBlur={Keyboard.dismiss}
            onChangeText={(value) => handleTextInput("points", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Difficulty"
            onBlur={Keyboard.dismiss}
            onChangeText={(value) => handleTextInput("difficulty", value)}
          />
          <Button
            onPress={handleAddPress}
            title="SUBMIT"
            color="#841584"
            accessibilityLabel="SUBMIT!"
          />
        </Overlay>
      </View>
      <Button
        onPress={handleBackPress}
        title="RETURN TO WELCOME SCREEN"
        color="#841584"
        accessibilityLabel="GO BACK!"
      />

      <Button
        onPress={handleViewQuestionsPress}
        title="VIEW CATEGORIES"
        color="blue"
        accessibilityLabel="Questions"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ddf',
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    flex: 1,
    fontSize: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addOverlay: {
    flex: 1,
    height: 300,
    width: 600,
  },
  editOverlay: {
    flex: 1,
    height: 300,
    width: 600,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 300,
  },
});
