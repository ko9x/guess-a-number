import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const isPortrait = () => {
  const dim = Dimensions.get("window");
  return dim.height >= dim.width;
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [portrait, setPortrait] = useState(isPortrait());

  Dimensions.addEventListener("change", () => {
    setPortrait(isPortrait());
  });

  useEffect(() => {
    // If you add an eventListener you should use a useEffect like this to remove the listener and create a new one each render
    Dimensions.addEventListener("change", () => {
      setPortrait(isPortrait());
    });
    return(
      Dimensions.removeEventListener('change', setPortrait(isPortrait()))
    )
  })

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (guesses) => {
    setUserNumber(null);
    setGuessRounds(guesses);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onEndGame={gameOverHandler} />
    );
  }

  if (guessRounds > 0) {
    content = (
      <GameOverScreen onEndGame={gameOverHandler} guesses={guessRounds} />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      {portrait && <Header title="Guess a Number" />}
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
