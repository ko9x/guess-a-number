import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { borderBottomColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import Colors from "../constants/colors";
import CustomStyles from "../constants/custom-styles";

export default function Header(props) {
  // Platform.select({ios: styles.iosHeader, android: styles.androidHeader})
  // Is also an option. Just create a different class for each platform in the stylesheet

  // In extreme cases you could make a totally different file for each Platform and give them the name Header.android.js and Header.ios.js     React will know to pick the correct one based on your device. Just make sure the import statement doesn't include the Platform. Make sure the import is still just ./components/Header.js or whatever.
  return (
    <View style={styles.header}>
      <Text style={{...CustomStyles.titleText, ...styles.title}}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    title: {
      color: Platform.OS === 'ios' ? Colors.primary : 'white',
    }
});
