import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans',
        fontSize: 15,
    },
    titleText: {
        fontFamily: 'open-sans-bold',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    }
});