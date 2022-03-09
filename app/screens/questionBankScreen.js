import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import {
  Button,
  ListItem,
  Avatar,
  Overlay,
  FAB,
  SpeedDial,
} from "react-native-elements";
import axios from "axios";
import data1 from "../data";
// import ViewCategoryOverlay from "../components/viewCatOverlay";

export default function QuestionBankScreen(props) {
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  //handle
  const handleBackPress = () => {
    console.log("Go to Welcome");
    props.setCurrentView("WelcomeScreen");
  };
  const handleViewQuestionsPress = () => {
    console.log("Go to QuestionBankPress");
    props.setCurrentView("QuestionBank");
  };

  const createQuestions = async () => {
    return await axios.post("", {});
  };

  const handleClick= () => {
    setVisible(!visible);
  

};
  const categoryName = data1.map((el) => el.category);

  console.log(categoryName);
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>CRUD!!! </Text>
      <View style={styles.catContainer}>
        {categoryName.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            Component={TouchableHighlight}
            onPress={() => {
             handleClick(l)
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{l.toLocaleUpperCase()}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
      <SpeedDial
        isOpen={isOpen}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Add"
          onPress={() => console.log("Add a Category")}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          title="Delete"
          onPress={() => console.log("Delete a Category")}
        />
      </SpeedDial>
      <Button
        style={styles.button}
        onPress={handleBackPress}
        title="RETURN TO WELCOME SCREEN"
        color="#841584"
        accessibilityLabel="GO BACK!"
      />

<Overlay ModalComponent={Modal} isVisible={visible} onBackdropPress={handleClick}>
    {/* <ViewCategoryOverlay/> */}
  </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddf",
    alignItems: "center",
    justifyContent: "center",
  },
  catContainer: {
    flex: 1,
    width: 500,
  },
  greeting: {
    flex: 0.2,
    fontSize: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    fontSize: 20,
    paddingBottom: 20,
  },
});
