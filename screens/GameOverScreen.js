import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Screen from "../components/UI/Screen";
import MainButton from "../components/UI/MainButton";
import CustomStyles from "../constants/custom-styles";
import Colors from "../constants/colors";

export default function GameOverScreen(props) {
  return (
    <ScrollView>
      <Screen>
      <Text style={{ ...CustomStyles.titleText, ...styles.title }}>
        Game Over
      </Text>
      <Text style={CustomStyles.bodyText}>
        The computer guessed your number in only{" "}
        <Text style={styles.highlight}>{props.guesses}</Text> tries!
      </Text>
      <View style={styles.imageContainer}>
        {/* Local image */}
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("../assets/success.png")}
        />
        {/* remote image */}
        {/* <Image resizeMode="cover" style={styles.image} source={{uri: 'https://thumbs.dreamstime.com/b/mount-everest-summit-21911750.jpg'}} /> */}
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          onPress={() => {
            props.onEndGame(0);
          }}
        >
          New Game
        </MainButton>
      </View>
    </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
  },
});
