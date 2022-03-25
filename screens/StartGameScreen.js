import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import NumberContainer from "../components/UI/NumberContainer";
import Colors from "../constants/colors";
import Screen from "../components/UI/Screen";
import CustomStyles from "../constants/custom-styles";
import MainButton from "../components/UI/MainButton";

export default function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
      Dimensions.addEventListener("change", updateLayout);
      return () => {
        Dimensions.removeEventListener("change", updateLayout);
      };
    };
  });

  const numberInputHandler = (event) => {
    setEnteredValue(event.replace(/[^0-9]/g, ""));
  };

  const confirmInputHandler = () => {
    const enteredNumber = parseInt(enteredValue);
    if (enteredNumber > 0 && enteredNumber !== NaN && enteredNumber <= 99) {
      setConfirmed(true);
      setSelectedNumber(enteredNumber);
      setEnteredValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Invalid number!", "Please enter a number between 1 and 99", [
        {
          text: "Okay",
          style: "default",
          onPress: resetInputHandler,
        },
      ]);
      return;
    }
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={CustomStyles.bodyText}>You have selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          Start Game
        </MainButton>
      </Card>
    );
  }

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={{ ...CustomStyles.titleText, ...styles.title }}>
              Start a New Game!
            </Text>
            <Card style={styles.inputContainer}>
              <Text style={CustomStyles.bodyText}>Select a Number</Text>
              <Input
                onChangeText={numberInputHandler}
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={2}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.secondary}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
