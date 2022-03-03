import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/welcomeScreen';


export default function App() {
  const [currentView, setCurrentView] = useState("WelcomeScreen");
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [gameSettings, setGameSettings] = useState({});



  return (
    <View style={styles.container}>
       {currentView === "WelcomeScreen" ? (
        <WelcomeScreen currentView={currentView} setCurrentView={setCurrentView} />
      ) : null}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
