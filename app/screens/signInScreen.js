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
export default function SignInScreen({ navigation }) {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
  
    // state values for toggable visibility of features in the UI
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [isInSignUpMode, setIsInSignUpMode] = useState(true);
  
    useEffect(() => {
      if (user) {
        navigation.navigate('HomeScreen'); // if there is a logged in user, navigate to the Tasks Screen
      }
    }, [user, navigation]);
  
    // signIn() uses the emailPassword authentication provider to log in
    const signIn = async () => {
      const creds = Realm.Credentials.emailPassword(email, password);
      const loggedInUser = await realmApp.logIn(creds);
      setUser(loggedInUser);
    };
  
    // onPressSignIn() uses the emailPassword authentication provider to log in
    const onPressSignIn = async () => {
      try {
        await signIn(email, password);
      } catch (error) {
        Alert.alert(`Failed to sign in: ${error.message}`);
      }
    };
  
    // onPressSignUp() registers the user and then calls signIn to log the user in
    const onPressAnon = async () => {
      try {
        const anonUser = await realmApp.logIn(Realm.Credentials.anonymous());
        setUser(anonUser);
      } catch (error) {
        Alert.alert(`Failed to sign up: ${error.message}`);
      }
    };
  
  
  
  
  
    return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input onChangeText={setEmail}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={setPassword}/>
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={onPressSignIn}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              Sign Up
            </Link>
          </HStack>
          <HStack mt="6" justifyContent="center">
          <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
              onPress={onPressAnon}
            >
              Continue 
            </Link>
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
               {" "}without logging in.
            </Text>
           
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
