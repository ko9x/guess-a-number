import { View, StyleSheet } from 'react-native';
export default function Screen(props) {
    return (
        <View style={{...styles.screen, ...props.style}}>{props.children}</View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
      }
});
