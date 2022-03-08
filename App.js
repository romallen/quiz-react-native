import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/welcomeScreen';
import PlayScreen from './app/screens/playScreen'
import SetupScreen from './app/screens/setupScreen'
import QuestionBankScreen from './app/screens/QuestionBankScreen'

import { Provider } from 'react-redux'
import store from './app/redux/store'

export default function App() {
  const [currentView, setCurrentView] = useState("WelcomeScreen");
  


  return (
    <Provider store={store}>
    <View style={styles.container}>
      <StatusBar style="auto" />
       {currentView === "WelcomeScreen" ? (
        <WelcomeScreen currentView={currentView} setCurrentView={setCurrentView} />
      ) : null}
      {currentView === "SetupScreen" ? (
        <SetupScreen currentView={currentView} setCurrentView={setCurrentView}/>
      ) : null}
      {currentView === "PlayScreen" ? (
        <PlayScreen currentView={currentView} setCurrentView={setCurrentView}/>
      ) : null}
      {currentView === "QuestionBankScreen" ? (
        <QuestionBankScreen currentView={currentView} setCurrentView={setCurrentView} />
      ) : null}
    </View>
    </Provider>
    
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
