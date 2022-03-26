import React, { useEffect, useState, useRef } from "react";
import { Text, Box, Button, Spinner, Heading, Icon, Spacer, VStack, HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import * as Realm from "realm-web";
import { realmApp } from "../realm/realm";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions } from "../redux/questionsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


// const anonLogin = async () => {
//   let anonUser
//   try {
//     anonUser = await realmApp.logIn(Realm.Credentials.anonymous());
//     //setUser(anonUser);
//     const jsonUser = JSON.stringify(loggedInUser)
//     await AsyncStorage.setItem('currentUser', anonUser)
//   } catch (error) {
//     Alert.alert(`Failed to sign up: ${error.message}`);
//   }

//   return anonUser
// };

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(async () => {
    const currentUserVal = await AsyncStorage.getItem('currentUser')
     currentUserVal != null ? JSON.parse(currentUserVal) : null;
    if (!currentUserVal) {
      const anonUser = await realmApp.logIn(Realm.Credentials.anonymous());
      setUser(anonUser);
      const jsonUser = JSON.stringify(anonUser)
      await AsyncStorage.setItem('currentUser', jsonUser)
    }
  }, [user, navigation]);

  useEffect(async () => {
    if (loading) {
      try {
        const client = realmApp.currentUser.mongoClient("mongodb-atlas");

        const cat = await client
          .db("quizapp")
          .collection("categories")
          .find({}, { projection: { _id: false } });

        setData(cat);

      } catch (err) {
        console.error("Failed to log in", err);
      }

      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    console.log(data)
    // dispatch(getQuestions(data));
  }, [data]);

  useEffect(async () => {
    const currentUserVal = await AsyncStorage.getItem("currentUser");
    currentUserVal != null ? setIsLoggedIn(true) : null;
  }, []);

  const handleLoginPress = () => {
    setIsLoggedIn(true);
    navigation.navigate("SignInScreen");
  };
  const handleLogoutPress = async () => {
    try {
      realmApp.currentUser.logOut();
      await AsyncStorage.removeItem("currentUser");
      setIsLoggedIn(false);
      navigation.navigate("HomeScreen");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };
  const handlePlayPress = () => {
    navigation.navigate("SetupScreen");
  };
  const handleQuestionBankPress = () => {
    navigation.navigate("QuestionBankScreen");
  };

  return (
    <Box
      p={10}
      height={"100%"}
      w="100%"
      // alignItems="center"
      bg={"primary.900"}
      borderColor="coolGray.500"
      borderWidth="1"
    >
      {/* <HStack alignItems="right">
        {isLoggedIn ? (
          <Button
            variant="subtle"
            colorScheme="blueGray"
            onPress={handleLogoutPress}
            leftIcon={<Icon as={Ionicons} name="log-out-outline" size="xs" />}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="subtle"
            colorScheme="blueGray"
            onPress={handleLoginPress}
            leftIcon={<Icon as={Ionicons} name="log-in-outline" size="xs" />}
          >
            Login
          </Button>
        )}
      </HStack> */}
      <VStack space={4} alignItems="center">
        <Text fontSize="8xl" color="primary.50" textAlign="center">
          QuizApp
        </Text>

       {loading ?  <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack> : <Button mt="2" w="40%" onPress={handlePlayPress}  >
          PLAY
        </Button>} 

        {/* <Button mt="2" onPress={handleQuestionBankPress}  >
          QUESTION BANK
        </Button> */}
      </VStack>
    </Box>
  );
}
