

export default function GameSetup(props) {
  
    const [isSelected, setSelection] = useState([]);

  
    console.log("This is setup", Object.keys(props.categories));
    console.log("This is selected", isSelected);
    const handleBackPress = () => {
      console.log("Go to Welcome");
      props.setCurrentView("WelcomeScreen");
    };
    const handleStartGamePress = () => {
      console.log("Start the Game");
  
      props.setGameSettings({ categories: isSelected.map((sel) => sel.value) });
      props.setCurrentView("PlayGame");
    };
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Setup a New Game!!!</Text>
        <Text style={styles.selectCat}>Select Categories!!!</Text>
        <SelectMultiple
          items={Object.keys(props.categories)}
          selectedItems={isSelected}
          onSelectionsChange={setSelection}
        />
        <Button
          onPress={handleBackPress}
          title="RETURN TO WELCOME SCREEN"
          color="#841584"
          accessibilityLabel="GO BACK!"
        />
  
        <Button
          onPress={handleStartGamePress}
          title="Start the Game"
          color="#841584"
          accessibilityLabel="Questions"
        />
      </View>
    );
  }