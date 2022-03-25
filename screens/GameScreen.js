import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/UI/NumberContainer";
import Card from "../components/UI/Card";
import Screen from "../components/UI/Screen";
import MainButton from "../components/UI/MainButton";
import { Ionicons } from "@expo/vector-icons";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

export default function GameScreen(props) {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [pastGuesses, setPastGuesses] = useState([]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const addNewGuess = (newGuess) => {
    setPastGuesses((prevState) => [newGuess.toString(), ...prevState]);
  };

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      Alert.alert(
        "The computer knows all...",
        `It only took ${
          pastGuesses.length + 1
        } guesses to determine your number is... ${currentGuess}!`,
        [
          {
            text: "WOW!",
            style: "default",
            onPress: () => {
              props.onEndGame(pastGuesses.length + 1);
            },
          },
        ]
      );
    }
  }, [currentGuess, props.onEndGame]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        "Do not attempt to mislead the computer...",
        "it does not like that",
        [
          {
            text: "Okay",
            style: "cancel",
          },
        ]
      );
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextGuess = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    addNewGuess(currentGuess);
  };

  // For Flatlist
  const listGuesses = (pastGuesses, itemData) => (
    <View style={styles.guess}>
      <Text>Guess #{pastGuesses.length - itemData.index}</Text>
      <Text>{itemData.item}</Text>
    </View>
  );

  // For ScrollView
  // const guessList = pastGuesses.map((guess, index) => (
  //   <View style={styles.guess} key={index}>
  //     <Text>Guess #{pastGuesses.length - index}</Text>
  //     <Text>{guess}</Text>
  //   </View>
  // ));

  return (
    <Screen>
      <Text>Computer's Guess #{pastGuesses.length + 1}</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            nextGuessHandler("lower");
          }}
        >
          <Ionicons name="arrow-down" size={24} color="white" />
        </MainButton>
        <MainButton
          onPress={() => {
            nextGuessHandler("higher");
          }}
        >
          <Ionicons name="arrow-up" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>{guessList}</ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={listGuesses.bind(this, pastGuesses)}
        />
      </View>
    </Screen>
  );
}

// some of the styles are commented out because they were for ScrollView
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%",
  },
  listContainer: {
    flex: 1,
    marginVertical: 10,
    // alignItems: "center",
    // width: "80%",
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  guess: {
    width: 250,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "white",
    width: '100%',
    // width: "60%",
  },
});
