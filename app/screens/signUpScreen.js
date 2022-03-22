import React, { useEffect, useState } from "react";
import { Alert} from 'react-native';
import * as Realm from "realm-web";
import { realmApp } from "../realm/realm";
import {

  Center,
  Button,
  Text,
  Box,
  Heading,
  VStack,
  Link,
  FormControl,
  Input,
  HStack,
} from "native-base";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [user, setUser] = useState(null);

  // state values for toggable visibility of features in the UI
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);

  useEffect(() => {
    if (user) {
      navigation.navigate("HomeScreen"); // if there is a logged in user, navigate to the Tasks Screen
    }
  }, [user, navigation]);

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = async () => {
    const creds = Realm.Credentials.emailPassword(email, password1);
    const loggedInUser = await realmApp.logIn(creds);
    setUser(loggedInUser);
  };

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = async () => {
    try {
      await signIn(email, password1);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  // onPressSignUp() registers the user and then calls signIn to log the user in
  const onPressSignUp = async () => {
    if (password1 === password2) {
      try {
        await realmApp.emailPasswordAuth.registerUser(email, password1);
        signIn(email, password1);
      } catch (error) {
        Alert.alert(`Failed to sign up: ${error.message}`);
      }
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={setPassword1} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" onChangeText={setPassword2} />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={onPressSignUp}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
