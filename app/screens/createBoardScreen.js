import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTeams } from "../redux/teamsSlice";
import {
  gameState,
  numCategoriesStore,
  numQuestionsStore,
} from "../redux/gameSettingsSlice";
import {
  Text,
  Box,
  Button,
  Slider,
  VStack,
  HStack,
  Select,
  CheckIcon,
  Stack,
  Radio,
  Switch,
} from "native-base";

export default function CreateBoardScreen({ navigation }) {
 
  const [method, setMethod] = useState("auto");
  const dispatch = useDispatch();



  const handleStartGamePress = () => {
   
    navigation.navigate("PlayScreen");
    
  };

  const handleCreateSBoardPress = () => {
   
    navigation.navigate("SelectSavedBoardScreen");
  };

  const handleCreateCBoardPress = () => {
   
    navigation.navigate("ManBoardSetupScreen");
  };

  const handleCreateBoardPress = () => {
   
    navigation.navigate("ManBoardSetupScreen");
  };
  const handleBackPress = () => {
    navigation.navigate("SetupScreen");
  };

  return (
    <Box
      p={5}
      height={"100%"}
      // alignItems="center"
      bg={"primary.900"}
      borderColor="coolGray.500"
      borderWidth="1"
    >
      <VStack space={4} alignItems="center">
        <Text fontSize="7xl" textAlign="center" color="primary.50">
          Setup
        </Text>

        <VStack space={3} alignItems="center" w="40%" justifyContent="space-between">
          <Text textAlign="left" fontSize="xl" color="primary.50">
            Select Creation Method:
          </Text>
          <HStack alignItems="center" space={4}>
       

            <Select
            color="primary.50"
            bold
              selectedValue={method}
              minWidth="200"
              accessibilityLabel="Choose a method"
            
              _selectedItem={{
                bg: "primary.200",
                endIcon: <CheckIcon size="4" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setMethod(itemValue)}
            >
              <Select.Item label="Auto" value="auto" />
              {/* <Select.Item label="Saved Board" value="savedB" />
              <Select.Item label="Saved Categories" value="saveC" /> */}
              <Select.Item label="Blank Slate" value="blank" />
            </Select>
          </HStack>
        </VStack>

        {method === "auto" ? (
          <Button onPress={handleStartGamePress} size="lg" w="40%">
            PLAY
          </Button>
        ) : null}
        {method === "savedB" ? (
          <Button onPress={handleCreateSBoardPress} size="lg" w="40%">
            NEXT
          </Button>
        ) : null}
        {method === "saveC" ? (
          <Button onPress={handleCreateCBoardPress} size="lg" w="40%">
            NEXT
          </Button>
        ) : null}
        {method === "blank" ? (
          <Button onPress={handleCreateBoardPress} size="lg" w="40%">
            NEXT
          </Button>
        ) : null}

        <Button onPress={handleBackPress} size="lg" w="40%">
          Back
        </Button>
      </VStack>
    </Box>
  );
}
